import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import HistoryContext from "./HistoryContext";

import logo from "./assets/favicon.png";

const MeditateControls = (props) => {
  const ctx = useContext(HistoryContext);
  // console.log(ctx.data.history[0]);
  return (
    <View style={{ flex: 1 }}>
      {!ctx.isstart ? (
        <View style={styles1.screenContainer1}>
          <Image style={styles.tinyLogo} source={logo} />
          <TouchableOpacity
            onPress={ctx.startCounter}
            style={{
              fontSize: 30,
              color: "orange",
              border: "2px solid green",
              textAlign: "center",
              margin: 5,
            }}
          >
            <Text style={{ fontSize: 30, color: "gold" }}>START</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles2.screenContainer2}>
          <Text
            style={{
              color: "white",
              fontSize: 45,
              textAlign: "center",
              backgroundColor: "orange",
              border: "1px solid white",
              margin: 5,
            }}
          >
            {ctx.count}
          </Text>
          <View style={{ margin: "5px", border: "2px solid gold" }}>
            <TouchableOpacity onPress={ctx.action}>
              <Text
                style={{
                  margin: "5px",
                  border: "2px solid gold",
                  color: "white",
                  textAlign: "center",
                  fontSize: 50,
                }}
              >
                {ctx.pause ? "Resume" : "Pause"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={ctx.stop}
            style={{
              margin: 50,
              color: "gold",
              fontSize: 50,
              backgroundColor: "red",
              textAlign: "center",
              border: "2px solid gold",
              padding: 10,
            }}
          >
            <Text style={{ color: "white" }}>STOP</Text>
          </TouchableOpacity>
          <Button title="View History" onPress={ctx.toggle} />
        </View>
      )}
    </View>
  );
};

export default MeditateControls;

const styles1 = StyleSheet.create({
  screenContainer1: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignContent: "center",
    border: "3px solid gold",
  },
});

const styles2 = StyleSheet.create({
  screenContainer2: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignContent: "center",
    border: "3px solid gold",
  },
});
