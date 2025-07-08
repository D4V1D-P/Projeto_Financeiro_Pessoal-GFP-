import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { API_URL } from '../.env';
import { ca } from 'date-fns/locale';

const AddCategoria = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editCategoriaNome, setEditCategoriaNome] = useState('');
  const [editCategoriaTipo, setEditCategoriaTipo] = useState('');
  const [editCategoriaId, setEditCategoriaId] = useState(null);
  const uid = 'nxx1YdFKQUd8XSwFE6bnN9mQa422';
  const id_usuario = 12;

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const params = { uid, id_usuario };
      const [resEntrada, resSaida] = await Promise.all([
        axios.get(`${API_URL}/categorias-entrada-usuario`, { params }),
        axios.get(`${API_URL}/categorias-saida-usuario`, { params }),
      ]);

      const catEntrada = resEntrada.data.map((cat) => ({
        ...cat,
        tipo: 'Receita',
      }));
      const catSaida = resSaida.data.map((cat) => ({
        ...cat,
        tipo: 'Despesa',
      }));

      setCategorias([...catEntrada, ...catSaida]);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      Alert.alert('Erro ao carregar categorias');
    }
  };

  const handleSubmit = async () => {
    if (!nome || !categoria) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const novaCategoria = { id_usuario, nome, uid, status: 'ativo' };

    const url =
      categoria === 'Receita'
        ? `${API_URL}/categoria_entrada`
        : categoria === 'Despesa'
        ? `${API_URL}/CategoriaSaida`
        : null;

    if (!url) {
      Alert.alert('Erro', 'Selecione um tipo de categoria válido.');
      return;
    }

    try {
      await axios.post(url, novaCategoria);
      Alert.alert('Sucesso', 'Categoria cadastrada com sucesso!');
      setNome('');
      setCategoria('');
      fetchCategorias();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar categoria: ' + error.message);
    }
  };

  const abrirModalEdicao = (item) => {
    setEditCategoriaNome(item.nome);
    setEditCategoriaTipo(item.tipo);
    setEditCategoriaId(item.id);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (!editCategoriaNome || !editCategoriaTipo) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const rota =
      editCategoriaTipo === 'Receita'
        ? `${API_URL}/categoria_entrada/${editCategoriaId}`
        : `${API_URL}/CategoriaSaida/${editCategoriaId}`;

    try {
      await axios.put(rota, {
        id_usuario,
        nome: editCategoriaNome,
        uid,
        status: 'ativo',
      });
      console.log(editCategoriaId);
      console.log(nome);
      Alert.alert('Sucesso', 'Categoria atualizada!');
      setModalVisible(false);
      fetchCategorias();
    } catch (error) {
      console.log(editCategoriaNome);
      console.log(editCategoriaId);
      Alert.alert('Erro', 'Erro ao atualizar: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Categoria</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria:</Text>
        <TextInput
          style={styles.TextInput}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome da categoria"
        />
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.label}>Tipo</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={categoria}
          onValueChange={(value) => setCategoria(value)}>
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Despesa" value="Despesa" />
          <Picker.Item label="Receita" value="Receita" />
        </Picker>
      </View>
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
        data={categorias}
        keyExtractor={(item) => `${item.uid}-${item.nome}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitulo}>{item.nome}</Text>
              <Text style={styles.itemDetalhe}>{item.tipo}</Text>
            </View>
            <View style={styles.icons}>
              <TouchableOpacity
                onPress={() =>
                  abrirModalEdicao({
                    ...item,
                    id: item.id_Categoria_entrada || item.id_Categoria_saida,
                  })
                }>
                <Icon name="edit-3" size={20} color="#204A77" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Handledelete(item)}>
                <Icon name="trash-2" size={20} color="#E9332E" style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Editar Categoria</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                style={styles.picker1}
                value={editCategoriaNome}
                onChangeText={setEditCategoriaNome}
                placeholder="Nome"
              />
            </View>

   <View style={styles.inputContainer}>
    <Text style={styles.label}>Tipo:</Text>
            <View style={styles.picker1}>
              <Picker
                selectedValue={editCategoriaTipo}
                onValueChange={(val) => setEditCategoriaTipo(val)}>
                <Picker.Item label="Receita" value="Receita" />
                <Picker.Item label="Despesa" value="Despesa" />
              </Picker>
            </View>
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

  function Handledelete(categoria) {
    Alert.alert('Confirmação', 'Tem certeza que deseja excluir?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: async () => {
          const rota =
            categoria.tipo === 'Receita'
              ? 'categoria_entrada'
              : 'CategoriaSaida';
          const id =
            categoria.id_Categoria_entrada || categoria.id_Categoria_saida;

          axios
            .delete(`${API_URL}/${rota}/${id}`)
            .then(() => {
              alert('Dado apagado com sucesso!');
              setCategorias((prev) =>
                prev.filter((cat) => {
                  const catId =
                    cat.id_Categoria_entrada || cat.id_Categoria_saida;
                  return !(catId === id && cat.tipo === categoria.tipo);
                })
              );
            })
            .catch((err) => {
              alert('Erro ao apagar categoria');
              console.error(err);
            });
        },
        style: 'destructive',
      },
    ]);
  }
};

export default AddCategoria;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#fff',
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
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
  icons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  TextInput: {
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.56)',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
  },
  picker1: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.56)',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.56)',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
  },
  butao: {
    backgroundColor: '#0d1b48',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  butaoVoltar: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  Cadastrar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  voltarTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.56)',
  },
  itemTitulo: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemDetalhe: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
  },
});
