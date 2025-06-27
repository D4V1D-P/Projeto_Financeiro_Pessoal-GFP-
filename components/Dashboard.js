import React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';


const SeuApp = () => {
  return (
    <View style={styles.container}>
    
       <Text style={styles.titulo}>Dashboard</Text>
       <Text style={styles.sub}>Filtrar</Text>
      <TextInput style={styles.TextInput}
        placeholder="Data Inicio"
      />
      <TextInput style={styles.TextInput}
        placeholder="Data Final"
      />
      <TouchableOpacity style={styles.butao}><Text style={styles.Filtrar}>Filtrar</Text></TouchableOpacity>
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

  sub:{
    fontSize:20,
    fontWeight: 'bold',
    marginBottom: 25,
  },
 
  TextInput: {
    width: 300,
    height: 40,
    borderColor: 'black',
    borderWidth: 1.5,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 10
  },

  butao: {
    width: 300,
    height: 45,
    backgroundColor: '#0d1b48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  Filtrar: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  }
});

export default SeuApp;