import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingEditScreen from '../Screens/ListingEditScreen';
import MessagesScreen from '../Screens/MessagesScreen';
const Stack = createStackNavigator();

const AddProductNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="ListingEdit" component={ListingEditScreen} />
    <Stack.Screen name="Messages_forinfo" component={MessagesScreen} />
  </Stack.Navigator>
);

export default AddProductNavigator;
