import React, { useRef, createRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  View,
  ImageBackground,
} from "react-native";
import { COLORS } from "../constants/Colors";

const BlankList = (props) => {
  const textInput = useRef(null);
  const [textData, setTextData] = useState("");

  const textDataHandler = (text) => {
    setTextData(text);
  };

  const focusHandler = () => {
    textInput.current.focus();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={120}
    >
      <ScrollView
        style={styles.container}
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        //onTouchStart={focusHandler}
        //onScrollToTop={Keyboard.dismiss()}
      >
        {props.children}
        {/* <TextInput
          ref={textInput}
          multiline={true}
          onChangeText={props.onPress}
          value={textData}
          style={{
            fontSize: 18,
            margin: 15,
          }}
        ></TextInput> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  container2: {
    flex: 1,
  },
});

export default BlankList;
