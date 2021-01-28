import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../Screens/AccountScreen";
import MessagesScreen from "../../Screens/MessagesScreen";
import ListMembersScreen from "../../Screens/ListMembersScreen";

const Stack = createStackNavigator();

const ProfileCustomer_StackNavigator = () => (
  <Stack.Navigator >
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Members" component={ListMembersScreen} />
  </Stack.Navigator>
);

export default ProfileCustomer_StackNavigator;
