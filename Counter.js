import React, { useState, useRef, useEffect } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Counter() {
  const [count1, setcount1] = useState(600);
  const [count2, setcount2] = useState(120);

  const [isCount, setIsCount] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const toggle = () => {
    setIsCount(!isCount);
  };

  const start = () => {
    if (!ref1.current) {
      ref1.current = setInterval(() => setcount1((prev) => prev - 1), 1000);
    }
    toggle();
  };

  const pause = () => {
    if (!ref2.current) {
      ref2.current = setInterval(() => setcount2((prev) => prev - 1), 1000);
    }
    setcount1(ref1.current);
  };

  const resume = () => {
    ref1.current = setInterval(() => setcount1((prev) => prev - 1), 1000);
    setcount2(ref2.current);
  };

  const stop = () => {
    clearInterval(ref1.current);
    clearInterval(ref2.current);
    toggle();
  };

  useEffect(() => {
    return () => clearInterval(ref2.current);
  }, []);
  useEffect(() => {
    return () => clearInterval(ref1.current);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!isCount ? (
        <View style={styles1.screenContainer1}>
          <TouchableOpacity
            onPress={start}
            style={{
              fontSize: 30,
              color: "orange",
              border: "2px solid green",
              textAlign: "center",
              margin: 5,
            }}
          >
            Start Meditation
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

            <View style={{ margin: "50px" }}>
              <View>
                <Button title="Pause" onPress={pause} />
              </View>
              <br />
              <View>
                <Button title="Resume" onPress={resume} />
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={stop}
              style={{
                margin: 50,
                color: "gold",
                fontSize: 50,
                backgroundColor: "red",
                textAlign: "center",
              }}
            >
              STOP
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
