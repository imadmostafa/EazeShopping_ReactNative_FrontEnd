import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  
} from '@react-navigation/drawer';
import { Provider as PaperProvider ,DarkTheme as PaperDarkTheme} from 'react-native-paper';
import {useContext} from 'react';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  DefaultTheme as PaperDefaultTheme,
  
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {ThemeContext} from '../../Contexts_Settings/ThemeContext';
import useAuth from '../../auth/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function DrawerContent(props) {

const {user,logOut} =useAuth();
//for dark state control 
const { darkState, setDarkState } = useContext(ThemeContext);
const {navigation}=props;



const Toggle_Dark_Theme=()=>{
    setDarkState(!darkState);
}




//to navigate between drawer screens , use like a switch to which screen to navigaten now ,
//with context ; to apply ; and 

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
         flex:1
        }}
      >
        <View style={styles.userInfoSection}>
        <Avatar.Image
            source={{
              uri:user.user.image_path,
            }}
            size={100}
          />
          <Title style={styles.title}>{user.user.name}</Title>
          <Caption style={styles.caption}>{user.user.email}</Caption>
          
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {navigation.jumpTo("Map_Drawer")}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="theme-light-dark" color={color} size={size} />
            )}
            label="Preferences"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="logout"
                color={color}
                size={size}
              />
            )}
            label="SignOut"
            onPress={() => logOut()}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {
              Toggle_Dark_Theme();
          }}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={darkState} />
              </View>
            </View>
          </TouchableRipple>
          
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});