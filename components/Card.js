import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/Colors";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: COLORS.primary.main,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    flexDirection: "column",
  },
});

export default Card;
