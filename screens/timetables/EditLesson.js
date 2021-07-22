import React, { useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { IconButton } from "react-native-paper";
import { COLORS } from "../../constants/Colors";
import LessonPeriod from "../../components/timetableComponents/LessonPeriod";
import { useDispatch, useSelector } from "react-redux";
import * as timetableActions from "../../store/actions/timetable-actions";
import { genTimeBlock } from "react-native-timetable";

const EditLesson = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const timetableData = useSelector((state) => state.timetable.timetable);

  const { paramTitle, paramLocation, paramStartTime, paramEndTime } =
    route.params;

  const weekDays = [
    { label: "MON", value: 1 },
    { label: "TUE", value: 2 },
    { label: "WED", value: 3 },
    { label: "THU", value: 4 },
    { label: "FRI", value: 5 },
    { label: "SAT", value: 6 },
  ];
  const day = new Date(paramStartTime).getDay();

  //STATES

  const [startTime, setStartTime] = useState({
    hours: new Date(paramStartTime).getHours(),
    minutes: new Date(paramStartTime).getMinutes(),
  });
  const [endTime, setEndTime] = useState({
    hours: new Date(paramEndTime).getHours(),
    minutes: new Date(paramEndTime).getMinutes(),
  });
  const [lessonDay, setLessonDay] = useState(
    weekDays.filter((el) => el.value === day)[0].label
  );
  const [title, setTitle] = useState(paramTitle);
  const [location, setLocation] = useState(paramLocation);
  const [dayTimeBlock, setDayTimeBlock] = useState({
    day: lessonDay,
    startTime: { hours: startTime.hours, minutes: startTime.minutes },
    endTime: { hours: endTime.hours, minutes: endTime.minutes },
  });

  // HANDLERS
  const onSave = () => {
    const itemId = timetableData.filter(
      (el) =>
        el.startTime.toString() === paramStartTime && el.title === paramTitle
    )[0].id;

    if (title !== "") {
      dispatch(
        timetableActions.updateTimetable(
          title,
          genTimeBlock(lessonDay, startTime.hours, startTime.minutes),
          genTimeBlock(lessonDay, endTime.hours, endTime.minutes),
          location,
          itemId
        )
      );
      navigation.goBack();
    } else {
      Alert.alert(
        "Form Checker Error",
        "Enter a value in the Title field before proceeding"
      );
    }
  };

  const titleChangeHandler = (e) => {
    setTitle(e);
  };
  const locationChangeHandler = (e) => {
    setLocation(e);
  };

  const confirmStartTime = (hours, minutes) => {
    setStartTime({ hours: hours, minutes: minutes });
    const items = { ...dayTimeBlock };

    items.startTime.hours = hours;
    items.startTime.minutes = minutes;
    setDayTimeBlock(items);
  };

  const confirmEndTime = (hours, minutes) => {
    setEndTime({ hours: hours, minutes: minutes });
    const items = { ...dayTimeBlock };

    items.endTime.hours = hours;
    items.endTime.minutes = minutes;
    setDayTimeBlock(items);
  };
  const confirmLessonDay = (day) => {
    setLessonDay(day.label);
    const items = { ...dayTimeBlock };

    items.day = day.label;
    setDayTimeBlock(items);
  };
  const deleteDayTime = () => {
    const itemId = timetableData.filter(
      (el) =>
        el.startTime.toString() === paramStartTime && el.title === paramTitle
    )[0].id;
    dispatch(timetableActions.removeLesson(itemId));
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
        <Text style={styles.headerTitle}>Edit Lesson</Text>
        <Text onPress={() => onSave()} style={styles.headerTitle}>
          Save
        </Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <TextInput
          placeholder="Location"
          style={styles.input}
          onChangeText={locationChangeHandler}
          value={location}
        />
      </View>
      <ScrollView>
        <LessonPeriod
          key={lessonDay}
          lesDay={lessonDay}
          startTimeHours={startTime.hours}
          startTimeMinutes={startTime.minutes}
          endTimeHours={endTime.hours}
          endTimeMinutes={endTime.minutes}
          transferStartTime={(hours, minutes) =>
            confirmStartTime(hours, minutes)
          }
          transferEndTime={(hours, minutes) => confirmEndTime(hours, minutes)}
          transferDay={(day) => confirmLessonDay(day)}
          onDelete={() =>
            Alert.alert("Delete", "Are you sure you want to delete this item", [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: () => deleteDayTime(),
                style: "destructive",
              },
            ])
          }
        />
      </ScrollView>
    </View>
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
    width: 100,
  },
});

export default EditLesson;
