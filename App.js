import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState,useRef} from 'react';
import { FlatList,SafeAreaView ,StyleSheet,Picker, Image,Text,TextInput, View,Touchable ,TouchableOpacity,TouchableWithoutFeedback, Button, TextComponent} from 'react-native';
import API from './API';
import AppText from './FrontEnd_SmartGrocery/Components/AppText';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import WelcomeScreen from './FrontEnd_SmartGrocery/Screens/WelcomeScreen';
import AppButton from './FrontEnd_SmartGrocery/Components/AppButton';
import colors from './FrontEnd_SmartGrocery/config/colors';
import AppBar_Reuse from './FrontEnd_SmartGrocery/Components/AppBar_Reuse';
import BottomNavigation_Reuse from './FrontEnd_SmartGrocery/Components/BottomNavigation_Reuse';
import CardReuse from './FrontEnd_SmartGrocery/Components/Card_Reuse';
import Screen from './FrontEnd_SmartGrocery/Screens/Screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppPicker from './FrontEnd_SmartGrocery/Components/AppPicker';
import AppTextInput from './FrontEnd_SmartGrocery/Components/AppTextInput';
import LoginScreen from './FrontEnd_SmartGrocery/Screens/LoginScreen';
import RegisterScreen_Customer from './FrontEnd_SmartGrocery/Screens/RegisterScreen_Customer';
import {AppRegistry, I18nManager } from 'react-native';

import ImageInput from './FrontEnd_SmartGrocery/Components/ImageInput';
import Navigatoin_1 from './FrontEnd_SmartGrocery/Screens/Navigation_1';
import Navigation_1 from './FrontEnd_SmartGrocery/Screens/Navigation_1';

import { Provider as PaperProvider ,DarkTheme as PaperDarkTheme, DefaultTheme} from 'react-native-paper';
import { useContext } from 'react';
import {ThemeContext} from './FrontEnd_SmartGrocery/Contexts_Settings/ThemeContext';
export default function App() {
 const [fetchedcategories,setFetchedCategories]=useState([]);
 

const[firstname,setFirstName]=useState('');
const[firstname2,setFirstName2]=useState('');

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('key1');
    if(value !== null) {
      console.log('value diff than null');
      console.log(value);
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('key1', value)
  } catch (e) {
    // saving error
  }
}

console.log('data stored');
let vv=getData();
console.log('now get value');
console.log(vv);
setStringValue = async (value) => {
  try {
    await AsyncStorage.setItem('key', value)
  } catch(e) {
    
  }

  console.log('Done.')
}
getMyStringValue = async () => {
  setFirstName2(AsyncStorage.getItem('key'));
  try {
    return await AsyncStorage.getItem('key')
  } catch(e) {
    // read error
  }
  console.log('Done.')
}
  const[darkState,setDarkState]=useState(false);//for dark theme control context 
  return (
    <ThemeContext.Provider value={{darkState,setDarkState}}>
   
    <Navigation_1/>

    
    </ThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    backgroundColor: colors.white,
  }
})


