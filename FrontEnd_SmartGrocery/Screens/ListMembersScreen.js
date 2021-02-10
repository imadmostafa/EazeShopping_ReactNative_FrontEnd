import * as React from 'react';
import { DataTable } from 'react-native-paper';
import API from '../API_ReactNative/API';
import { useFocusEffect } from '@react-navigation/native';//for navigation lifecycle ,
import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import Icon from '../Components/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';

import { ProgressBar, Colors } from 'react-native-paper';

import { Searchbar } from 'react-native-paper';
const ListMembersScreen = ({ route, navigation }) => {
  //snackbar
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  //search bar
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [members, setMembers] = useState(null);
  //add search bar and remove pagination , plus scrollable view ;

  //delete Member from Backend
  function deleteMember(id) {
    console.log("id to delete is ", id);
    API.deletemember(id).then(res => {
      const result = res.data.success;
      console.log("RESULT:from home ", result);
      if (res.data.success != false) {
        //filter 
        const formattedlist = members.filter(member => member.id !== id);
        setMembers(formattedlist);
        console.log('filtered');
        onToggleSnackBar();
      }
      //
    }).catch(error => console.log(error));
  }//end of delete members by id

  //fetch members from backend 
  const fetchMembers = () => {
    API.getAllMembers().then(res => {
      const result = res.data.members;
      console.log("RESULT: ", result);
      if (res.data.success == false) {
      } else {
        setMembers(res.data.members);
      }
    }).catch(error => console.log("error", error));
  }//end of fetch members


  //useFocusEffect
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      fetchMembers();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );



  return (
    <ScrollView>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <DataTable>
        <DataTable.Header>

          <DataTable.Title  >Name</DataTable.Title>

          <DataTable.Title >Role</DataTable.Title>
        </DataTable.Header>
        {
          members ? (members.filter(member_filter => member_filter.name.includes(searchQuery)).map(member => (
            <DataTable.Row key={member.id}>

              <DataTable.Cell>{member.name} </DataTable.Cell>

              <DataTable.Cell>{member.role} </DataTable.Cell>
              <TouchableOpacity onPress={() => {
                let idtodelete = member.id;
                deleteMember(idtodelete);
              }}>
                <Icon name="delete" />
              </TouchableOpacity>
            </DataTable.Row>
          ))) : (<View><ProgressBar progress={0.5} color={Colors.red800} />
            <Text >loading...</Text></View>)

        }



      </DataTable>
      <Snackbar
        style={{
          marginBottom: 'auto'
        }}
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={1000}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}>
        <Text style={{
          color: 'red'
        }}>Deleted Successfully.</Text>
      </Snackbar>
    </ScrollView>
  );
}
export default ListMembersScreen;