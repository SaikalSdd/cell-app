import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { IconButton } from "react-native-paper";
import { COLORS } from "../../constants/Colors";
import LessonPeriod from "../../components/timetableComponents/LessonPeriod";
import { useDispatch } from "react-redux";
import * as timetableActions from "../../store/actions/timetable-actions";
import { genTimeBlock } from "react-native-timetable";

const AddNewLesson = (props) => {
  const dispatch = useDispatch();

  //STATES

  const [startTime, setStartTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });
  const [endTime, setEndTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });
  const [lessonDay, setLessonDay] = useState("MON");
  const [lessonDaysCount, setLessonDaysCount] = useState([
    {
      id: new Date().getTime().toString(),
      day: lessonDay,
      startTime: { hours: startTime.hours, minutes: startTime.minutes },
      endTime: { hours: endTime.hours, minutes: endTime.minutes },
    },
  ]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  // HANDLERS
  const onSave = () => {
    if (title !== "") {
      lessonDaysCount.map((lesson) => {
        dispatch(
          timetableActions.addLesson(
            title,
            genTimeBlock(
              lesson.day,
              lesson.startTime.hours,
              lesson.startTime.minutes
            ),
            genTimeBlock(
              lesson.day,
              lesson.endTime.hours,
              lesson.endTime.minutes
            ),
            location
          )
        );
      });
      /* alert(lessonDaysCount[0].startTime.minutes); */
      props.navigation.goBack();
    } else {
      Alert.alert(
        "Form Checker Error",
        "Enter a value in the Title field or add lesson periods before proceeding"
      );
    }
  };

  const titleChangeHandler = (e) => {
    setTitle(e);
  };
  const locationChangeHandler = (e) => {
    setLocation(e);
  };

  const confirmStartTime = (id, hours, minutes) => {
    setStartTime({ hours: hours, minutes: minutes });
    const items = [...lessonDaysCount];
    const pickedItem = items.filter((el) => el.id === id);
    const updatedItem = pickedItem[0];

    updatedItem.startTime.hours = hours;
    updatedItem.startTime.minutes = minutes;
    items[items.findIndex((x) => x.id === id)] = updatedItem;
    setLessonDaysCount[items];
  };

  const confirmEndTime = (id, hours, minutes) => {
    setEndTime({ hours: hours, minutes: minutes });
    const items = [...lessonDaysCount];
    const pickedItem = items.filter((el) => el.id === id);
    const updatedItem = pickedItem[0];

    updatedItem.endTime.hours = hours;
    updatedItem.endTime.minutes = minutes;
    items[items.findIndex((x) => x.id === id)] = updatedItem;
    setLessonDaysCount[items];
  };
  const confirmLessonDay = (id, day) => {
    setLessonDay(day.label);
    const items = [...lessonDaysCount];

    const updatedItem = items.filter((el) => el.id === id)[0];

    updatedItem.day = day.label;
    items[items.findIndex((x) => x.id === id)] = updatedItem;
    setLessonDaysCount[items];
    setLessonDay("MON");
  };
  const deleteDayTime = (id) => {
    setLessonDaysCount((lessonDays) => lessonDays.filter((l) => l.id !== id));
  };

  const addDayTime = () => {
    const id = new Date().getTime().toString();

    setLessonDaysCount((prevLessonDaysCount) => {
      return [...prevLessonDaysCount].concat({
        id: id,
        day: lessonDay,
        startTime: { hours: startTime.hours, minutes: startTime.minutes },
        endTime: { hours: endTime.hours, minutes: endTime.minutes },
      });
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          color="#fff"
          size={25}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Add New Lesson</Text>
        <Text onPress={() => onSave()} style={styles.headerTitle}>
          Save
        </Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={titleChangeHandler}
        />
        <TextInput
          placeholder="Location"
          style={styles.input}
          onChangeText={locationChangeHandler}
        />
      </View>
      <ScrollView>
        {lessonDaysCount.map((el) => (
          <LessonPeriod
            key={el.id}
            lesDay={el.day}
            startTimeHours={el.startTime.hours}
            startTimeMinutes={el.startTime.minutes}
            endTimeHours={el.endTime.hours}
            endTimeMinutes={el.endTime.minutes}
            transferStartTime={(hours, minutes) =>
              confirmStartTime(el.id, hours, minutes)
            }
            transferEndTime={(hours, minutes) =>
              confirmEndTime(el.id, hours, minutes)
            }
            transferDay={(day) => confirmLessonDay(el.id, day)}
            onDelete={() => deleteDayTime(el.id)}
          />
        ))}
        <TouchableOpacity onPress={() => addDayTime()}>
          <Text style={styles.addButton}>Add Time</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.primary.light,
  },
  container: {
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    marginBottom: 10,
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
  input: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    height: 35,
    marginTop: 10,
    width: "90%",
    borderRadius: 5,
    color: "#AAAAAA",
    padding: 10,
  },
  addButton: {
    marginTop: 20,
    color: Platform.OS === "ios" ? "#007AFF" : "#ffffff",
    fontSize: Platform.OS === "android" ? 14 : 19,
    textAlign: "center",
    textTransform: Platform.OS === "android" ? "uppercase" : "none",
    backgroundColor: Platform.OS === "android" ? "#2196F3" : "transparent",
    padding: 9,
    width: "30%",
    alignSelf: "center",
  },
});

export default AddNewLesson;
