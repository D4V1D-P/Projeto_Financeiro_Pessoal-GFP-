import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { View } from 'react-native';

import Dashboard from './Dashboard';
import Receitas from './Receitas';
import Despesas from './Despesas';
import Relatorio from './Relatorio';
import Menu from './Menu';



const Tab = createBottomTabNavigator();

export default function RotasTab() {
  return (
    <Tab.Navigator
      initialRouteName="Relatorio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0d1b48',
          height: 65,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let IconComponent;
          let iconColor = focused ? '#0d1b48' : color;
          let bgColor = focused ? '#00ff99' : 'transparent';

          if (route.name === 'Receitas') {
            IconComponent = AntDesign;
            iconName = 'pluscircleo';
          } else if (route.name === 'Despesas') {
            IconComponent = AntDesign;
            iconName = 'minuscircleo';
          } else if (route.name === 'Dashboard') {
            IconComponent = Entypo;
            iconName = 'line-graph';
          }  else if (route.name === 'Relatorio') {
            IconComponent = MaterialCommunityIcons;
            iconName = 'notebook-check';
          }  else if (route.name === 'Menu') {
            IconComponent = MaterialCommunityIcons;
            iconName = 'menu';
          }
          else if (route.name === 'CadastrarConta') {
            IconComponent = MaterialCommunityIcons;
            iconName = 'CadastrarConta';
          }

          return (
            <View style={{
              backgroundColor: bgColor,
              borderRadius: 25,
              padding: focused ? 4 : 0,
            }}>
              <IconComponent name={iconName} size={20} color={iconColor} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name='Receitas' component={Receitas} />
      <Tab.Screen name='Despesas' component={Despesas} />
      <Tab.Screen name='Dashboard' component={Dashboard} />
      <Tab.Screen name='Relatorio' component={Relatorio} />
      <Tab.Screen name='Menu' component={Menu} />
    
      
    </Tab.Navigator>
  );
}
