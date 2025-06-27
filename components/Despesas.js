import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaskedTextInput } from 'react-native-mask-text';

const SeuApp = () => {
  const [id_Categoria_saida, setId_Categoria_Saida] = useState([]);
  const [id_conta, setId_Conta] = useState([]);
  const [id_Tipo_pagamento, setId_Tipo_Pagamento] = useState([]);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [contaSelecionada, setContaSelecionada] = useState('');
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('https://apifinanceiropessoal.webapptech.site/api/CategoriaSaida')
      .then(res => res.json())
      .then(data => {
        console.log("categorias", data);
        setId_Categoria_Saida(Array.isArray(data) ? data : data.data || []);
      });

    fetch('https://apifinanceiropessoal.webapptech.site/api/Conta')
      .then(res => res.json())
      .then(data => {
        console.log("contas", data);
        setId_Conta(Array.isArray(data) ? data : data.data || []);
      });

    fetch('https://apifinanceiropessoal.webapptech.site/api/tipo_pagamento')
      .then(res => res.json())
      .then(data => {
        console.log("tiposPagamento", data);
        setId_Tipo_Pagamento(Array.isArray(data) ? data : data.data || []);
      });
  }, []);

  const cadastrarDespesas = () => {
    fetch('https://apifinanceiropessoal.webapptech.site/api/despesas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_Categoria_saida: categoriaSelecionada,
        valor,
        data,
        descricao,
        id_Tipo_pagamento: pagamentoSelecionado,
        id_conta: contaSelecionada,
        status
      })
    })
    .then(res => {
      if (res.ok) {
        Alert.alert('Sucesso', 'Despesas cadastrada com sucesso!');
      } else {
        Alert.alert('Erro', 'Falha ao cadastrar.');
      }
    })
    .catch(err => {
      console.error(err);
      Alert.alert('Erro', 'Falha na conexão com o servidor.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Nova Despesas</Text>

      <Text style={styles.label}>Categoria:</Text>
      <View style={styles.inputBox}>
        <Picker
          selectedValue={categoriaSelecionada}
          onValueChange={(itemValue) => setCategoriaSelecionada(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma categoria" value="" />
          {id_Categoria_saida.map((cat) => (
            <Picker.Item key={cat.id_Categoria_saida}  label={cat.nome} value={cat.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Valor:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Preço"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.label}>Data:</Text>
      <MaskedTextInput
        mask="99/99/9999"
        onChangeText={(text, rawText) => setData(rawText)}
        style={styles.TextInput}
        placeholder="Data (DD/MM/AAAA)"
        keyboardType="numeric"
        value={data}
      />

      <Text style={styles.label}>Conta:</Text>
      <View style={styles.inputBox}>
        <Picker
          selectedValue={contaSelecionada}
          onValueChange={(itemValue) => setContaSelecionada(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma conta" value="" />
          {id_conta.map((conta) => (
            <Picker.Item key={conta.id_conta}  label={conta.banco_nome} value={conta.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Tipo de Pagamento:</Text>
      <View style={styles.inputBox}>
        <Picker
          selectedValue={pagamentoSelecionado}
          onValueChange={(itemValue) => setPagamentoSelecionado(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o tipo de pagamento" value="" />
          {id_Tipo_pagamento.map((tipo) => (
            <Picker.Item key={tipo.id_Tipo_pagamento} label={tipo.nome} value={tipo.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.descricao}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />
      <Text style={styles.label}>Status:</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        multiline
      />

      <TouchableOpacity style={styles.butao} onPress={cadastrarDespesas}>
        <Text style={styles.Cadastrar}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 55 },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 70
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  inputBox: {
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center'
  },
  picker: {
    height: 50,
    width: '100%',
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
  descricao: {
    width: '100%',
    height: 100,
    borderColor: 'black',
    borderWidth: 1.5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  butao: {
    width: '100%',
    height: 45,
    backgroundColor: '#0d1b48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  Cadastrar: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default SeuApp;
