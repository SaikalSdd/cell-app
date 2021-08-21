import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Modal,
  Text,
  TouchableHighlight,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";

import * as addNoteActions from "../store/actions/addNote-action";

import { COLORS } from "../constants/Colors";

const Tab = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const [permission, askPermission] = Permissions.usePermissions(
    Permissions.CAMERA,
    { ask: true }
  );

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
    setModalVisible(!modalVisible);

    dispatch(addNoteActions.addImage(image.uri, notebookId, cornellId));
  };

  const pickImage = async (notebookId, cornellId) => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    setModalVisible(!modalVisible);

    dispatch(addNoteActions.addImage(image.uri, notebookId, cornellId));

    /*  if (!result.cancelled) {
      alert(result.uri);
    } */
  };

  const deleteCornell = (id) => {
    Alert.alert("Are you sure?", "You will not be able to recover this page!", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteCornellConfirm(id),
        style: "destructive",
      },
    ]);
  };

  const deleteCornellConfirm = (id) => {
    dispatch(addNoteActions.removeCornellData(id));
    dispatch(addNoteActions.removeCornell(id));
  };

  const saveCornellChanges = (title, kql, summary, cornellId) => {
    dispatch(addNoteActions.updateCornellNote(title, kql, summary, cornellId));
    Alert.alert("Changes are saved");
  };

  return (
    <View style={styles.tabContainer}>
      <IconButton
        icon="camera"
        color={COLORS.primary.dark}
        onPress={() => setModalVisible(true)}
      />
      <IconButton
        icon="format-text"
        color={COLORS.primary.dark}
        onPress={() =>
          navigation.navigate("AddText", {
            cornellId: props.currentCornellId,
            notebookId: props.selectedNotebookId,
          })
        }
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={() => {
                takeImageHandler(
                  props.selectedNotebookId,
                  props.currentCornellId
                );
              }}
            >
              <Text style={styles.textStyle}>Take Photo</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={() => {
                pickImage(props.selectedNotebookId, props.currentCornellId);
              }}
            >
              <Text style={styles.textStyle}>Choose From Library</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    position: "relative",
  },
  modalView: {
    bottom: 0,
    backgroundColor: COLORS.primary.dark,
    width: "100%",
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "100%",
    marginBottom: 10,
  },
  textStyle: {
    color: COLORS.primary.dark,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Tab;
