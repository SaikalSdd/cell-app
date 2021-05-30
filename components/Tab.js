import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import * as addNoteActions from "../store/addNote-action";

import { COLORS } from "../constants/Colors";

const Tab = (props) => {
  const dispatch = useDispatch();

  const [
    permission,
    askPermission,
  ] = Permissions.usePermissions(Permissions.CAMERA, { ask: true });

  const verifyPermissions = async () => {
    const result = await askPermission();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to take a picture.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async (notebookId, cornellId) => {
    if (!permission || permission.status !== "granted") {
      verifyPermissions();
    }

    const image = await ImagePicker.launchCameraAsync();

    dispatch(addNoteActions.addImage(image.uri, notebookId, cornellId));
  };

  const deleteCornell = (id) => {
    dispatch(addNoteActions.removeCornellData(id));
    dispatch(addNoteActions.removeCornell(id));
  };

  const saveCornellChanges = (title, kql, summary, cornellId) => {
    dispatch(addNoteActions.updateCornellNote(title, kql, summary, cornellId));
  };

  return (
    <View style={styles.tabContainer}>
      <IconButton
        icon="camera"
        color={COLORS.primary.dark}
        onPress={() =>
          takeImageHandler(props.selectedNotebookId, props.currentCornellId)
        }
      />
      <IconButton
        icon="format-text"
        color={COLORS.primary.dark}
        onPress={props.addText}
      />
      <IconButton
        icon="plus"
        color={COLORS.primary.dark}
        onPress={props.addCornell}
      />
      <IconButton
        icon="delete"
        color={COLORS.primary.dark}
        onPress={() => deleteCornell(props.currentCornellId)}
      />
      <IconButton
        icon="content-save"
        color={COLORS.primary.dark}
        onPress={() => {
          saveCornellChanges(
            props.cornellTitle,
            props.kql,
            props.summary,
            parseInt(props.currentCornellId)
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30,
    height: "10%",
    alignItems: "center",
  },
});

export default Tab;
