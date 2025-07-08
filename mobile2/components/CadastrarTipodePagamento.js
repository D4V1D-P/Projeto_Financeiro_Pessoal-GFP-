import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { API_URL } from '../.env';

const CadastrardeTipoPagamento = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [tiposPagamento, setTiposPagamento] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState('');

  const uid = 'nxx1YdFKQUd8XSwFE6bnN9mQa422';
  const id_usuario = 12;

  const handleSubmit = async () => {
    if (!nome) {
      Alert.alert('Erro', 'Preencha o nome!');
      return;
    }

    const novoTipo = {
      id_usuario,
      nome,
      uid,
    };

    try {
      await axios.post(`${API_URL}/tipo_pagamento`, novoTipo);
      Alert.alert('Sucesso', 'Tipo de pagamento cadastrado!');
      setNome('');
      fetchTiposPagamento();
    } catch (err) {
      Alert.alert('Erro', 'Erro ao cadastrar: ' + err.message);
    }
  };

  const fetchTiposPagamento = async () => {
    try {
      const params = { uid, id_usuario };
      const response = await axios.get(`${API_URL}/tipo-pagamento-usuario`, {
        params,
      });
      setTiposPagamento(response.data);
    } catch (error) {
      console.error('Erro ao buscar tipos:', error);
    }
  };

  useEffect(() => {
    fetchTiposPagamento();
  }, []);

  const abrirModalEdicao = (item) => {
    setEditId(item.id_Tipo_pagamento);
    setEditNome(item.nome);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    try {
      await axios.put(`${API_URL}/tipo_pagamento/${editId}`, {
        nome: editNome,
        uid,
        status: 'ativo',
      });
      setModalVisible(false);
      fetchTiposPagamento();
      Alert.alert('Sucesso', 'Tipo de pagamento atualizado!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar: ' + error.message);
    }
  };

  const excluirTipo = (id) => {
    Alert.alert('Excluir', 'Deseja mesmo excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/tipo_pagamento/${id}`);
            fetchTiposPagamento();
          } catch (error) {
            Alert.alert('Erro', 'Erro ao excluir.');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitulo}>{item.nome}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => abrirModalEdicao(item)}>
          <Icon name="edit-3" size={20} color="#204A77" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => excluirTipo(item.id_tipo_pagamento)}>
          <Icon
            name="trash-2"
            size={20}
            color="#E9332E"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Tipo de Pagamento</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tipo de Pagamento:</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Ex: Pix"
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <TouchableOpacity style={styles.butao} onPress={handleSubmit}>
        <Text style={styles.Cadastrar}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.butaoVoltar}
        onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>

      <FlatList
        data={tiposPagamento}
        keyExtractor={(item) => item.id_Tipo_pagamento.toString()}
        renderItem={renderItem}
        style={{ marginTop: 30 }}
      />

      {/* Modal de Edição */}
      <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.titulo}>Editar Tipo</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.inputBox}
              value={editNome}
              onChangeText={setEditNome}
            />
          </View>
          <TouchableOpacity style={styles.butao} onPress={salvarEdicao}>
            <Text style={styles.Cadastrar}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.butaoVoltar}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.voltarTexto}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
    </View>
  );
};

export default CadastrardeTipoPagamento;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  voltarTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 15,
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
  inputBox: {
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.56)',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 45,
    backgroundColor: '#fff',
  },
  butao: {
    height: 45,
    backgroundColor: '#0d1b48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
  },
  butaoVoltar: {
    height: 45,
    backgroundColor: '#c3c3c3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  Cadastrar: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.56)',
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  itemTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  modalView: {
    marginTop: 100,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
