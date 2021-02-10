import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AccountNavigator from "./AccountNavigator";
import ProductsNavigator from "./ProductsNavigator";
import ListingEditScreen from "../Screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import AddProductNavigator from './AddProductNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Products"
      component={ProductsNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="shopping" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Add"
      component={AddProductNavigator}
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
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
