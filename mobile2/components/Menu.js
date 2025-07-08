import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Menu() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.linha}>
        <View style={styles.perfil} />
        <Text style={styles.nome}>David</Text>
      </View>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Dashboard')}>
        <Entypo name="line-graph" size={20} />
        <Text style={styles.text}>Visualizar dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Despesas')}>
        <AntDesign name="minuscircleo" size={20} />
        <Text style={styles.text}>Cadastrar despesas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Receitas')}>
        <AntDesign name="pluscircleo" size={20} />
        <Text style={styles.text}>Cadastrar receitas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Relatorio')}>
        <MaterialCommunityIcons name="notebook-check" size={20} />
        <Text style={styles.text}>Visualizar Relatório</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('CadastrarCategoria')}>
        <MaterialCommunityIcons name="view-grid-plus-outline" size={20} />
        <Text style={styles.text}>Cadastrar Categoria</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('CadastrarConta')}>
        <MaterialCommunityIcons name="wallet-plus-outline" size={20} />
        <Text style={styles.text}>Cadastrar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('CadastrarTipodePagamento')}>
        <MaterialCommunityIcons name="credit-card-plus-outline" size={20} />
        <Text style={styles.text}>Cadastrar Tipo de Pagamento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Usuarios')}>
        <FontAwesome name="user" size={24} color="black" />
        <Text style={styles.text}>Usuario</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => navigation.navigate('Login')}>
        <MaterialCommunityIcons name="logout" size={20} />
        <Text style={styles.text}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flex: 1,
  },
  linha: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  perfil: {
    width: 50,
    height: 50,
    backgroundColor: '#aaa',
    borderRadius: 25,
    marginBottom: 5,
  },
  nome: {
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  text: {
    fontSize: 16,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    gap: 10,
  },
});
