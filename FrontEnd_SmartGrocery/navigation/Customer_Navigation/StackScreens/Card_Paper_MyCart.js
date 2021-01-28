import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="shopping" />

const Card_Paper_MyCart = ({item,onPress}) =>{



    return(
  <Card style={{
      margin:10,
      width:200
      }} >
    <Card.Title title={item.store_name} subtitle={item.description} left={LeftContent} />
    <Card.Content>
      <Title>{item.name} </Title>
      <Paragraph>{item.price} $</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: item.path }} style={{
        width:'100%'
    }}/>
    <Card.Actions>
      
    </Card.Actions>
  </Card>
);
 }
export default Card_Paper_MyCart;