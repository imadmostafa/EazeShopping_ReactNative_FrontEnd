import React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import AccountNavigator from '../../navigation/AccountNavigator';
import AccountScreen from '../AccountScreen';
import OnlineShopping_StackNavigator from '../../navigation/Customer_Navigation/OnlineShopping_StackNavigator';
import MapView_Customer from '../../navigation/Customer_Navigation/StackScreens/Mapview_Customer';
import MapView_StackNavigator from '../../navigation/Customer_Navigation/Mapview_StackNavigator';
const Drawer = createDrawerNavigator();
import {useContext} from 'react';
import {ThemeContext} from '../../Contexts_Settings/ThemeContext';
import * as Notifications from 'expo-notifications';
//import{Notifications } from 'expo';
import { useEffect } from 'react/cjs/react.development';
import * as Permissions from 'expo-permissions';
import API from '../../API_ReactNative/API';
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
//  <Drawer.Screen name="Profile_Drawer" component={ProfileCustomer_StackNavigator} />
 const Drawer_Navigator_Customer = () => {
  const { darkState, setDarkState } = useContext(ThemeContext);
  async function getexponotification(){
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;
      const token = await Notifications.getExpoPushTokenAsync();
      const datato_send={
        "expotoken":token.data,
     }
    API.updateNotification_Token(datato_send).then(res => {
        const result = res.data.user;
        console.log("RESULT: ", result);
       if(res.data.success==false){
       }else{
       
       }
    }).catch(error => console.log("error",error));
   console.log(token);
   } catch (error) {
     console.log('Error getting a token', error);
   }
    
  }
  useEffect(()=>{
getexponotification();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
//Notifications.addListener(notification => console.log(notification))
  },[])
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />} >
      
         <Drawer.Screen name="Home_Drawer" component={OnlineShopping_StackNavigator} />
         <Drawer.Screen name="Map_Drawer" component={MapView_StackNavigator} />
      
     
     
    
    </Drawer.Navigator>
  );
};

export default Drawer_Navigator_Customer;