import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import AppScreen from "../screens/AppScreen";
import {
  AddExpense,
  AddCredit,
  ToSelfTransfer,
  CheckBalance,
  SelfTransferSuccessful,
  TransferSuccessful,
  CreditTransferSuccessful
} from "../screens/moneyTransfer/index";
import ProfileAndSettings from "../screens/settings/ProfileAndSettings";
import {
  Funds,
  ExpesneReasons,
  CreditReasons,
  Persons,
} from "../screens/settings/index";

import { ExpenseDetails, CreditDetails } from "../screens/audit";

export type ScreenNames = ["App", "AddExpense", "ProfileAndSettings",
  "Funds", "ExpesneReasons", "CreditReasons",
  "Persons", "TransferSuccessful", "CreditDetails",
  "ExpenseDetails", "AddCredit", "CreditTransferSuccessful",
  "ToSelfTransfer","SelfTransferSuccessful","CheckBalance"];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

// const stack = createStackNavigator();
const stack = createStackNavigator<RootStackParamList>();
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

        <stack.Screen
          name="ToSelfTransfer"
          component={ToSelfTransfer}
          options={{ headerShown: false }}
        />
        
        <stack.Screen
          name="SelfTransferSuccessful"
          component={SelfTransferSuccessful}
          options={{ headerShown: false }}
        />
      
        <stack.Screen
          name="CheckBalance"
          component={CheckBalance}
          options={{ headerShown: false }}
        />
        
        <stack.Screen
          name="CreditTransferSuccessful"
          component={CreditTransferSuccessful}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="ProfileAndSettings"
          component={ProfileAndSettings}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="Funds"
          component={Funds}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="ExpesneReasons"
          component={ExpesneReasons}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="CreditReasons"
          component={CreditReasons}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="Persons"
          component={Persons}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="TransferSuccessful"
          component={TransferSuccessful}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="ExpenseDetails"
          component={ExpenseDetails}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="CreditDetails"
          component={CreditDetails}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
