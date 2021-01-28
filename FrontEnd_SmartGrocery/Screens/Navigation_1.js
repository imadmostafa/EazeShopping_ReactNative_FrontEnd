import { getFocusedRouteNameFromRoute, NavigationContainer ,DarkTheme as NavigationDarkTheme
    ,DefaultTheme as NavigationDefaultTheme} 
from '@react-navigation/native';


import { createStackNavigator } from '@react-navigation/stack';
import React,{useState,useEffect} from 'react';
import Screen from '../Components/Screen';
import {Text,Button} from 'react-native';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import AuthNavigator from '../navigation/AuthNavigator';
import AppNavigator from '../navigation/AppNavigator';
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import navigationTheme from "../navigation/navigationTheme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawer_Navigator_Customer from './Customer_Screens/Drawer_Navigator_Customer';
import {Provider as PaperProvider, DefaultTheme as PaperDefaultTheme,DarkTheme as PaperDarkTheme } from 'react-native-paper';
import {ThemeContext} from '../Contexts_Settings/ThemeContext';
import {useContext} from 'react';
import TabNavigator_Customer from '../navigation/Cashier_Navigation/TabNavigator_Cashier';
const Stack = createStackNavigator();

function details({route}){
    return(
        <Screen>
           <Text>
               {route.params.id}
           </Text>
        </Screen>
    )
}

const Tweet = ({route,navigation})=>


(
    <Screen>
        <Text>
         {
             route.params? 
             (route.params.id):
             ("hello")
             }
        </Text>
      
        <Button title="go to home" onPress={()=>navigation.navigate("Home",
        {
            id:444,
        }
        )
        }/>
    </Screen>
)

const Home = ({navigation,route})=>{
    return(
    <Screen>
   <Text>
       home screen 
   </Text>
   <Button title="go to tweet" onPress={()=>navigation.navigate("Tweet",{id:555,})}/>
    </Screen>
)}

const StackNavigator=()=>(
    <Stack.Navigator initialRouteName="Tweet">
       
        
       
        <Stack.Screen name="Home" component={Home} options={{
          headerTitle: props => <Button title="hello" />,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}/>
        <Stack.Screen name="Tweet" component={Tweet}options={{title:'here istweet'}}/>
        <Stack.Screen name="details" component={details} options={({route})=>({title:route.params.id})}/>
        
    </Stack.Navigator>

)

function Navigation_1(props) {
let isUser=null;
    async function  getuser(){
        try{
             isUser = await AsyncStorage.getItem('user');
             console.log('user updated')
        }catch(e){
    
        }
    }
    const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };
  const [role_storage,setRole_Storage]=useState('');

 // let token_storage ;
 // let user_storage;
  async function get_UserData_Storage(){
      try{
       let  role = await AsyncStorage.getItem('role');
       setRole_Storage(role);
      //   token_storage = await AsyncStorage.getItem('token');
        // user_storage =await AsyncStorage.getItem('user');
      }catch(e){
          console.log('eror reading from storage ');
      }
  }
/*
  useEffect(()=>{
    get_UserData_Storage();
  },);
  */

    
//<AppNavigator />

//dark state management ;
const {darkState}=useContext(ThemeContext);
const theme_toapply_Paper=darkState? (PaperDarkTheme):(PaperDefaultTheme);
const theme_toapply_Navigatoin=darkState?(NavigationDarkTheme):(NavigationDefaultTheme);

    return (
        <PaperProvider theme={theme_toapply_Paper}>
        <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer theme={theme_toapply_Navigatoin}>
            {
              
              user ? (
                  user.user_role.role=="store"?(<AppNavigator />):
                  (user.user_role.role=="customer"?(<Drawer_Navigator_Customer />):(<TabNavigator_Customer/>))
              ) : (<AuthNavigator />)
            }
 
        </NavigationContainer>
        </AuthContext.Provider>
        </PaperProvider>
      
    );
}

export default Navigation_1;