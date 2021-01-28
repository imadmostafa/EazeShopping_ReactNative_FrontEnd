import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../Screens/ListingsScreen";
import ListingDetailsScreen from "../Screens/ListingDetailsScreen";
import CustomNavigationBar from './CustomNavigationBar';

const Stack = createStackNavigator();

const ProductsNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={
    { headerShown: true ,
      header: (props) => <CustomNavigationBar {...props} />
    }
    
  }>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
  </Stack.Navigator>
);

export default ProductsNavigator;
