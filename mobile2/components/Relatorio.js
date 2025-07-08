import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { API_URL } from '../.env';

const RelatorioScreen = () => {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-11-01');
  const [registros, setRegistros] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editValor, setEditValor] = useState('');
  const [editData, setEditData] = useState('');

  const uid = 'nxx1YdFKQUd8XSwFE6bnN9mQa422';

  const filtrarRegistros = async () => {
    try {
      const params = { uid };

      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await axios.get(`${API_URL}/gastosedespesas`, {
        params,
      });
      setRegistros(response.data);
    } catch (error) {
      console.log('Erro ao buscar registros:', error.message);
      Alert.alert('Erro', 'Não foi possível buscar os registros.');
    }
  };

  useEffect(() => {
    filtrarRegistros();
  }, []);

  const editarRegistro = (item) => {
    setEditItem(item);
    setEditValor(String(item.valor));
    setEditData(item.data);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    try {
      const payload = {
        valor: editValor,
        data: editData,
        uid,
        status: 'ativo',
      };

      const endpoint =
        editItem.tipo === 'receita'
          ? `${API_URL}/receitas/${editItem.id}`
          : `${API_URL}/despesas/${editItem.id}`;

      await axios.put(endpoint, payload);
      setModalVisible(false);
      filtrarRegistros();
      Alert.alert('Sucesso', 'Registro atualizado!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar: ' + error.message);
    }
  };

  const excluirRegistro = (id) => {
    Alert.alert('Confirmação', 'Tem certeza que deseja excluir?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: async () => {
          await axios.delete(`${API_URL}/despesas/${id}`);
          filtrarRegistros();
        },
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitulo}>
          {item.nome_categoria === null
            ? 'Categoria não encontrada'
            : `${item.nome_categoria}`}
        </Text>
        <Text style={styles.itemDetalhe}>Data: {item.data}</Text>
        <Text
          style={[
            styles.itemValor,
            { color: item.tipo === 'receita' ? 'green' : 'red' },
          ]}>
          {item.tipo === 'receita'
            ? `+ R$${item.valor}`
            : `- R$${Math.abs(item.valor)}`}
        </Text>
      </View>
      <View style={styles.itemRight}>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => editarRegistro(item)}>
            <Icon name="edit-3" size={20} color="#204A77" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => excluirRegistro(item.id)}>
            <Icon
              name="trash-2"
              size={20}
              color="#E9332E"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Relatório</Text>
      <Text style={styles.sub}>Filtrar</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data Início:</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="YYYY-MM-DD"
          value={startDate}
          onChangeText={setStartDate}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data Final:</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="YYYY-MM-DD"
          value={endDate}
          onChangeText={setEndDate}
        />
      </View>

      <TouchableOpacity style={styles.butao} onPress={filtrarRegistros}>
        <Text style={styles.Filtrar}>Filtrar</Text>
      </TouchableOpacity>

      <FlatList
        data={registros}
        keyExtractor={(item) => `${item.id}-${item.valor}`}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.titulo}>Editar Registro</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Valor:</Text>
            <TextInput
              style={styles.TextInput}
              value={editValor}
              onChangeText={setEditValor}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data:</Text>
            <TextInput
              style={styles.TextInput}
              value={editData}
              onChangeText={setEditData}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <TouchableOpacity style={styles.butao} onPress={salvarEdicao}>
            <Text style={styles.Filtrar}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.butao, { backgroundColor: '#ccc' }]}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.Filtrar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
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
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0d1b48',
  },
  sub: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
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
  butao: {
    width: '100%',
    height: 45,
    backgroundColor: '#0d1b48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
  },
  Filtrar: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
  },
  itemTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetalhe: {
    fontSize: 12,
    color: '#555',
  },
  itemValor: {
    fontSize: 16,
    marginTop: 5,
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
    marginTop: 10,
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

export default RelatorioScreen;
