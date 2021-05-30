import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";

const Date = (props) => {
  return (
    <View>
      <Text
        style={styles.title}
      >{`${props.day} ${props.month}, ${props.year}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-bold",
    fontStyle: "normal",
    marginVertical: 20,
    fontSize: 10,
    color: COLORS.primary.dark,
  },
});

export default Date;
