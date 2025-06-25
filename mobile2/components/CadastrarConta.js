import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function CadastrarConta() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Cadastrar Conta</Text>
        <TextInput style={styles.TextInput}
        placeholder="Nome"
      />
      <TextInput style={styles.TextInput}
        placeholder="Valor"
        keyboardType="numeric"
      />
      <TextInput  style={styles.descricao}
        placeholder="Descriçao"
      />
      <TouchableOpacity style={styles.butao}><Text style={styles.Cadastrar}>Cadastrar</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 55,
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
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom:'70'
  },
  TextInput: {
    width: 300,
    height: 40,
    borderColor: 'black',
    borderWidth: 1.5,
    marginBottom: 15,
    borderRadius: 12,
    paddingHorizontal: 10
  },
  descricao: {
    width: 300,
    height: 100,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  butao: {
    width: 300,
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
  }
});
