import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import TimeTableView, { genTimeBlock } from "react-native-timetable";
import { COLORS } from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as timetableActions from "../../store/actions/timetable-actions";

const Timetable = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(timetableActions.loadTimetable());
  }, [dispatch]);

  const timetableData = useSelector((state) => state.timetable.timetable);

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
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          color="#fff"
          size={25}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Timetable</Text>
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
          locale="en-US"
        />
      </View>
    </View>
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

export default Timetable;
