import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
//import {Permissions,Location} from 'expo';
import {useEffect,useState} from 'react';
import * as Locatoin from 'expo-location';
import useLocation from '../../../Custom_Hooks/useLocation';
import MapViewDirections from 'react-native-maps-directions';


export default function MapView_Customer({route,navigation}) {
let location = useLocation();
location=useLocation();

const[region,setRegion]=useState({});


useEffect(()=>{
getLocationAsync();
},[]);




   const  getLocationAsync=async()=>{
        setRegion(location);
        console.log('now printing location of user');
        console.log(location);
    }


   // const origin = {latitude: 37.3318456, longitude: -122.0296002};
    const destination = {latitude: 33.8708, longitude: 35.8632};
    const origin = {latitude: 37.3318456, longitude: -122.0296002};
   // const destination = {latitude: 37.771707, longitude: -122.4053769};
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAHvM6SP8gLgddC5nzftce6gd35N_2zQFw';
//googel api from eazeshopping ;AIzaSyAHvM6SP8gLgddC5nzftce6gd35N_2zQFw
    

  return (
    <View style={styles.container}>
        { 
            location!=undefined?( <MapView
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }} style={styles.map} >
<MapViewDirections
 origin={location}
 destination={destination}
 apikey={GOOGLE_MAPS_APIKEY}
 strokeColor="hotpink"
 mode="DRIVING"
 onReady={(result)=>{
     console.log(result.duration);
     //alert(result.duration);
 }}
 

 
 />


                </MapView>):(<View></View>)
        }
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});