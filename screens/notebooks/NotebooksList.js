import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Alert,
  Dimensions,
  Button,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import AppHeader from "../../components/AppHeader";
import { IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import PopUpModal from "../../components/PopUpModal";

import Card from "../../components/Card";
import NotebookBox from "../../components/NotebookBox";
import Title from "../../components/Title";
import * as addNoteActions from "../../store/addNote-action";

import { COLORS } from "../../constants/Colors";

const Notebooks = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");

  const noteBooks = useSelector((state) => state.noteBooks.noteBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNoteActions.loadNotebooks());
  }, [dispatch]);

  const titleChangeHandler = (title) => {
    setNoteTitle(title);
  };

  const onDelete = (id) => {
    dispatch(addNoteActions.removeNotebook(id));
    dispatch(addNoteActions.removeAllNotebookData(id));
  };

  const deleteNotebookHandler = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this item", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Delete", onPress: () => onDelete(id), style: "red" },
    ]);
  };

  const addNotebookHandler = () => {
    if (noteTitle !== "Untitled" && noteTitle !== "") {
      dispatch(addNoteActions.addNotebook(noteTitle));
    }
    setNoteTitle("");
    setIsModalVisible(false);
  };

  const renderGridItem = (itemData) => {
    return (
      <View>
        <NotebookBox
          key={itemData.item.id}
          onPress={() =>
            props.navigation.navigate("NoteScreen", {
              noteId: itemData.item.id,
            })
          }
          onLongPress={() => deleteNotebookHandler(itemData.item.id)}
        >
          <Text>{itemData.item.title}</Text>
        </NotebookBox>
      </View>
    );
  };
  let totalNotes = noteBooks.length;
  return (
    <View style={styles.container}>
      <AppHeader
        style={styles.header}
        onPress={() => props.navigation.goBack()}
      >
        <Title style={styles.title}>Notebooks</Title>
        <IconButton
          icon="plus"
          color={COLORS.primary.dark}
          onPress={() => setIsModalVisible(true)}
          style={{ alignSelf: "flex-end" }}
        />
      </AppHeader>
      <View style={styles.titleContainer}>
        <Title style={styles.totalNotes}>Total {totalNotes} notebooks</Title>
      </View>
      <Card style={styles.card}>
        {totalNotes === 0 ? (
          <Title style={{ color: "white" }}>
            You don't have any Notebooks by now...
          </Title>
        ) : (
          <FlatList
            contentContainerStyle={styles.notebooksContainer}
            numColumns={2}
            data={noteBooks}
            renderItem={renderGridItem}
          />
        )}
      </Card>
      <PopUpModal
        isVisible={isModalVisible}
        style={styles.modalInput}
        inputChangeHandler={titleChangeHandler}
        modalTitle="Notebook Title:"
        inputValue={noteTitle}
        onSave={addNotebookHandler}
        onCancel={() => {
          setIsModalVisible(false);
          setNoteTitle("");
        }}
      ></PopUpModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.background,
    marginTop: Platform.OS === "android" ? 20 : 0,
  },
  card: {
    padding: 40,
    height: "75%",
  },
  header: {
    height: "12%",
    paddingTop: 30,
    marginBottom: 18,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    marginLeft: -129,
  },
  totalNotes: {
    fontSize: 14,
    marginTop: 20,
  },
  titleContainer: {
    flex: 1,
  },
  notebooksContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Notebooks;
