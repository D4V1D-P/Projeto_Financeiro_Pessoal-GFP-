import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../.env';
import Icon from 'react-native-vector-icons/Feather';

const AddConta = () => {
  const navigation = useNavigation();

  const [bancoNome, setBancoNome] = useState('');
  const [descricaoBanco, setDescricaoBanco] = useState('');
  const [saldo, setSaldo] = useState('');
  const [contas, setContas] = useState([]);

  const uid = 'nxx1YdFKQUd8XSwFE6bnN9mQa422';
  const id_usuario = 12;

  // Modal de edição
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editBancoNome, setEditBancoNome] = useState('');
  const [editDescricao, setEditDescricao] = useState('');
  const [editSaldo, setEditSaldo] = useState('');

  const handleSubmit = async () => {
    if (!bancoNome || !descricaoBanco || !saldo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const novaConta = {
      id_usuario,
      banco_nome: bancoNome,
      descricao_banco: descricaoBanco,
      saldo,
      status: 'ativo',
      uid,
    };

    try {
      await axios.post(`${API_URL}/Conta`, novaConta);
      Alert.alert('Sucesso', 'Conta cadastrada com sucesso!');
      setBancoNome('');
      setDescricaoBanco('');
      setSaldo('');
      fetchContas();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar conta: ' + error.message);
    }
  };

  const fetchContas = async () => {
    try {
      const params = { uid, id_usuario };
      const response = await axios.get(`${API_URL}/contas-usuario`, { params });
      setContas(response.data);
    } catch (error) {
      console.log('Erro ao buscar contas', error);
    }
  };

  useEffect(() => {
    fetchContas();
  }, []);

  const abrirModalEdicao = (item) => {
    setEditId(item.id_conta);
    setEditBancoNome(item.banco_nome);
    setEditDescricao(item.descricao_banco);
    setEditSaldo(String(item.saldo));
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    try {
      const contaAtualizada = {
        banco_nome: editBancoNome,
        descricao_banco: editDescricao,
        saldo: editSaldo,
        uid,
        status: 'ativo',
      };

      await axios.put(`${API_URL}/Conta/${editId}`, contaAtualizada);
      Alert.alert('Sucesso', 'Conta atualizada!');
      setModalVisible(false);
      fetchContas();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar conta: ' + error.message);
    }
  };

  const excluirConta = (id) => {
    Alert.alert('Confirmação', 'Tem certeza que deseja excluir esta conta?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/contas/${id}`);
            fetchContas();
          } catch (error) {
            Alert.alert('Erro', 'Erro ao excluir conta.');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitulo}>{item.banco_nome}</Text>
        <Text style={styles.itemDetalhe}>{item.descricao_banco}</Text>
        <Text style={styles.itemDetalhe}>R$ {item.saldo}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => abrirModalEdicao(item)}>
          <Icon name="edit-3" size={20} color="#204A77" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => excluirConta(item.id_conta)}>
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
      <Text style={styles.titulo}>Adicionar Conta</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome Conta</Text>
        <TextInput
          style={styles.inputBox}
          value={bancoNome}
          onChangeText={setBancoNome}
          placeholder="Digite o nome da conta"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.inputBox}
          value={descricaoBanco}
          onChangeText={setDescricaoBanco}
          placeholder="Digite a descrição"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Saldo</Text>
        <TextInput
          style={styles.inputBox}
          value={saldo}
          onChangeText={setSaldo}
          placeholder="Digite o saldo"
          keyboardType="numeric"
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
        data={contas}
        keyExtractor={(item) => item.id_conta.toString()}
        renderItem={renderItem}
        style={{ marginTop: 30 }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.titulo}>Editar Conta</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.inputBox}
                value={editBancoNome}
                onChangeText={setEditBancoNome}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={styles.inputBox}
                value={editDescricao}
                onChangeText={setEditDescricao}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Saldo</Text>
              <TextInput
                style={styles.inputBox}
                value={editSaldo}
                onChangeText={setEditSaldo}
                keyboardType="numeric"
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

export default AddConta;

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
  voltarTexto: {
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
  itemDetalhe: {
    fontSize: 12,
    color: '#555',
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
