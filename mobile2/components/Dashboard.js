import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { format, subDays } from 'date-fns';
import { API_URL } from '../.env';
import { MaskedTextInput } from 'react-native-mask-text';

import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width - 40;

const DashboardMobile = () => {
  const uid = 'nxx1YdFKQUd8XSwFE6bnN9mQa422';
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2025-09-21');
  const [loading, setLoading] = useState(true);
  const [dataDigitada, setDataDigitada] = useState('')
  const [dataDigitada2, setDataDigitada2] = useState('')

  const [gastostempo, setGastosTempo] = useState([]);
  const [topGastos, setTopGastos] = useState([]);
  const [tipoPag, setTipoPag] = useState([]);
  const [saldototal, setSaldototal] = useState([]);
  const [saidastotais, setSaidastotais] = useState([]);

  const fetchData = async () => {
    try {
      const params = { startDate, endDate, uid };
      const [gastoTempoRes, topGastoRes, tipoPagRes, saldoRes, saidasRes] =
        await Promise.all([
          axios.get(`${API_URL}/gastosaolongodotempo`, { params }),
          axios.get(`${API_URL}/topgastos`, { params }),
          axios.get(`${API_URL}/gastosportipopagamento`, { params }),
          axios.get(`${API_URL}/saldototal`, { params }),
          axios.get(`${API_URL}/saidastotais`, { params }),
        ]);
      setGastosTempo(gastoTempoRes.data);
      setTopGastos(topGastoRes.data);
      setTipoPag(tipoPagRes.data);
      setSaldototal(saldoRes.data);
      setSaidastotais(saidasRes.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados');
      console.error(error);
    }
  };

  const cores = [
    'rgba(0, 51, 102, 0.500)',
    'rgba(0, 51, 102, 0.995)',
    'rgba(0, 51, 102, 0.849)',
    'rgba(0, 51, 102, 0.705)',
    'rgba(0, 51, 102, 0.534)',
  ];

  const dadosfiltrado = tipoPag.map((e, index) => {
    const tipo = e.tipo_pagamento || 'Não informado';
    return {
      name: tipo,
      valor: parseFloat(e.total),
      color: cores[index % cores.length],
    };
  });

  const formatarData = (dataString) => {
    const [ano, mes, dia] = dataString.split(' ')[0].split('-');
    return `${dia}/${mes}/${ano.slice(2)}`; // dd/mm/aa
  };

  const data2 =
    gastostempo.length > 0
      ? {
          labels: gastostempo.map((item) => formatarData(item.data)),
          datasets: [
            {
              data: gastostempo.map((item) => parseFloat(item.total)),
              color: (opacity = 1) => `rgba(0, 219, 134, ${opacity})`,
              strokeWidth: 3,
            },
          ],
          legend: ['Gastos ao Longo do Tempo'],
        }
      : null;

  const limitarTexto = (texto) => {
    if (!texto) return 'X';
    return texto.length > 7 ? texto.slice(0, 7) + '...' : texto;
  };

  const data4 = {
    labels: topGastos.map((item) => limitarTexto(item.nome_categoria)),
    datasets: [
      {
        data: topGastos.map((item) => parseFloat(item.valor)),
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.filterContainer}>

      <View style={styles.inputContainer}>
      <Text style={styles.label}>Data Início:</Text>
        <MaskedTextInput
              mask="99/99/9999"
              value={dataDigitada}
              onChangeText={(text, rawText) => {
                setDataDigitada(text);

                if (rawText.length === 8) {
                  const dia = rawText.substring(0, 2);
                  const mes = rawText.substring(2, 4);
                  const ano = rawText.substring(4, 8);
                  const dataFormatada = `${ano}-${mes}-${dia}`;
                  setStartDate(dataFormatada);
                } else {
                  setStartDate('');
                }
              }}
              style={styles.input}
              placeholder="Data (DD/MM/AAAA)"
              keyboardType="numeric"
            />
      </View>

        <View style={styles.inputContainer}>
        <Text style={styles.label}>Data Fim:</Text>
         <MaskedTextInput
              mask="99/99/9999"
              value={dataDigitada2}
              onChangeText={(text, rawText) => {
                setDataDigitada2(text);

                if (rawText.length === 8) {
                  const dia = rawText.substring(0, 2);
                  const mes = rawText.substring(2, 4);
                  const ano = rawText.substring(4, 8);
                  const dataFormatada = `${ano}-${mes}-${dia}`;
                  setEndDate(dataFormatada);
                } else {
                  setEndDate('');
                }
              }}
              style={styles.input}
              placeholder="Data (DD/MM/AAAA)"
              keyboardType="numeric"
            />
      </View>
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardDashboard}>
        <View style={styles.card1}>
          <Text style={{ color: 'white', fontSize: 13 }}>Despesas Totais:</Text>
          {saidastotais.length > 0 ? (
            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 500 }}>
              {' '}
              R$ {saidastotais[0].total}
            </Text>
          ) : (
            <Text style={{ color: '#fff', fontSize: 14 }}>Nada a exibir.</Text>
          )}
        </View>

        <View style={styles.card2}>
          <Text style={{ color: '#091242', fontSize: 13 }}>
            Receitas Totais:
          </Text>
          {saldototal.length > 0 && saidastotais.length > 0 ? (
            <Text style={{ color: '#091242', fontWeight: 500, fontSize: 17 }}>
              R$ {saldototal[0].total}
            </Text>
          ) : (
            <Text style={{ color: '#09124299', fontSize: 14 }}>
              Nada a exibir.
            </Text>
          )}
        </View>
      </View>

      <View style={styles.card3}>
        <Text style={{ fontSize: 13 }}>Saldo Total:</Text>
        {saldototal.length > 0 && saidastotais.length > 0 ? (
          <Text style={{ color: '#091242', fontWeight: 500, fontSize: 17 }}>
            R$ {saldototal[0].total - saidastotais[0].total}
          </Text>
        ) : (
          <Text style={{ margin: 0 }}>Nada a exibir.</Text>
        )}
      </View>

      <View style={styles.grafico}>
        <Text style={styles.title1}>Gastos por Categoria</Text>
        <BarChart
          data={data4}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          showValuesOnTopOfBars={true}
           style={{
      borderRadius: 160
    }}
        />
      </View>

      <View style={styles.grafico}>
        <Text style={styles.title1}>Gastos por Tipo de Pagamento</Text>
        <PieChart
          data={dadosfiltrado}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          accessor={'valor'}
          backgroundColor={'transparent'}
          absolute 
          style={{
      borderRadius: 16
    }}
        />
      </View>

      <View style={styles.grafico}>
        <Text style={styles.title1}>Gastos por dia</Text>
        {data2 && (
          <LineChart
            data={data2}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            backgroundColor={'transparent'}
            bezier
            style={{
      borderRadius: 16
    }}
          />
        )}
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#fff',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 1, // optional, default 3
  barPercentage: 0.5,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#003366',
  }, 
  style:{
      borderRadius: 160
    }
};

const chartColors = [
  '#003366',
  '#336699',
  '#6699cc',
  '#99ccff',
  '#003344',
  '#339966',
];

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 30,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
  },
    label: {
    position: 'absolute',
    top: -10,
    left: 15,
    fontSize: 15,
    zIndex: 1,
    backgroundColor: '#fff', // mesma cor do fundo do input
    paddingHorizontal: 10,
    width: 'auto', // deixa o tamanho conforme o texto
  },
  grafico: {
    borderStyle: 'solid',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    elevation: 2,
    padding: 10,
    marginTop: 10,
    marginBottom: 30,
    borderEndEndRadius: 25,
    borderTopLeftRadius: 25,
  },
  cardDashboard: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20,
  },
  card1: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#FA6D6D',
    width: '48.5%',
    borderRadius: 15,
    height: 64,
    justifyContent: 'center',
    borderStyle: 'solid',
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.50)',
  },
  card2: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#64FEB6',
    width: '48.5%',
    borderRadius: 15,
    height: 64,
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.50)',
    borderStyle: 'solid',
  },
  card3: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#FDFD8A',
    width: '100%',
    borderRadius: 15,
    height: 64,
    justifyContent: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.50)',
    borderStyle: 'solid',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  title1: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: '#383F66',
    fontWeight: 500,
  },
  filterContainer: {
    marginVertical: 10,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: 'rgba(0, 0, 0, 0.56)',
    borderWidth: 1.5,
    marginBottom: 15,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#003366',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    height: 45
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DashboardMobile;
