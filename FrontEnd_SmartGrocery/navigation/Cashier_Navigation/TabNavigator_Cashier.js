import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapScreen_Cashier from "./MapScreen_Cashier";
import AllOrdersScreen_Cashier from "./AllOrdersScreen_Cashier";

import OrdersStackNavigator from './OrdersStackNavigator';
const Tab = createBottomTabNavigator();

const TabNavigator_Customer = () => (
  <Tab.Navigator>
      <Tab.Screen
      name="Deliver Order"
      component={OrdersStackNavigator}
      options={({ navigation }) => ({
        
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    />
    
    <Tab.Screen
      name="Maps"
      component={MapScreen_Cashier}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="google-maps" color={color} size={size} />
        ),
      }}
    />
    
    <Tab.Screen
      name="Account"
      component={MapScreen_Cashier}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator_Customer;
