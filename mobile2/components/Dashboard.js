import React, { useState } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Platform
} from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
 
const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const screenWidth = Dimensions.get('window').width;
const periodOptions = ['Dia', 'Semana', 'Mês', 'Ano'];
 
// Exemplo de dados
const dadosJSON = [
  { data: '2024-11-11 00:00:00', valor: 1000, tipo_pagamento: 'cartao' },
  { data: '2024-11-12 00:00:00', valor: 2000, tipo_pagamento: 'dinheiro' },
  { data: '2024-11-13 00:00:00', valor: 1500, tipo_pagamento: 'cartao' },
  { data: '2024-11-14 00:00:00', valor: 3000, tipo_pagamento: 'outros' },
  { data: '2024-11-15 00:00:00', valor: 500, tipo_pagamento: 'dinheiro' },
];
 
function groupByDay(data) {
  const result = {};
  data.forEach(item => {
    const date = new Date(item.data.replace(' ', 'T'));
    const day = diasDaSemana[date.getDay()];
    if (!result[day]) result[day] = 0;
    result[day] += Number(item.valor);
  });
  return result;
}
 
export default function Dashboard() {
  const [periodo, setPeriodo] = useState('Dia');
  const [dateFrom, setDateFrom] = useState(new Date('2024-11-01'));
  const [dateTo, setDateTo] = useState(new Date('2024-11-30'));
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
 
  const dadosFiltrados = dadosJSON.filter(item => {
    const dataItem = new Date(item.data.replace(' ', 'T'));
    return dataItem >= dateFrom && dataItem <= dateTo;
  });
 
  const dadosAgrupados = groupByDay(dadosFiltrados);
  const labels = Object.keys(dadosAgrupados);
  const valores = Object.values(dadosAgrupados);
 
  // Dados para PieChart de tipo de pagamento
  const tiposPagamento = {};
  dadosFiltrados.forEach(item => {
    if (!tiposPagamento[item.tipo_pagamento]) tiposPagamento[item.tipo_pagamento] = 0;
    tiposPagamento[item.tipo_pagamento] += Number(item.valor);
  });
  const pieData = Object.keys(tiposPagamento).map((tipo, index) => ({
    name: tipo,
    population: tiposPagamento[tipo],
    color: ['#2980b9', '#27ae60', '#8e44ad'][index % 3],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));
 
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: '6', strokeWidth: '2', stroke: '#27ae60' },
  };
 
  return (
<ScrollView style={styles.container}>
<Text style={styles.titulo}>Dashboard de Gastos</Text>
 
      <View style={styles.periodSelector}>
        {periodOptions.map(option => (
<TouchableOpacity
            key={option}
            style={[styles.periodButton, periodo === option && styles.periodButtonSelected]}
            onPress={() => setPeriodo(option)}
>
<Text style={[styles.periodButtonText, periodo === option && styles.periodButtonTextSelected]}>
              {option}
</Text>
</TouchableOpacity>
        ))}
</View>
 
      <View style={styles.dateFilter}>
<TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateButton}>
<Text>De: {dateFrom.toLocaleDateString()}</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateButton}>
<Text>Até: {dateTo.toLocaleDateString()}</Text>
</TouchableOpacity>
 
        {showFromPicker && (
<DateTimePicker
            value={dateFrom}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowFromPicker(Platform.OS === 'ios');
              if (selectedDate) setDateFrom(selectedDate);
            }}
          />
        )}
        {showToPicker && (
<DateTimePicker
            value={dateTo}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowToPicker(Platform.OS === 'ios');
              if (selectedDate) setDateTo(selectedDate);
            }}
          />
        )}
</View>
 
      {labels.length === 0 ? (
<Text style={styles.semDados}>Nenhum dado para o período selecionado.</Text>
      ) : (
<>
<Text style={styles.subtitulo}>Top 5 maiores gastos</Text>
<BarChart
            data={{
              labels: labels.slice(0, 5),
              datasets: [{ data: valores.slice(0, 5) }],
            }}
            width={screenWidth - 20}
            height={220}
            fromZero
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            showValuesOnTopOfBars
            style={styles.grafico}
          />
 
          <Text style={styles.subtitulo}>Total de gastos por data</Text>
<LineChart
            data={{
              labels: labels,
              datasets: [{ data: valores }],
            }}
            width={screenWidth - 20}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.grafico}
          />
 
          <Text style={styles.subtitulo}>Gastos por Tipo de Pagamento</Text>
<PieChart
            data={pieData}
            width={screenWidth - 20}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
 
          <Text style={styles.subtitulo}>Gastos por Categoria</Text>
<BarChart
            data={{
              labels: labels,
              datasets: [{ data: valores }],
            }}
            width={screenWidth - 20}
            height={220}
            fromZero
            chartConfig={chartConfig}
            verticalLabelRotation={45}
            showValuesOnTopOfBars
            style={styles.grafico}
          />
</>
      )}
 
      <Toast />
</ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  grafico: {
    marginVertical: 8,
    borderRadius: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#27ae60',
  },
  periodButtonSelected: {
    backgroundColor: '#27ae60',
  },
  periodButtonText: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
  periodButtonTextSelected: {
    color: '#fff',
  },
  dateFilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#27ae60',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  semDados: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
});