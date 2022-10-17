import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function Counter() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [count1, setcount1] = useState(600);
  const [count2, setcount2] = useState(120);

  const [isCount, setIsCount] = useState(false);

  const toggle = () => setIsCount(!isCount);

  const start = () => {
    ref1.current = setInterval(() => setcount1((prev) => prev - 1), 1000);
    toggle();
  };

  const pause = () => {
    if (ref1.current) {
      clearInterval(ref1.current);
    }
    ref2.current = setInterval(() => setcount2((prev) => prev - 1), 1000);
  };

  const resume = () => {
    if (ref2.current) {
      clearInterval(ref2.current);
    }
    ref1.current = setInterval(() => setcount1((prev) => prev - 1), 1000);
  };

  const stop = () => {
    // if (ref2.current && ref1.current) {
    clearInterval(ref1.current);
    clearInterval(ref2.current);
    // }
    toggle();
  };

  useEffect(() => {
    if (count1 > 0) return () => clearInterval(ref2.current);
  }, [count1]);
  useEffect(() => {
    if (count2 > 0) return () => clearInterval(ref1.current);
  }, [count2]);

  return (
    <View style={{ flex: 1 }}>
      {!isCount ? (
        <View style={styles1.screenContainer1}>
          <TouchableOpacity
            onPress={() => start()}
            style={{
              fontSize: 30,
              color: "orange",
              border: "2px solid green",
              textAlign: "center",
              margin: 5,
            }}
          >
            <Text style={{ fontSize: 30, color: "gold" }}>
              Start Meditation
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles2.screenContainer2}>
          <View>
            <View>
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
                {`${count1} secs | ${count2} secs`}
              </Text>
            </View>

            <View style={{ margin: "50px", border: "2px solid gold" }}>
              <View style={{ margin: "5px", border: "2px solid gold" }}>
                <Button title="TAKE REST" onPress={() => pause()} />
              </View>

              <View style={{ margin: "5px", border: "2px solid gold" }}>
                <Button title="RESUME MEDITATE" onPress={() => resume()} />
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => stop()}
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
              <Text style={{ color: "white" }}>STOP MEDITATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

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
