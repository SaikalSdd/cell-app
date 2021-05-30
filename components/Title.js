import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";

const Title = (props) => {
  return (
    <View>
      <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-bold",
    fontStyle: "normal",
    letterSpacing: 0.41,
    marginLeft: 24,
    color: COLORS.primary.dark,
  },
});

export default Title;
