import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from "react-native";

import { COLORS } from "../constants/Colors";
import Title from "./Title";

const PopUpModal = (props) => {
  const textInput = useRef(null);

  const focusHandler = () => {
    textInput.current.focus();
  };
  return (
    <Modal visible={props.isVisible} animationType="slide" transparent={true}>
      <View style={styles.modal}>
        <View style={styles.btnContainer}>
          <Pressable style={styles.modalBtn} onPress={props.onSave}>
            <Text style={styles.modalBtnTitle}>SAVE</Text>
          </Pressable>
          <Pressable style={styles.modalBtn} onPress={props.onCancel}>
            <Text style={styles.modalBtnTitle}>CANCEL</Text>
          </Pressable>
        </View>
        <View style={styles.modalHeader}>
          <Title>{props.modalTitle}</Title>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView
            keyboardDismissMode={
              Platform.OS === "ios" ? "interactive" : "on-drag"
            }
            onTouchStart={focusHandler}
          >
            <TextInput
              ref={textInput}
              style={{ ...styles.modalInput, ...props.style }}
              onChangeText={props.inputChangeHandler}
              value={props.inputValue}
              editable
              multiline
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalHeader: {
    height: 50,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  modalInput: {
    height: 40,
    margin: 12,
    marginBottom: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.primary.dark,
    padding: 10,
    fontSize: 16,
    fontFamily: "montserrat-regular",
    fontStyle: "normal",
    letterSpacing: 0.41,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "7%",
    marginVertical: 20,
  },
  modalBtn: {
    height: 32,
    width: 80,
    backgroundColor: COLORS.primary.dark,
    borderRadius: 13,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
  },
  modalBtnTitle: {
    color: "white",
    alignSelf: "center",
    fontFamily: "montserrat-regular",
  },
});

export default PopUpModal;
