import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomNavigationBar from '../CustomNavigationBar';
import AllOrdersScreen_Cashier from "./AllOrdersScreen_Cashier";

const Stack = createStackNavigator();

const OrdersStackNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={
    { headerShown: true ,
      header: (props) => <CustomNavigationBar {...props} />
    }
    
  }>
    <Stack.Screen name="AllOrders" component={AllOrdersScreen_Cashier} />
    <Stack.Screen name="Current" component={AllOrdersScreen_Cashier} />
  </Stack.Navigator>
);

export default OrdersStackNavigator;
