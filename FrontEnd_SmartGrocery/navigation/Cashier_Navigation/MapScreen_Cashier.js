import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { useEffect, useState } from 'react';
import * as Locatoin from 'expo-location';
import useLocation from '../../Custom_Hooks/useLocation';
import MapViewDirections from 'react-native-maps-directions';
import { useFocusEffect } from '@react-navigation/native';//for navigation lifecycle ,
import API from '../../API_ReactNative/API';
import axios from 'axios';
export default function MapScreen_Cashier({ route, navigation }) {
  let location = useLocation();
  location = useLocation();//location of the cashier ;
  
  const { order } = route.params;
 // console.log('ordeer is ');
  //console.log(order);
  const [region, setRegion] = useState({});
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    setRegion(location);
    console.log('now printing location of user');
    console.log(location);
  }



  //expo notifications
  async function sendnotification() {
    const datato_send = {
      to: order.expo_notifications,
      title: "From Cashier",
      body: "Delivery in",
      priority: "high",
      sound: "default",
      channelId: "default",
    }
    const headerstosend = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'accept-encoding': 'gzip, deflate',
        host: 'exp.host',

      }
    }
    axios.post("https://exp.host/--/api/v2/push/send", datato_send, headerstosend).then(res => {

    }).catch(error => console.log("error", error));
  }


  useFocusEffect(
    React.useCallback(() => {

      sendnotification();//notify customer that order is being processed
      return () => {
      
      };
    }, [])
  );


  const destination = { latitude: order.latitude, longitude: order.longitude };
  //  const destination = {latitude: 33.8708, longitude: 35.8632};
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };//Far location to test mapview
  // const destination = {latitude: 37.771707, longitude: -122.4053769};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyAHvM6SP8gLgddC5nzftce6gd35N_2zQFw';

  try {
    let mapRegion = {
      latitude: (location.latitude + parseFloat(order.latitude)) / 2,
      longitude: (location.longitude + parseFloat(order.longitude)) / 2,
      latitudeDelta: Math.abs(location.latitude - parseFloat(order.latitude)) * 2,
      longitudeDelta: Math.abs(location.longitude - parseFloat(order.longitude)) * 2
    }
    console.log(mapRegion);
  } catch (e) {

  }

  return (
    <View style={styles.container}>
      <Text></Text>
      {
        location != undefined ? (<MapView

          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} style={styles.map} >
          <Marker
            coordinate={{
              latitude: parseFloat(order.latitude),
              longitude: parseFloat(order.longitude)
            }}
          ></Marker>
          <Marker
            coordinate={{
              latitude: location.latitude
              , longitude: location.longitude
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}

          >
            <Image
              source={require('../../../assets/car.png')}
              style={{
                width: 30,
                height: 30
              }}
            />
          </Marker>
          <MapViewDirections
            origin={location}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor="hotpink"
            mode="DRIVING"
            onReady={(result) => {
              console.log('duration now printed');
              console.log(result.duration);
              setDuration(result.duration);
              //alert(result.duration);
            }}



          />


        </MapView>) : (<View></View>)
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