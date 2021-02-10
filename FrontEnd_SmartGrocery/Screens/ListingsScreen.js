import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import API from '../API_ReactNative/API';
import Card from "../Components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../Components/Screen";
import { useState, useEffect } from 'react';
import AuthContext from '../auth/context';
import axios from 'axios';
import { useContext } from 'react';
import { Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';//for navigation lifecycle ,

//to use lifecycle of react native navigation , for fetching and managing products to show ;
function ListingsScreen({ navigation }) {
  //token authorize first , in async storage stored ;
  let { user } = useContext(AuthContext);
  let token = user.token;
  console.log('token');
  console.log(token);
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  const [fetchedproducts, setFetchedProducts] = useState([]);

  //search bar
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);


  async function fetchProducts() {
    try {
      API.getAllProductsWithImages().then(function (response) {
        const data = response;
        const results = data.data.products;
        const newProducts = {};

        setFetchedProducts(results);
        console.log('data fetched', results);
      }).catch(error => console.log("error", error));
    } catch (e) {

    }

  }


  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      fetchProducts();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <Screen style={styles.screen}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          marginBottom: 20
        }}
      />
      <FlatList
        data={fetchedproducts.filter(product => product.name.includes(searchQuery))}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            subTitle={"$" + item.price}
            image={item.path}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
