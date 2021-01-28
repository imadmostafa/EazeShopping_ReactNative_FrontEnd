import * as React from 'react';
import { DataTable } from 'react-native-paper';
import API from '../../API_ReactNative/API';
import { useFocusEffect } from '@react-navigation/native';//for navigation lifecycle ,
import {useState,useEffect} from 'react';
import { View ,Text,Button,ScrollView} from 'react-native';
import Icon from '../../Components/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {  Snackbar } from 'react-native-paper';
import AuthContext from '../../auth/context';
import axios from 'axios';
import {useContext} from 'react';
import { ProgressBar, Colors } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

import { Searchbar } from 'react-native-paper';
const AllOrdersScreen_Cashier = ({route,navigation}) => {
    //snackbar
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    //search bar
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [members, setMembers] = useState(null);
//add search bar and remove pagination , plus scrollable view ;


let {user}=useContext(AuthContext);
let token = user.token;

axios.defaults.headers.common['Authorization'] =  'Bearer '+token;


//delete Member from Backend
function takeorder(id){
    console.log("id to delete is ",id);
  API.setCashier_Order(id).then(res => {
      const result = res.data.success;
      console.log("RESULT:from home ", result);
     if(res.data.success!=false){
         //filter 
         const formattedlist=members.filter(member => member.id !== id);
         setMembers(formattedlist);
         console.log('filtered');
         onToggleSnackBar();
     }
      //
  }).catch(error => console.log(error));
}//end of takeorder

//fetch members from backend 
    const fetchOrders = () => {
        API.getAllOrders_Cashier().then(res => {
            const result = res.data.orders;
            console.log("RESULT: ", result);
           if(res.data.success==false){
           }else{
            setMembers(res.data.orders);
           }
        }).catch(error => console.log("error",error));
          }//end of fetch members


          //useFocusEffect
          useFocusEffect(
            React.useCallback(() => {
              // Do something when the screen is focused
              fetchOrders();
              return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
              };
            }, [])
          );

const[chosenorder,setChosenOrder]=useState(null);

    return(
        <ScrollView>
             <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  <DataTable>
    <DataTable.Header>
     
      <DataTable.Title  >Photo</DataTable.Title>
      <DataTable.Title  >Customer Name</DataTable.Title>
      <DataTable.Title >Amount</DataTable.Title>
    </DataTable.Header>
{
    members?(members.filter(member_filter => member_filter.customer_name.includes(searchQuery)).map(member=>(
        <DataTable.Row key={member.id}>
            <DataTable.Cell>
       <Avatar.Image
            source={{
              uri:member.image_path
            }}
            size={30}
          />
          </DataTable.Cell>
          <DataTable.Cell>{member.customer_name} </DataTable.Cell>
         
          <DataTable.Cell>{member.amount} $</DataTable.Cell>
          <TouchableOpacity onPress={()=>{
              let idtodelete=member.id;
              takeorder(idtodelete);
              setChosenOrder(member);
          }}>
          <Icon name="truck-delivery" />
          </TouchableOpacity>
        </DataTable.Row>
    ))):(<View><ProgressBar progress={0.5} color={Colors.red800} />
      <Text >loading...</Text></View>)
   
}



  </DataTable>
  <Snackbar
  style={{
      marginTop:10,
      
  }}
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={8000}
        action={{
          label: 'Deal',
          onPress: () => {
            navigation.navigate("Maps",{
                order:chosenorder
            });
          },
        }}>
       <Text style={{
           color:'red'
       }}> The Order is Yours to Deliver Now !</Text> 
      </Snackbar>
  </ScrollView>
);
    }
export default AllOrdersScreen_Cashier;