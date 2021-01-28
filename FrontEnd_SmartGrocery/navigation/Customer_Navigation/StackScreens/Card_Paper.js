import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="shopping" />

const Card_Paper = ({item,onPress}) =>{



    return(
  <Card style={{margin:10}}>
    <Card.Title title={item.store_name} subtitle={item.description} left={LeftContent} />
    <Card.Content>
      <Title>{item.name} </Title>
      <Paragraph>{item.price} $</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: item.path }} />
    <Card.Actions>
      <Button>Details</Button>
      <Button onPress={onPress}>Add to Cart</Button>
    </Card.Actions>
  </Card>
);
 }
export default Card_Paper;