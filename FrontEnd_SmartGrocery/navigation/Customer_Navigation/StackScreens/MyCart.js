import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import API from '../../../API_ReactNative/API';
import Card_Paper from "./Card_Paper";
import colors from "../../../config/colors";
import routes from "../../../navigation/routes";
import Screen from "../../../Components/Screen";
import {useState,useEffect} from 'react';
import AuthContext from '../../../auth/context';
import axios from 'axios';
import {useContext} from 'react';
import { Button, Searchbar } from 'react-native-paper';
import useAuth from '../../../auth/useAuth';
import AppButton from '../../../Components/AppButton';
import { useFocusEffect } from '@react-navigation/native';//for navigation lifecycle ,
import Card_Paper_MyCart from './Card_Paper_MyCart';
import useLocation from "../../../Custom_Hooks/useLocation";
import {  Snackbar } from 'react-native-paper';

//to use lifecycle of react native navigation , for fetching and managing products to show ;
 function MyCart({ navigation ,route}) {
    //token authorize first , in async storage stored ;
    let {user}=useContext(AuthContext);
    const {mycartitems,totalprice}=route.params;
    console.log('now my cart');
    console.log((mycartitems));
    let location = useLocation();
        //const mycartitems=routes.mycartitems;
    let token = user.token;
   const [mycart_items,setMyCart_Items]=useState([]);
    axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
    const [fetchedproducts,setFetchedProducts]=useState([]);


//snackbar
 const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

    //search bar
    const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

    async function fetchProducts_customer_all(){
        try{
            API.getAllProductsWithImages_Customer().then(function (response) {
                const data = response;
                const results = data.data.products;
                const newProducts = {};
              
                setFetchedProducts(results);
                console.log('data fetched', results);
              }).catch(error => console.log("error",error));
        }catch(e){
            
        }
        
    }


    async function submit_order(){
      //all same store_id
      let sample_data=mycart_items[0];
      const data_tosend={
        store_id:sample_data.store_id,
        amount:totalpricefinal,
        latitude:location.latitude,
        longitude:location.longitude

      }
      try{
          API.addOrder(data_tosend).then(function (response) {
              const data = response;
              const results = data.data.order;
              console.log('data fetched', results);
              onToggleSnackBar();
            }).catch(error => console.log("error",error));
      }catch(e){
          
      }
      
  }


    const[totalpricefinal,setTotalPriceFinal]=useState(0);
    useFocusEffect(
      React.useCallback(() => {
        fetchProducts_customer_all();
        setMyCart_Items(mycartitems);
        setTotalPriceFinal(totalprice);
        console.log('total price final is ');
        console.log(totalpricefinal);
        return () => {
        };
      }, [])
    );
    
  return (
   
      <View style={styles.screen}>
      <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{
        marginBottom:20,
        
        
      }}
    />
    
      <FlatList
        data={mycart_items.filter(product => product.name.includes(searchQuery))}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical:12}}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card_Paper_MyCart
            title={item.name}
            item={item}
            subTitle={"$" + item.price}
            image={item.path}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
      <AppButton title="Order Now" onPress={()=>{
       console.log('pressed');
       submit_order();
      }}
      style={{
        margin:20
      }}
      
      />

<Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{
          color:'dodgerblue',
          backgroundColor:'dodgerblue'
        }}
        action={{
          label: 'Done',
          onPress: () => {
            navigation.navigate('Products_Customer');
          },
        }}>

        Order Sent You will Be Contacted Soon !
      </Snackbar>




    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
   
  },
});

export default MyCart;
