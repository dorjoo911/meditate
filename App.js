import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Counter from "./Counter";
import MeditateControls from "./MeditateControls";
import { HistoryStore } from "./HistoryContext";
import HistoryList from "./HistoryList";
import HistoryContext from "./HistoryContext";
import { useContext } from "react";

export default function App(props) {
  const ctx = useContext(HistoryContext);
  return (
    <HistoryStore>
      <View style={{ flex: 1 }}>
        {ctx.list ? <MeditateControls toggle={ctx.toggle} /> : <HistoryList />}
      </View>
    </HistoryStore>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
