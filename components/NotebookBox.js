import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/Colors";

const NotebookBox = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...props.style }}
      onPress={props.onPress}
      activeOpacity={0.6}
      onLongPress={props.onLongPress}
    >
      <Text style={styles.title}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: 170,
    width: 120,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    flex: 1,
    margin: 15,
  },
  title: {
    fontFamily: "mountains-of-christmas-bold",
    color: COLORS.primary.dark,
    fontSize: 21,
    textAlign: "center",
  },
});

export default NotebookBox;
