import React from "react";
import { View, Image, StyleSheet ,Button} from "react-native";

import colors from "../config/colors";
import ListItem from "../Components/lists/ListItem";
import Text from "../Components/Text";
import AppButton from '../Components/AppButton';
import API from '../API_ReactNative/API';




function ListingDetailsScreen({ route ,navigation}) {
  const listing = route.params;



 async function deleteproduct(id) {

    API.deleteproduct(id).then(res => {
      const result = res.data;
      console.log("RESULT: ", result);
      if (res.data.success == false) {
        alert('failed delete');
      } else {//else if fetch successfully done ,
        
       
       
      }
    }).catch(error => console.log("error", error));

  }//end of deleteproduct by id




  return (
    <View>
      <Image style={styles.image} source={{uri:listing.path}} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.name}</Text>
        <Text style={styles.price}>${listing.price}</Text>
        <Text style={styles.description}>Description: {listing.description}</Text>
        <View style={styles.userContainer}>
          
          <AppButton title="Delete" onPress={()=>{
            deleteproduct(listing.id);
            console.log('success');
            navigation.navigate("Listings");
          }}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  description:{
   color:colors.medium
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
