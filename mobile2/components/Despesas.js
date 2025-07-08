import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaskedTextInput } from 'react-native-mask-text';
import axios from 'axios';
import { API_URL } from '../.env';

const Despesas = () => {
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [dataDigitada, setDataDigitada] = useState('');
  const [data, setData] = useState(''); // formato YYYY-MM-DD

  const [descricao, setDescricao] = useState('');
  const [conta, setConta] = useState('');
  const [pag, setPag] = useState('');

  let uid = 'nxx1YdFKQUd8XSwFE6bnN9mQa422';
  let id_usuario = 12;
  const [categorias, setCategorias] = useState([]);
  const [contas, setContas] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    let params = { uid, id_usuario };

    const fetchCategoria = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/categorias-saida-usuario`,
          { params }
        );
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias', error);
      }
    };

    const fetchConta = async () => {
      try {
        const response = await axios.get(`${API_URL}/contas-usuario`, {
          params,
        });
        setContas(response.data);
      } catch (error) {
        console.error('Erro ao buscar contas', error);
      }
    };

    const fetchPagamentos = async () => {
      try {
        const response = await axios.get(`${API_URL}/tipo-pagamento-usuario`, {
          params,
        });
        setPagamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar tipos de pagamento', error);
      }
    };

    fetchCategoria();
    fetchConta();
    fetchPagamentos();
  }, [uid, id_usuario]);

  const cadastrarReceita = (e) => {
    if (!categoria || !conta || !pag) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    e.preventDefault();
    const novaDespesa = {
      id_usuario: id_usuario,
      id_Categoria_saida: categoria,
      valor,
      data,
      descricao,
      id_Tipo_pagamento: pag,
      id_conta: conta,
      status: 'ativo',
      uid: uid,
    };
    console.log(novaDespesa);
    axios
      .post(`${API_URL}/despesas`, novaDespesa)
      .then(() => {
        alert('despesa adicionada!');
      })
      .catch((erro) => {
        alert('erro ao cadastrar despesa' + erro);
        console.error(erro);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Cadastrar Nova Despesa</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Categoria:</Text>
            <View style={styles.inputBox}>
              <Picker
                selectedValue={categoria}
                onValueChange={(value) => setCategoria(value)}>
                <Picker.Item label="Selecione..." value="" />
                {categorias.map((cat) => (
                  <Picker.Item
                    key={cat.id_Categoria_saida}
                    label={cat.nome}
                    value={cat.id_Categoria_saida}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Valor:</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Preço"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data:</Text>
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
                  setData(dataFormatada);
                } else {
                  setData('');
                }
              }}
              style={styles.TextInput}
              placeholder="Data (DD/MM/AAAA)"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Conta:</Text>
            <View style={styles.inputBox}>
              <Picker
                selectedValue={conta}
                onValueChange={(itemValue) => setConta(itemValue)}>
                <Picker.Item label="Selecione uma conta" value="" />
                {contas.map((conta) => (
                  <Picker.Item
                    key={conta.id_conta}
                    label={conta.banco_nome}
                    value={conta.id_conta}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tipo de Pagamento:</Text>
            <View style={styles.inputBox}>
              <Picker
                selectedValue={pag}
                onValueChange={(itemValue) => setPag(itemValue)}>
                <Picker.Item label="Selecione o tipo de pagamento" value="" />
                {pagamentos.map((tipo) => (
                  <Picker.Item
                    key={tipo.id_Tipo_pagamento}
                    label={tipo.nome}
                    value={tipo.id_Tipo_pagamento}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              style={styles.descricao}
              placeholder="Descrição"
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />
          </View>

          <TouchableOpacity style={styles.butao} onPress={cadastrarReceita}>
            <Text style={styles.Cadastrar}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: '#fff' },
  titulo: { fontSize: 20, fontWeight: 500, marginBottom: 40 },

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
  inputBox: {
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.56)',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 45,
    justifyContent: 'center',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  TextInput: {
    width: '100%',
    height: 45,
    borderColor: 'rgba(0, 0, 0, 0.56)',
    borderWidth: 1.5,
    marginBottom: 15,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  descricao: {
    width: '100%',
    height: 100,
    borderColor: 'rgba(0, 0, 0, 0.56)',
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
  Cadastrar: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});

export default Despesas;
