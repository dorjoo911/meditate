import React, { useState, useEffect, useRef } from "react";
import { AsyncStorage } from "react-native";

const HistoryContext = React.createContext();

let date = new Date();
let second = date.getSeconds();
let minute = date.getMinutes();
let hour = date.getHours();
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();

// const initialState = {
//   history: [
// {
//   year: year,
//   month: month,
//   day: day,
//   hour: hour,
//   minute: minute,
//   second: second,
// },
//   ],
//   count: 0,
//   start: false,
//   pause: false,
//   MEDITATING_TIME: 10,
//   RESTING_TIME: 5,
//   STATUS: {
//     NONE: "none",
//     MEDITATING: "meditating",
//     RESTING: "resting",
//     COMPLETE: "completed",
//   },
// };
const MEDITATING_TIME = 10;
const RESTING_TIME = 5;
const STATUS = {
  NONE: "none",
  MEDITATING: "meditating",
  RESTING: "resting",
  COMPLETE: "completed",
};
export const HistoryStore = (props) => {
  const [list, setlist] = useState(true);
  const [count, setCount] = useState(MEDITATING_TIME);
  const [isstart, setisStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [history, setHistory] = useState({
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
    second: "",
  });
  useEffect(() => {
    return () => setHistory(history);
  }, [history]);
  const intervalRef = useRef(null);
  const appRef = useRef({
    status: STATUS.NONE,
    meditating: MEDITATING_TIME,
    rest: RESTING_TIME,
  });

  const reset = () => {
    appRef = {
      status: STATUS.NONE,
      meditating: MEDITATING_TIME,
      rest: RESTING_TIME,
    };
    setCount(MEDITATING_TIME);
    setisStart(false);
    setPause(false);
  };

  const counting = () => {
    if (appRef.current.status === STATUS.NONE) {
      appRef.current.status = STATUS.MEDITATING;
      appRef.current.meditating = MEDITATING_TIME;
    }

    if (appRef.current.status === STATUS.MEDITATING) {
      if (appRef.current.meditating === 0) {
        appRef.current.status === STATUS.RESTING;
        appRef.current.rest = RESTING_TIME;
      } else {
        appRef.current.meditating--;
        setCount(appRef.current.meditating);
      }
    }

    if (appRef.current.status === STATUS.RESTING) {
      if (appRef.current.rest === 0) {
        appRef.current.status = STATUS.COMPLETE;
      } else {
        appRef.current.rest--;
        setCount(appRef.current.rest);
      }
    }

    if (appRef.current.status === STATUS.COMPLETE) {
      clearInterval(intervalRef.current);
      reset();
    }
  };

  const startCounter = () => {
    intervalRef.current = setInterval(counting, 1000);
    setisStart(!isstart);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const stop = () => {
    setisStart(!isstart);
    clearInterval(intervalRef.current);
    reset();
  };

  const action = () => {
    if (pause) {
      intervalRef.current = setInterval(counting, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    setPause(!pause);
  };

  const toggle = () => {
    return setlist(!list);
  };

  const done = () => {
    reset();
    setHistory({
      year,
      month,
      day,
      hour,
      minute,
      second,
    });
    // _storeData = async () => {
    //   await AsyncStorage.setItem("@MySuperStore:key", history);
    // };
  };
  return (
    <HistoryContext.Provider
      value={{
        count,
        history,
        isstart,
        pause,
        list,
        startCounter,
        action,
        stop,
        toggle,
        done,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
