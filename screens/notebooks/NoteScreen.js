import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Dimensions,
  FlatList,
  Text,
} from "react-native";
import { IconButton, Title } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import Modal from "react-native-modal";

import { COLORS } from "../../constants/Colors";

import AppHeader from "../../components/AppHeader";

import * as addNoteActions from "../../store/actions/addNote-action";
import CornellNote from "../../components/CornellNote";

const NoteScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const notebookId = route.params.noteId;

  useEffect(() => {
    dispatch(addNoteActions.loadCornellNote());
  }, [dispatch]);

  const selectedNote = useSelector((state) => state.noteBooks.noteBooks).find(
    (note) => note.id === notebookId
  );

  const cornellNotes = useSelector(
    (state) => state.noteBooks.cornellNotes
  )?.filter((nt) => nt.notebookId === notebookId);

  const titleList = cornellNotes.map((nt) => ({
    id: nt.id,
    title: nt.title,
  }));

  const isModalVisible = useSelector((state) => state.noteBooks.isModalVisible);
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  const [title, setTitle] = useState(selectedNote.title);

  const addCornell = (id) => {
    dispatch(addNoteActions.addCornell(id));
  };

  //CHANGE HANDLERS---------------------------------------------
  const titleChangeHandler = (title) => {
    setTitle(title);
  };

  const textDataEdit = (id, text) => {
    setIsModalVisible(true);
    setText(text);
  };

  //SAVE CHANGES ---------------------------------------
  const saveChangesHandler = (id, title) => {
    dispatch(addNoteActions.updateTitle(id, title));
    navigation.goBack();
  };

  const saveEditedTextData = () => {
    if (text !== "") {
      dispatch(addNoteActions.updateTextData(notebookId, text));
    }
    setText("");
    setIsModalVisible(false);
  };

  //SLECET TOPIC

  const [refFlatList, setRefFlatList] = useState();

  const renderItem = ({ item, index }) => (
    <View style={{ width: windowWidth }} key={index}>
      <CornellNote
        key={index}
        cornellId={item.id}
        notebookId={notebookId}
        isModalVisible={isModalVisible}
      />
    </View>
  );

  const getItemLayout = (data, index) => {
    return { length: windowWidth, offset: windowWidth * index, index };
  };

  //TITLE DRAWER
  const [visible, setVisible] = useState(false);

  const toggleSideMenu = () => {
    setVisible(!visible);
  };

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.listTitle}>{title}</Text>
    </View>
  );

  const onClick = (item, index) => {
    setVisible(!visible);
    onScrollToItemSelected(index);
  };

  const onScrollToItemSelected = (index) => {
    refFlatList.scrollToIndex({ animated: true, index: index });
  };

  const renderDrawerItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => onClick(item, index)}>
      <Item title={item.title} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        style={styles.header}
        onPress={() => saveChangesHandler(selectedNote.id, title)}
      >
        <TextInput
          onChangeText={titleChangeHandler}
          value={title}
          style={styles.title}
        ></TextInput>
        <IconButton
          icon="menu"
          color={COLORS.primary.dark}
          size={25}
          onPress={toggleSideMenu}
        />
      </AppHeader>
      <View style={styles.indicatorContainer}>
        {cornellNotes.map((note, noteIndex) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (noteIndex - 1),
              windowWidth * noteIndex,
              windowWidth * (noteIndex + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={noteIndex}
              style={[styles.normalDot, { width }]}
            />
          );
        })}
      </View>
      <View style={styles.blankList}>
        {cornellNotes[0] !== undefined ? (
          <FlatList
            ref={(ref) => setRefFlatList(ref)}
            data={cornellNotes}
            horizontal={true}
            pagingEnabled
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ])}
            scrollEventThrottle={1}
          />
        ) : (
          <View style={styles.emtyCase}>
            <Title style={styles.title2}>This notebook is empty...</Title>
            <IconButton
              icon="plus"
              color={COLORS.primary.dark}
              size={45}
              onPress={() => addCornell(notebookId)}
            />
          </View>
        )}
      </View>
      <View style={styles.sideMenu}>
        <Modal
          isVisible={visible}
          onBackdropPress={toggleSideMenu} // Android back press
          onSwipeComplete={toggleSideMenu} // Swipe to discard
          animationIn="slideInRight" // Has others, we want slide in from the left
          animationOut="slideOutRight" // When discarding the drawer
          swipeDirection="right" // Discard the drawer with swipe to left
          useNativeDriver // Faster animation
          hideModalContentWhileAnimating // Better performance, try with/without
          propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
          style={styles.sideMenuStyle} // Needs to contain the width, 75% of screen width in our case
        >
          <SafeAreaView style={styles.drawerContainer}>
            <FlatList
              data={titleList}
              renderItem={renderDrawerItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "12%",
    justifyContent: "space-between",
    marginTop: Platform.OS === "android" ? 40 : 0,
  },
  title: {
    fontSize: 16,
    fontFamily: "montserrat-bold",
    fontStyle: "normal",
    letterSpacing: 0.41,
    marginLeft: 24,
    color: COLORS.primary.dark,
  },
  blankList: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 40,
    marginRight: 40,
    height: "10%",
    alignItems: "center",
  },

  backImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sideMenuStyle: {
    alignSelf: "flex-end",
    margin: 0,
    paddingTop: 20,
    width: width * 0.75,
    backgroundColor: "white",
  },
  drawerContainer: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: COLORS.primary.light,
    padding: 10,
    marginVertical: 1,
  },

  listTitle: {
    fontSize: 15,
  },

  emtyCase: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title2: {
    fontSize: 15,
    fontFamily: "montserrat-bold",
    fontStyle: "normal",
    letterSpacing: 0.41,
    color: "#808080",
  },
});

export default NoteScreen;
