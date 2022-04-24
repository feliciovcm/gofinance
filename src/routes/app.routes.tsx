import React from 'react';
import {useTheme} from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard/Dashboard';
import { Register } from '../screens/Register';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Resume } from '../screens/Resume';

export type RootStackParamList = {
  Dashboard: undefined;
  Cadastrar: undefined;
  Resumo: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();


export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: theme.colors.secondary,
      tabBarInactiveTintColor: theme.colors.text,
      tabBarLabelPosition: 'beside-icon',
      tabBarStyle: {
        height:  Platform.OS === 'ios' ? 88 : 64,
        paddingVertical: Platform.OS === 'ios' ? 20 : 0,
      }
    }}>
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons 
              name="format-list-bulleted" 
              size={size} 
              color={color} 
            />
          ), 
        }}
      />
      <Screen
        name="Cadastrar"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons 
              name="attach-money" 
              size={size} 
              color={color} 
            />
          ), 
        }}
      >
        {props => <Register {...props} />}
      </Screen>
      <Screen 
        name="Resumo" 
        component={Resume} 
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons 
              name="pie-chart" 
              size={size} 
              color={color} 
            />
          ), 
        }}
      />
    </Navigator>
  )
}