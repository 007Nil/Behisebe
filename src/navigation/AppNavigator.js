import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AppScreen from "../screens/AppScreen";
import { AddExpense, AddCredit } from "../screens/moneyTransfer/index";


const stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="App"
          component={AppScreen}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="AddExpense"
          component={AddExpense}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="AddCredit"
          component={AddCredit}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
