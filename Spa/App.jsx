/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { MAIN_COLOR } from './styles';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail'
import Modify from './src/screens/Modify'
import Customer from './src/screens/Customer'
import AddCustomer from './src/screens/AddCustomer'
import Transaction from './src/screens/Transaction'
import TranDetail from './src/screens/TranDetail'
import Setting from './src/screens/Setting'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function SpaTabs() {
  const [name, setName] = useState("")

  useEffect(() => {
    fetchName()
  }, [])

  const fetchName = async () => {
    const res = await AsyncStorage.getItem('user');
    if (res) {
      setName(res)
    }
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: MAIN_COLOR,
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => ({
          title: name,
          headerStyle: {
            backgroundColor: MAIN_COLOR,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <MaterialDesignIcons
              name="account-circle"
              size={30}
              color="#fff"
              style={{ marginRight: 15 }}
            />
          ),
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="cash" color={color} size={size} />
          ),
          headerStyle: {
            backgroundColor: MAIN_COLOR
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          }
        }}
      />
      <Tab.Screen
        name="Customer"
        component={Customer}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="account-group" color={color} size={size} />
          ),
          headerStyle: {
            backgroundColor: MAIN_COLOR
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          }
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="cog" color={color} size={size} />
          ),
          headerStyle: {
            backgroundColor: MAIN_COLOR
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          }
        }}
      />
    </Tab.Navigator>
  );
}

const StackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Login" component={Login} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Main" component={SpaTabs} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Detail" component={Detail}
        options={{
          title: "Service Detail",
          headerStyle: {
            backgroundColor: MAIN_COLOR,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen name="TDetail" component={TranDetail}
        options={{
          title: "Transaction Detail",
          headerStyle: {
            backgroundColor: MAIN_COLOR,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen name="Service" component={Modify}
        options={() => ({
          title: "Service",
          headerStyle: {
            backgroundColor: MAIN_COLOR,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        })}
      />
      <Stack.Screen name="Addcus" component={AddCustomer}
        options={{
          title: "Add customer",
          headerStyle: {
            backgroundColor: MAIN_COLOR,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
    </Stack.Navigator>
  )
}

function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <StatusBar barStyle={'light-content'} backgroundColor={MAIN_COLOR} />
          <StackScreen />
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
}

export default App;