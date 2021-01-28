import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../Components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../Components/lists";

const initialMessages = [
  {
    id: 1,
    title: "Spinney",
    description: "food ",
    image: require("../../assets/onlineshoppginwallpaper1.jpg"),
  },
  {
    id: 2,
    title: "stores 2",
    description:
      "buy?",
    image: require("../../assets/onlineshoppginwallpaper1.jpg"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
                id: 1,
                title: "Spinney",
                description: "food ",
                image: require("../../assets/onlineshoppginwallpaper1.jpg"),
              },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
