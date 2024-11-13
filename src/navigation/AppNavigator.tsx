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
  FundTypes,
  AllCredit,
  AllExpense,
  UpdateProfile
} from "../screens/settings/index";

import { WelcomeScreen } from "../screens";

import { ExpenseDetails, CreditDetails, CreditAnalyze, ExpenseAnalyze } from "../screens/audit";

export type ScreenNames = ["App", "AddExpense", "ProfileAndSettings",
  "Funds", "ExpesneReasons", "CreditReasons",
  "Persons", "TransferSuccessful", "CreditDetails",
  "ExpenseDetails", "AddCredit", "CreditTransferSuccessful",
  "ToSelfTransfer", "SelfTransferSuccessful", "CheckBalance",
  "FundType", "CreditAnalyze", "ExpenseAnalyze",
  "AllCredit", "AllExpense", "UpdateProfile", "WelcomeScreen"];
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
          name="FundType"
          component={FundTypes}
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
        <stack.Screen
          name="ExpenseAnalyze"
          component={ExpenseAnalyze}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="CreditAnalyze"
          component={CreditAnalyze}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="AllCredit"
          component={AllCredit}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="AllExpense"
          component={AllExpense}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
