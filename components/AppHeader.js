import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { COLORS } from "../constants/Colors";

const AppHeader = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <IconButton
        icon="arrow-left"
        color={COLORS.primary.dark}
        size={25}
        onPress={props.onPress}
      />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default AppHeader;
