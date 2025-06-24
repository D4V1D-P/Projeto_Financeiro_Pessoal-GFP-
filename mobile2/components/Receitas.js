import React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';


const SeuApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Nova Receita</Text>
      <TextInput style={styles.TextInput}
        placeholder="Categoria"
      />
      <TextInput style={styles.TextInput}
        placeholder="Preço"
      />
      <TextInput style={styles.TextInput}
        placeholder="Data"
      />
      <TextInput style={styles.TextInput}
        placeholder="Conta"
      />
      <TextInput style={styles.TextInput}
        placeholder="Tipo de Pagamento"
      />
      <TextInput style={styles.descricao}
        placeholder="Descrição"
      />
      <TouchableOpacity style={styles.butao}><Text style={styles.Cadastrar}>Cadastrar</Text></TouchableOpacity>
    </View>

    
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 55,
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

export default SeuApp;