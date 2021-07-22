import React from "react";
import { StyleSheet, View, Image, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Card from "../../components/Card";
import { COLORS } from "../../constants/Colors";
import * as dbExecutions from "../../helpers/db";

import {
  dropNoteDataTable,
  dropMainNotesTable,
  dropCornellTable,
  dropTimetable,
} from "../../helpers/db";

const Home = (props) => {
  const { navigate } = props.navigation;

  const dropTables = () => {
    dropTimetable();
    alert("All tables are deleted");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../../assets/logo.png")} />
      </View>
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => navigate("NotebooksList")}>
          <View style={styles.notebooksBtn}>
            <Text style={styles.notebooksBtnTitle}>NOTEBOOKS</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Timetable")}>
          <View style={styles.timetableBtn}>
            <Text style={styles.timetableBtnTitle}>TIMETABLE</Text>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: COLORS.background,
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    height: "60%",
    width: "100%",
  },
  notebooksBtn: {
    width: 300,
    height: 35,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    fontFamily: "montserrat",
    justifyContent: "center",
    alignItems: "center",
  },
  timetableBtn: {
    marginTop: 20,
    width: 300,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "montserrat",
  },
  timetableBtnTitle: {
    color: "white",
    fontSize: 15,
  },
  notebooksBtnTitle: {
    color: COLORS.primary.main,
    fontSize: 15,
  },
});

export default Home;
