import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import TimeTableView, { genTimeBlock } from "react-native-timetable";
import { COLORS } from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as timetableActions from "../../store/actions/timetable-actions";

const events_data = [
  {
    title: "Math",
    startTime: genTimeBlock("MON", 9),
    endTime: genTimeBlock("MON", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
  {
    title: "Math",
    startTime: genTimeBlock("WED", 9),
    endTime: genTimeBlock("WED", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
  {
    title: "Physics",
    startTime: genTimeBlock("MON", 11),
    endTime: genTimeBlock("MON", 11, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
  },
  {
    title: "Physics",
    startTime: genTimeBlock("WED", 11),
    endTime: genTimeBlock("WED", 11, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
  },
  {
    title: "Mandarin",
    startTime: genTimeBlock("TUE", 9),
    endTime: genTimeBlock("TUE", 10, 50),
    location: "Language Center",
    extra_descriptions: ["Chen"],
  },
  {
    title: "Japanese",
    startTime: genTimeBlock("FRI", 9),
    endTime: genTimeBlock("FRI", 10, 50),
    location: "Language Center",
    extra_descriptions: ["Nakamura"],
  },
  {
    title: "Club Activity",
    startTime: genTimeBlock("THU", 9),
    endTime: genTimeBlock("THU", 10, 50),
    location: "Activity Center",
  },
  {
    title: "Club Activity",
    startTime: genTimeBlock("FRI", 13, 30),
    endTime: genTimeBlock("FRI", 14, 50),
    location: "Activity Center",
  },
];

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(timetableActions.loadTimetable());
  }, [dispatch]);

  const timetableData = useSelector((state) => state.timetable.timetable);
  console.log(timetableData);

  const pivotDate = genTimeBlock("mon");

  const scrollViewRef = (ref) => {
    const timetableRef = ref;
  };

  const onEventPress = (evt) => {
    props.navigation.navigate("EditLesson", {
      paramTitle: evt.title,
      paramLocation: evt.location,
      paramStartTime: evt.startTime.toString(),
      paramEndTime: evt.endTime.toString(),
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
        <Text style={styles.headerTitle}>{timetableData.length}</Text>
        <IconButton
          icon="plus"
          color="#fff"
          onPress={() => props.navigation.navigate("AddNewLesson")}
        />
      </View>
      <View style={styles.container}>
        <TimeTableView
          scrollViewRef={scrollViewRef}
          events={timetableData}
          pivotTime={8}
          pivotDate={pivotDate}
          numberOfDays={7}
          onEventPress={onEventPress}
          headerStyle={styles.headerStyle}
          formatDateHeader="ddd"
          locale="en"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.primary.light,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    backgroundColor: COLORS.primary.light,
    height: "10%",
    width: "100%",
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
});

export default App;
