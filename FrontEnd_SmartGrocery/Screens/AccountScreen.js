import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../Components/lists";
import colors from "../config/colors";
import Icon from "../Components/Icon";
import routes from "../navigation/routes";
import Screen from "../Components/Screen";
import useAuth from '../auth/useAuth';
import { Avatar } from 'react-native-paper';

const menuItems = [
  {
    title: "My Members",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MEMBERS_STORE,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
    const { user, logOut } = useAuth();
  return (
    <Screen style={styles.screen}>
       <Avatar.Image
            source={{
              uri:user.user.image_path,
            }}
            style={{
              marginLeft:20
            }}
            size={150}
          />
      <View style={styles.container}>
        <ListItem
          title={user.user.name}
          subTitle={user.user.email}
         
          onPress={()=>{
           // navigation.openDrawer();//for testing purposes ; success result 
          }}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
