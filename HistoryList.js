import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, FlatList } from "react-native";
import HistoryContext from "./HistoryContext";

export default function HistoryList() {
  const ctx = useContext(HistoryContext);
  const history = ctx.history;
  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("TASKS");
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  return (
    <View>
      {history.map((h, i) => (
        <Text key={i}>{h.year}</Text>
      ))}
    </View>
  );
}
