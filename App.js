import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Counter from "./Counter";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Counter />
    </View>
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
