// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import RotasTab from './components/RotasTab';


import CadastrarCategoria from './components/CadastrarCategoria'; 
import CadastrarConta from './components/CadastrarConta'; 
import CadastrarTipodePagamento from './components/CadastrarTipodePagamento'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
       
        <Stack.Screen name="HomeTab" component={RotasTab} />

        
        <Stack.Screen name="CadastrarCategoria" component={CadastrarCategoria} />
        <Stack.Screen name="CadastrarConta" component={CadastrarConta} />
        <Stack.Screen name="CadastrarTipodePagamento" component={CadastrarTipodePagamento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
