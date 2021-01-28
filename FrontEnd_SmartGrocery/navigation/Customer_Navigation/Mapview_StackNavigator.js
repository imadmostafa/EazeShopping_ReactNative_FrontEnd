import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../Screens/AccountScreen";
import MessagesScreen from "../../Screens/MessagesScreen";
import ListMembersScreen from "../../Screens/ListMembersScreen";
import Header_CustomerStack from './Header_CustomerStack';
import ListProductsScreen from "./StackScreens/ListProductsScreen";
import MapView_Customer from "./StackScreens/Mapview_Customer";
const Stack = createStackNavigator();

const MapView_StackNavigator = () => (
  <Stack.Navigator mode="modal"    screenOptions={
    { headerShown: true ,
      header: (props) => <Header_CustomerStack {...props} />
    }} 
    initialRouteName={MapView_Customer}
    >
        <Stack.Screen name="MapView" component={MapView_Customer} />
        <Stack.Screen name="Members" component={ListProductsScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    
    
  </Stack.Navigator>
);

export default MapView_StackNavigator;
