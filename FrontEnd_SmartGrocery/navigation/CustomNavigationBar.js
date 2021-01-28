

import * as React from 'react';
import { Appbar } from 'react-native-paper';

import { Button, Menu, Divider, Provider } from 'react-native-paper';
import useAuth from "../auth/useAuth";




function CustomNavigationBar({ navigation, previous }) {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const _handleSearch = () => console.log('Searching');
    const {user} = useAuth();
    //  <Appbar.Action icon="magnify" onPress={_handleSearch} />
    return (
      <Appbar.Header>
        {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title={user.user.name} />
      
        
        {!previous ? (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={

              <Appbar.Action icon="menu" color="white" onPress={openMenu} />
            }>
            <Menu.Item onPress={() => {console.log('Option 1 was pressed')
        
        }} title="Option 1" />
            <Menu.Item onPress={() => {navigation.navigate("ListingEdit")}} title="Option 2" />
            <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Option 3" disabled />
          </Menu>
        ) : null}
      </Appbar.Header>
    );
  }
  export default CustomNavigationBar;