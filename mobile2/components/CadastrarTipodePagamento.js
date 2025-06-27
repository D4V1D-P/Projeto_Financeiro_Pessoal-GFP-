import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SeuApp = () => {
const [id_Tipo_pagamento, setId_Tipo_Pagamento] = useState([]);
const navigation = useNavigation();

  const cadastrarTipodePagamento = () => {
   
    fetch('https://apifinanceiropessoal.webapptech.site/api/tipo_pagamento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_Tipo_pagamento
      })
    })
    .then(res => {
      if (res.ok) {
        Alert.alert('Sucesso', 'Tipo de Pagamento cadastrado com sucesso!');
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
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Cadastrar Tipo de Pagamneto</Text>

      <Text style={styles.label}>Tipo de Pagamento:</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Tipo de Pagamento"
        value={id_Tipo_pagamento}
        onChangeText={setId_Tipo_Pagamento}
        multiline
      />


      <TouchableOpacity style={styles.butao} onPress={cadastrarTipodePagamento}>
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
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  voltarTexto: {
    textAlign: 'center',
    marginLeft: 5,
    fontSize: 16,
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
