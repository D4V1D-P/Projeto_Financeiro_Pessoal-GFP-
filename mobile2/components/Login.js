// components/Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('Email@gmail.com');
  const [senha, setSenha] = useState('123456789');

  const handleLogin = () => {
    navigation.replace('HomeTab');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon-gfp.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.titulo}>Faça seu login</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.esqueceuSenha}
            onPress={() => navigation.navigate('RecuperarSenha')}>
            <Text style={styles.link}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.botaoTexto}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cadastrar}
          onPress={() => navigation.navigate('Cadastrar')}>
          <Text style={styles.cadastrarTexto}>
            Não tem login? <Text style={styles.cadastrarLink}>(Cadastrar)</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 45,
  },
  logo: { height: 130, marginBottom: 20, alignSelf: 'center' },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d1b48',
    marginBottom: 30,
    textAlign: 'center',
  },
  formGroup: { width: '100%', position: 'relative', marginBottom: 15 },
  label: {
    position: 'absolute',
    top: -10,
    left: 15,
    fontSize: 15,
    zIndex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    width: 'auto',
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
  esqueceuSenha: { alignSelf: 'flex-end', marginTop: 5 },
  link: { color: '#0d1b48', fontSize: 13, textDecorationLine: 'underline' },
  botao: {
    width: '100%',
    backgroundColor: '#0d1b48',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoTexto: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  cadastrar: { marginTop: 15 },
  cadastrarTexto: { color: '#0d1b48', textAlign: 'center' },
  cadastrarLink: { textDecorationLine: 'underline' },
});
