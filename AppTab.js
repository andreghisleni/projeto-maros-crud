import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AppList from './AppList';
import AppForm from './AppForm';

const { Navigator, Screen } = createBottomTabNavigator();

function AppTab() {
  return (
    <NavigationContainer>
      <Navigator
        tabBarOptions={{
          style: {
            elevation: 0,
            shadowOpacity: 0,
            height: 64,
          },
          tabStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          labelStyle: {
            fontSize: 13,
            marginLeft: 16,
          },
          inactiveBackgroundColor: '#fafafc',
          activeBackgroundColor: '#ebebf5',
          inactiveTintColor: '#c1bccc',
          activeTintColor: '#32264d',
        }}>
        <Screen
          name="AppList"
          component={AppList}
          options={{
            tabBarLabel: 'Compras',
          }}
        />
        <Screen
          name="AppForm"
          component={AppForm}
          options={{
            tabBarLabel: 'Adicionar',
            params: {
              id: ''
            }
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppTab;
