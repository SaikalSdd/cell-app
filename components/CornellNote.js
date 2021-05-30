import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Platform,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Lightbox from "react-native-lightbox";
import Title from "./Title";
import Tab from "../components/Tab";
import PopUpModal from "../components/PopUpModal";

import * as addNoteActions from "../store/addNote-action";

const CornellNote = (props) => {
  //INITIALIZATIONS
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNoteActions.loadCornellNote());
  }, [dispatch]);

  useEffect(() => {
    dispatch(addNoteActions.loadData());
  }, [dispatch]);

  const cornellId = props.cornellId;
  const notebookId = props.notebookId;

  const selectedCornellNote = useSelector(
    (state) => state.noteBooks.cornellNotes
  ).filter((dt) => dt.id === cornellId);

  const selectedNoteData = useSelector(
    (state) => state.noteBooks.noteData
  ).filter((dt) => dt.cornellId === cornellId);

  useEffect(() => {
    setCorTitle(selectedCornellNote[0].title);
    setKql(selectedCornellNote[0].kql);
    setNoteSummary(selectedCornellNote[0].summary);
  }, selectedCornellNote);

  //TAB =========================================

  const addCornell = (id) => {
    dispatch(addNoteActions.addCornell(id));
  };
  const addTextHandler = () => {
    dispatch(addNoteActions.isVisible());
  };

  //MODAL=========================================
  const isModalVisible = useSelector((state) => state.noteBooks.isModalVisible);
  const [text, setText] = useState("");

  const saveTextData = (cornellId) => {
    if (text !== "") {
      alert(cornellId);
      dispatch(addNoteActions.addText(text, notebookId, cornellId));
    }
    setText("");
    dispatch(addNoteActions.isVisible());
  };

  //DELETE ITEM------------------------------------------------
  const onImageDelete = (id) => {
    dispatch(addNoteActions.removeData(id));
  };
  const onTextDelete = (id) => {
    dispatch(addNoteActions.removeData(id));
  };

  const deleteImageHandler = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this item", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Delete", onPress: () => onImageDelete(id), style: "red" },
    ]);
  };
  const deleteTextHandler = (id, text) => {
    Alert.alert("Delete or Edit", "Select what you want to do with this item", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Delete", onPress: () => onTextDelete(id), style: "red" },
      { text: "Edit", onPress: () => textDataEdit(id, text) },
    ]);
  };

  //CORNELL TITLE
  const [corTitle, setCorTitle] = useState(selectedCornellNote[0].title);

  const corTitleChangeHandler = (title) => {
    setCorTitle(title);
  };

  //KQL ==============================================
  const textInput = useRef(null);
  const [kql, setKql] = useState(selectedCornellNote[0].kql);

  const kqlHandler = (text) => {
    setKql(text);
  };

  const focusHandler = () => {
    textInput.current.focus();
  };

  //SUMMARY ==============================================
  const summaryInput = useRef(null);
  const [noteSummary, setNoteSummary] = useState(
    selectedCornellNote[0].summary
  );

  const summaryHandler = (text) => {
    setNoteSummary(text);
  };
  const focusSummaryHandler = () => {
    summaryInput.current.focus();
  };

  return (
    <View style={styles.container}>
      <Title style={{ marginBottom: 20, textAlign: "center", marginLeft: -24 }}>
        {selectedCornellNote[0].date}
      </Title>
      <ImageBackground
        style={styles.container}
        source={require("../assets/background6.png")}
      >
        <ScrollView>
          <View>
            <View style={styles.cornellTitleContainer}>
              <TextInput
                style={styles.cornellTitle}
                onChangeText={corTitleChangeHandler}
                value={corTitle}
                multiline={true}
              />
            </View>
            <View style={styles.corMainWrap}>
              <View style={styles.corLeft}>
                <Title style={{ fontSize: 12, marginLeft: -4 }}>
                  Keywords/Questions/Links
                </Title>
                <ScrollView
                  style={styles.container}
                  keyboardDismissMode={
                    Platform.OS === "ios" ? "interactive" : "on-drag"
                  }
                  onTouchStart={focusHandler}
                >
                  <TextInput
                    ref={textInput}
                    multiline={true}
                    onChangeText={kqlHandler}
                    value={kql}
                    style={{
                      fontSize: 15,
                      margin: 15,
                    }}
                  ></TextInput>
                </ScrollView>
              </View>
              <ScrollView style={styles.corRight}>
                {selectedNoteData.map(function (data, dataId) {
                  if (data.dataType === "image") {
                    return (
                      <View key={dataId}>
                        <Lightbox
                          underlayColor="transparent"
                          onLongPress={() => deleteImageHandler(data.id)}
                        >
                          <Image
                            key={dataId}
                            source={{ uri: data.dataContent }}
                            resizeMode="contain"
                            style={{ flex: 1, height: 200, margin: 10 }}
                          />
                        </Lightbox>
                      </View>
                    );
                  } else if (data.dataType === "text") {
                    return (
                      <TouchableOpacity
                        key={dataId}
                        onLongPress={() =>
                          deleteTextHandler(data.id, data.textContent)
                        }
                      >
                        <Text
                          key={data.id}
                          style={{ margin: 20, lineHeight: 20, fontSize: 16 }}
                        >
                          {data.dataContent}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </ScrollView>
            </View>
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.corSummary}>
                <Title style={{ fontSize: 13 }}>Summary</Title>

                <ScrollView
                  style={styles.container}
                  keyboardDismissMode={
                    Platform.OS === "ios" ? "interactive" : "on-drag"
                  }
                  onTouchStart={focusSummaryHandler}
                >
                  <TextInput
                    ref={summaryInput}
                    multiline={true}
                    onChangeText={summaryHandler}
                    value={noteSummary}
                    style={{
                      fontSize: 15,
                      margin: 15,
                    }}
                  ></TextInput>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>

        <KeyboardAvoidingView>
          <PopUpModal
            isVisible={isModalVisible}
            style={styles.modalInput}
            inputChangeHandler={(text) => setText(text)}
            modalTitle="Enter your text:"
            inputValue={text}
            onSave={() => saveTextData(cornellId)}
            onCancel={() => {
              dispatch(addNoteActions.isVisible());
              setText("");
            }}
          ></PopUpModal>
        </KeyboardAvoidingView>
      </ImageBackground>
      <Tab
        key={cornellId}
        selectedNotebookId={notebookId}
        currentCornellId={cornellId}
        cornellTitle={corTitle}
        kql={kql}
        summary={noteSummary}
        addText={addTextHandler}
        addCornell={() => addCornell(notebookId)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  cornellTitleContainer: {
    width: "100%",
    borderBottomWidth: 1.5,
    borderBottomColor: "#C1BBBB",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  cornellTitle: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    color: "#D0312D",
    width: "80%",
    margin: 10,
    minHeight: 40,
  },
  corMainWrap: {
    flexDirection: "row",
    minHeight: 350,
  },
  corLeft: {
    width: "30%",
    borderRightColor: "#C1BBBB",
    borderRightWidth: 1.5,
    alignItems: "center",
    padding: 5,
  },
  corRight: {
    width: "70%",
  },

  corSummary: {
    width: "100%",
    minHeight: 300,
    borderTopColor: "#C1BBBB",
    borderTopWidth: 1.5,
    padding: 10,
  },

  modalInput: {
    height: 300,
    paddingBottom: 100,
  },
});

export default CornellNote;
