// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import RotasTab from './components/RotasTab';

import CadastrarCategoria from './components/CadastrarCategoria';
import CadastrarConta from './components/CadastrarConta';
import CadastrarTipodePagamento from './components/CadastrarTipodePagamento';
import Usuarios from './components/Usuarios';
import Login from './components/Login';
import RecuperarSenha from './components/RecuperarSenha';
import Cadastrar from './components/Cadastrar';
import Receitas from './components/Receitas'
import Despesas from './components/Despesas'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroudColor: '#fff'}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomeTab" component={RotasTab} />
          <Stack.Screen name="Receitas" component={Receitas} />
          <Stack.Screen name="Despesas" component={Despesas} />
          <Stack.Screen
            name="CadastrarTipodePagamento"
            component={CadastrarTipodePagamento}
          />
          <Stack.Screen name="CadastrarConta" component={CadastrarConta} />

          <Stack.Screen
            name="CadastrarCategoria"
            component={CadastrarCategoria}
          />
          <Stack.Screen name="Usuarios" component={Usuarios} />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
          <Stack.Screen name="Cadastrar" component={Cadastrar} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
