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
 
 function fetchcategories_frombackend(){
  API.getCategories().then(res => {
      const result = res.data.categories;
      console.log("RESULT: ", result);
      alert(result[1].name);
     if(res.data.success==false){
     }else{
      //setCategories(res.data.categories);
      let tempholder_categories=res.data.categories;
      tempholder_categories.unshift({id:0,name:'Any'});//this will add to first of arry and push
      console.log('muttaed categ',tempholder_categories);
     setFetchedCategories(tempholder_categories);
     }
  }).catch(error => console.log("error",error));
 }//end of fetchCategories from backend

 useEffect(() => {
 // fetchcategories_frombackend();
}, []);
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
//storeData('hello there');
console.log('data stored');
let vv=getData();
console.log('now get value');
console.log(vv);
setStringValue = async (value) => {
  try {
    await AsyncStorage.setItem('key', value)
  } catch(e) {
    // save error
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
const categories = [
  { label: "Furniture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Cameras", value: 3 },
];
const category_initial={
  id:0,
  name:'food'
}
const[category,setCategory]=useState(category_initial);
//I18nManager.allowRTL(false);
//I18nManager.forceRTL(false);
if(I18nManager.isRTL){
  console.log('ture');
}else{
  console.log('false no rtl');
}
function onChangeImage(){
  
}
const theme = {
  
  colors: {
    
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
if(true){




  const[darkState,setDarkState]=useState(false);
  return (
    <ThemeContext.Provider value={{darkState,setDarkState}}>
   
    <Navigation_1/>

    
    </ThemeContext.Provider>
  )
}else{


  return (
    <Screen style={styles.screen}>
   <Button title="hello"></Button>
     <AppButton onPress={()=>{
       let v=firstname2;
       console.log(firstname2);
     }} title="hello"></AppButton>
     <AppButton onPress={()=>setStringValue('hello')} title="hello"></AppButton>
     <FlatList
        data={fetchedcategories}
        keyExtractor={(fetchedcategories) => fetchedcategories.id.toString()}
        renderItem={({ item }) => (
    
          <Text> {item.id}
            {item.name}</Text>
        )}
      />
      <TextInput 
      secureTextEntry
      onChangeText={(text)=>setFirstName(text)}
      placeholder="hello"
      style={{
        borderBottomColor:colors.black,
        borderBottomWidth:1
      }}
      
      />
      {
        fetchedcategories!=[]?
        (
        <AppPicker
          onSelectItem={(item)=>setCategory(item)}
          items={fetchedcategories}
          icon="apps"
          placeholder="Category"
          selectedItem={category}
          />
          ):
          (<Text>waiting...</Text>)
      }
      <AppTextInput icon="email"></AppTextInput>
      </Screen>
  );
    }//end of else
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









/*



//
 <MaterialCommunityIcons name="email" color="dodgerblue" size={200}/>
     <AppText>Hello s</AppText>
     <AppButton title="hello world" onPress={()=>fetchcategories_frombackend()}/>



//





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
<Text
     style={{
       fontSize:50,
       lineHeight:60,
       color:'tomato',
       textAlign:'center'
     }}>
      
Hello There enjoy coding and coffee shopping any time you want ;

     </Text>
<Text>hello  WOW !</Text>
      <Button title="hello" onPress={()=>alert('hello')}/>
      <TouchableOpacity onPress={()=> fetchcategories_frombackend()}>

      <Image 
    fadeDuration={1000}
   source={{
     width:200,
     height:300, 
     uri:'https://picsum.photos/200'
   }}/>
      </TouchableOpacity>
      */