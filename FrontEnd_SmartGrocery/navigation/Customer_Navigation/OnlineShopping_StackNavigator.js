import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../Screens/AccountScreen";
import MessagesScreen from "../../Screens/MessagesScreen";
import ListMembersScreen from "../../Screens/ListMembersScreen";
import Header_CustomerStack from './Header_CustomerStack';
import ListProductsScreen from "./StackScreens/ListProductsScreen";
import MapView_Customer from "./StackScreens/Mapview_Customer";
import MyCart from "./StackScreens/MyCart";
const Stack = createStackNavigator();

const OnlineShopping_StackNavigator = () => (
  <Stack.Navigator mode="modal"    screenOptions={
    { headerShown: true ,
      header: (props) => <Header_CustomerStack {...props} />
    }} 
    initialRouteName={ListProductsScreen}
    >
        
        <Stack.Screen name="Products_Customer" component={ListProductsScreen} />
        <Stack.Screen name="MyCart" component={MyCart} />
    <Stack.Screen name="Account" component={AccountScreen} />
    
    
  </Stack.Navigator>
);

export default OnlineShopping_StackNavigator;
