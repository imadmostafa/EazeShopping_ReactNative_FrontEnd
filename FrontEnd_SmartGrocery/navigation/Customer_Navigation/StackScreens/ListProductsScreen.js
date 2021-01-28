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
import { Searchbar } from 'react-native-paper';
import useAuth from '../../../auth/useAuth';
import {Text} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';//for navigation lifecycle ,
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from 'react-native-paper';

//to use lifecycle of react native navigation , for fetching and managing products to show ;
 function ListProductsScreen({ navigation }) {
    //token authorize first , in async storage stored ;
    let {user}=useContext(AuthContext);
    let token = user.token;
    console.log('token');
    console.log(token);
    axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
    const [fetchedproducts,setFetchedProducts]=useState([]);
    const[stores,setStores]=useState([]);
   const[selectedstore,setSelectedStore]=useState('Spinneys');
const[mycartitems,setMyCartItems]=useState([]);

    //search bar
    const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

const {logOut}=useAuth();


async function fetchStores(){
  API.getStores().then(res => {
    const result = res.data.stores;
    console.log("RESULT: ", result);
   if(res.data.success==false){
   }else{
    //setCategories(res.data.categories);
   
   setStores(res.data.stores);
   }
}).catch(error => console.log("error",error));
}



    async function fetchProducts_customer_all(){
        try{
            API.getAllProducts_Images_AllStores().then(function (response) {
                const data = response;
                const results = data.data.products;
                const newProducts = {};
              
                setFetchedProducts(results);
                console.log('data fetched', results);
              }).catch(error => console.log("error",error));
        }catch(e){
            
        }
        
    }
   
    function filterstores(){
      const filteredstores=fetchedproducts.filter(product => product.store_name.includes(selectedstore));
      return filteredstores;
    }
    //categories fetch and states 
    const [fetchedcategories,setFetchedCategories]=useState([]);
 function fetchcategories_frombackend(){
  API.getCategories().then(res => {
      const result = res.data.categories;
      console.log("RESULT: ", result);
     if(res.data.success==false){
     }else{
      //setCategories(res.data.categories);
      let tempholder_categories=res.data.categories;
      tempholder_categories.unshift({id:0,name:'All'});//this will add to first of arry and push
      console.log('muttaed categ',tempholder_categories);
     setFetchedCategories(tempholder_categories);
     }
  }).catch(error => console.log("error",error));
 }//end of fetchCategories from backend

    useFocusEffect(
      React.useCallback(() => {
        fetchProducts_customer_all();
        fetchcategories_frombackend();
        fetchStores();
        return () => {
        };
      }, [])
    );
    //  onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)
//on add cart , 
const[totalprice,setTotalPrice]=useState(0);

function addto_mycart(item){
let newtotalprice=totalprice+item.price;
setTotalPrice(newtotalprice);
let altered_cart=mycartitems;
altered_cart.push(item);
setMyCartItems(altered_cart);
console.log('added');
console.log(altered_cart);


}
  return (
   
      <View style={styles.screen}>
        <View style={{
             flexDirection:'row'
        }}>
      <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{
        marginBottom:10,
        flex:1,
        marginRight:10,
        width:'50%'
      }}
    />
    
       <Button icon="cart"style={{
         width:'30%',
        height:'70%',
       
         marginLeft:'auto'
       }}color="purple"
       mode="contained" onPress={() => navigation.navigate('MyCart',
       {mycartitems:mycartitems,
        totalprice:totalprice
      
      }
       )}>
    My Cart
  </Button>
  </View>
    <FlatList
        data={stores}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical:12}}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
        <TouchableOpacity style={{
          marginLeft:20,
          marginRight:20,
          borderRadius:20,
          backgroundColor:'purple',
          padding:10,
          marginBottom:20
          
        }}
          onPress={()=>{
          //alert('category chosen');
          setSelectedStore(item.name);
        }}>
<Text>{item.name}</Text>
        </TouchableOpacity>
        )}
      />
      <FlatList
        data={filterstores().filter(product => product.name.includes(searchQuery))}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card_Paper
            title={item.name}
            item={item}
            subTitle={"$" + item.price}
            image={item.path}
          
            onPress={() => addto_mycart(item)}
          />
        )}
      />
    </View>
  );
}
// onPress={() => navigation.navigate(routes.MYCART, item )}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
   
  },
});

export default ListProductsScreen;
