import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import Toast from 'react-native-toast-message';

const dadosJSON = [
  {
    "id": 1,
    "id_Categoria_entrada": 1,
    "valor": "5000.00",
    "data": "2025-05-04 00:00:00",
    "descricao": "pagamento da empresa do dia 5",
    "id_conta": 1,
    "status": "ativo",
    "uid": ""
  },
  {
    "id": 2,
    "id_Categoria_entrada": 4,
    "valor": "4.00",
    "data": "2025-05-04 00:00:00",
    "descricao": "4",
    "id_conta": 4,
    "status": "4",
    "uid": ""
  },
  {
    "id": 3,
    "id_Categoria_entrada": 1,
    "valor": "5555.00",
    "data": "2025-05-06 00:00:00",
    "descricao": "lllllllllllllll",
    "id_conta": 4,
    "status": "ativo",
    "uid": ""
  },
  {
    "id": 4,
    "id_Categoria_entrada": 1,
    "valor": "1500.00",
    "data": "2025-11-03 00:00:00",
    "descricao": "teste",
    "id_conta": 1,
    "status": "ativo",
    "uid": "1"
  },
  {
    "id": 5, "id_Categoria_entrada": 1, "valor": "1500.00", "data": "2025-11-03 00:00:00", "descricao": "teste", "id_conta": 1, "status": "ativo", "uid": "2"
  },
  {
    "id": 6, "id_Categoria_entrada": 1, "valor": "1500.00", "data": "2025-11-03 00:00:00", "descricao": "teste", "id_conta": 1, "status": "ativo", "uid": "3"
  },
  {
    "id": 7, "id_Categoria_entrada": 1, "valor": "1500.00", "data": "2025-11-03 00:00:00", "descricao": "teste", "id_conta": 1, "status": "ativo", "uid": "4"
  },
  {
    "id": 8, "id_Categoria_entrada": 1, "valor": "1500.00", "data": "2025-11-03 00:00:00", "descricao": "teste", "id_conta": 1, "status": "ativo", "uid": "5"
  },
  {
    "id": 9, "id_Categoria_entrada": 1, "valor": "1500.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  },
  {
    "id": 10, "id_Categoria_entrada": 1, "valor": "1501.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  },
  {
    "id": 11, "id_Categoria_entrada": 1, "valor": "1502.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  },
  {
    "id": 12, "id_Categoria_entrada": 1, "valor": "1503.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  },
  {
    "id": 13, "id_Categoria_entrada": 1, "valor": "1504.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  },
  {
    "id": 14, "id_Categoria_entrada": 1, "valor": "1505.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  },
  {
    "id": 15, "id_Categoria_entrada": 1, "valor": "1506.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  },
  {
    "id": 16, "id_Categoria_entrada": 1, "valor": "1507.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  },
  {
    "id": 17, "id_Categoria_entrada": 1, "valor": "1508.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  },
  {
    "id": 18, "id_Categoria_entrada": 1, "valor": "1509.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  },
  {
    "id": 19, "id_Categoria_entrada": 1, "valor": "1510.00", "data": "2025-11-03 00:00:00", "descricao": "teste2", "id_conta": 1, "status": "ativo", "uid": "1"
  }
];

const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const chartColors = ['#f39c12', '#e74c3c', '#8e44ad', '#27ae60', '#2980b9', '#d35400', '#2c3e50'];

const SeuApp = () => {
  const [labels, setLabels] = useState(diasDaSemana);
  const [valores, setValores] = useState(new Array(7).fill(0));
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [loading, setLoading] = useState(false);

  const carregarDados = () => {
    if (!dataInicial || !dataFinal) {
      Toast.show({ type: 'info', text1: 'Informe data inicial e data final' });
      return;
    }

    const dataIni = new Date(dataInicial + 'T00:00:00');
    const dataFim = new Date(dataFinal + 'T23:59:59');

    if (isNaN(dataIni) || isNaN(dataFim) || dataIni > dataFim) {
      Toast.show({ type: 'error', text1: 'Datas inválidas ou intervalo incorreto' });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const dadosFiltrados = dadosJSON.filter(item => {
        const dataStr = item.data.split(' ')[0];
        const dataObj = new Date(dataStr + 'T00:00:00');
        return dataObj >= dataIni && dataObj <= dataFim;
      });

      if (dadosFiltrados.length === 0) {
        Toast.show({ type: 'info', text1: 'Nenhum dado encontrado para o intervalo informado' });
        setLabels(diasDaSemana);
        setValores(new Array(7).fill(0));
        setLoading(false);
        return;
      }

      const somaPorDia = {
        Dom: 0, Seg: 0, Ter: 0, Qua: 0, Qui: 0, Sex: 0, Sáb: 0,
      };

      dadosFiltrados.forEach(item => {
        const dataStr = item.data.split(' ')[0];
        const dataObj = new Date(dataStr + 'T00:00:00');
        const diaSemana = diasDaSemana[dataObj.getDay()];
        const valor = parseFloat(item.valor.replace(',', '.'));
        if (!isNaN(valor)) {
          somaPorDia[diaSemana] += valor;
        }
      });

      const novosValores = diasDaSemana.map(dia => somaPorDia[dia]);

      setLabels(diasDaSemana);
      setValores(novosValores);
      setLoading(false);
    }, 500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Dashboard</Text>

      <Text style={styles.sub}>Filtrar por intervalo de datas (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Data inicial (ex: 2025-11-01)"
        value={dataInicial}
        onChangeText={setDataInicial}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Data final (ex: 2025-11-07)"
        value={dataFinal}
        onChangeText={setDataFinal}
      />
      <TouchableOpacity style={styles.butao} onPress={carregarDados} disabled={loading}>
        <Text style={styles.Filtrar}>{loading ? 'Carregando...' : 'Filtrar'}</Text>
      </TouchableOpacity>

      <Text style={styles.graficoTitulo}>Relatório de Receitas por Dia da Semana</Text>

      <BarChart
        data={{ labels, datasets: [{ data: valores }] }}
        width={Dimensions.get('window').width - 60}
        height={220}
        yAxisLabel="R$ "
        chartConfig={{
          backgroundColor: '#0d1b48',
          backgroundGradientFrom: '#0d1b48',
          backgroundGradientTo: '#0d1b48',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => '#fff',
          style: { borderRadius: 16 },
        }}
        style={styles.grafico}
      />

      <Text style={styles.graficoTitulo}>Distribuição por Dia da Semana</Text>

      <PieChart
        data={labels.map((label, index) => ({
          name: label,
          population: valores[index],
          color: chartColors[index % chartColors.length],
          legendFontColor: '#0d1b48',
          legendFontSize: 14,
        }))}
        width={Dimensions.get('window').width - 60}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(13, 27, 72, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.grafico}
      />

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 60,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#0d1b48',
  },
  sub: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0d1b48',
    alignSelf: 'flex-start',
  },
  TextInput: {
    width: '100%',
    height: 45,
    borderColor: 'black',
    borderWidth: 1.5,
    marginBottom: 15,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  butao: {
    width: '100%',
    height: 50,
    backgroundColor: '#0d1b48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 30,
  },
  Filtrar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  graficoTitulo: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#0d1b48',
    alignSelf: 'flex-start',
  },
  grafico: {
    borderRadius: 16,
    marginBottom: 30,
  },
});

export default SeuApp;
