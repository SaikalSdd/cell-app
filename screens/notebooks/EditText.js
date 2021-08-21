import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { COLORS } from "../../constants/Colors";
import * as addNoteActions from "../../store/actions/addNote-action";

const EditText = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { id, text } = route.params;

  const [newText, setNewText] = useState(text);
  const textHandler = (e) => {
    setNewText(e);
  };

  const saveTextData = (id, text) => {
    if (text !== "") {
      dispatch(addNoteActions.updateTextData(id, text));
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          color="#fff"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Edit Text</Text>
        <Text
          onPress={() => saveTextData(id, newText)}
          style={styles.headerTitle}
        >
          Save
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.container}
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
        >
          <TextInput
            placeholder="Type..."
            multiline
            style={styles.textInput}
            value={newText}
            onChangeText={textHandler}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.primary.light,
  },
  container: {
    padding: 20,
  },

  header: {
    backgroundColor: COLORS.primary.light,
    height: "10%",
    width: "100%",
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    paddingTop: 20,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    margin: "auto",
    marginHorizontal: "auto",
  },

  textInput: {
    fontSize: 18,
    backgroundColor: "#F8F8F8",
  },
});

export default EditText;
