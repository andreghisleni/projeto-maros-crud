import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppList from './AppList';
import AppForm from './AppForm';

const { Navigator, Screen } = createStackNavigator();

function AppTab() {
  return (
    <NavigationContainer>
      <Navigator
        headerMode="none"
      >
        <Screen
          name="AppList"
          component={AppList}
        />
        <Screen
          name="AppForm"
          component={AppForm}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppTab;
