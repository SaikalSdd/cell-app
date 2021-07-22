import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Picker } from "react-native-woodpicker";
import { TimePickerModal } from "react-native-paper-dates";
import { useState, useCallback } from "react";
import { COLORS } from "../../constants/Colors";

// on top of your index.android.js file
const isAndroid = require("react-native").Platform.OS === "android";
const isHermesEnabled = !!global.HermesInternal;

// in your index.js file
if (isHermesEnabled || isAndroid) {
  require("@formatjs/intl-getcanonicallocales/polyfill");
  require("@formatjs/intl-locale/polyfill");

  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-displaynames/polyfill");
  require("@formatjs/intl-displaynames/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-listformat/polyfill");
  require("@formatjs/intl-listformat/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-numberformat/polyfill");
  require("@formatjs/intl-numberformat/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-relativetimeformat/polyfill");
  require("@formatjs/intl-relativetimeformat/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-datetimeformat/polyfill");
  require("@formatjs/intl-datetimeformat/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-datetimeformat/add-golden-tz.js");

  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone

  if ("__setDefaultTimeZone" in Intl.DateTimeFormat) {
    // If you are using react-native-cli
    /*  let RNLocalize = require("react-native-localize");
    Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone());
 */
    // Are you using Expo, use this instead of previous 2 lines
    Intl.DateTimeFormat.__setDefaultTimeZone(
      require("expo-localization").timezone
    );
  }
}

const LessonPeriod = (props) => {
  const data = [
    { label: "MON", value: 1 },
    { label: "TUE", value: 2 },
    { label: "WED", value: 3 },
    { label: "THU", value: 4 },
    { label: "FRI", value: 5 },
    { label: "SAT", value: 6 },
  ];

  const [pickedDay, setPickedDay] = useState("MON");

  ///////////////////////////////////////////////////////
  const [visibleStart, setVisibleStart] = useState(false);
  const [visibleEnd, setVisibleEnd] = useState(false);
  /////////////////////////////////////////////////////

  const onDismissStartTime = useCallback(() => {
    setVisibleStart(false);
  }, [setVisibleStart]);
  const onDismissEndTime = useCallback(() => {
    setVisibleEnd(false);
  }, [setVisibleEnd]);

  /////////////////////////////////////////////////////
  const onConfirmStartTime = useCallback(
    ({ hours, minutes }) => {
      setVisibleStart(false);
      props.transferStartTime(hours, minutes);
    },
    [setVisibleStart]
  );
  const onConfirmEndTime = useCallback(
    ({ hours, minutes }) => {
      setVisibleEnd(false);
      props.transferEndTime(hours, minutes);
    },
    [setVisibleEnd]
  );

  const pickDay = (day) => {
    setPickedDay(day);
    props.transferDay(day);
  };
  return (
    <View style={styles.container}>
      <Picker
        item={pickedDay}
        items={data}
        onItemChange={pickDay}
        title="Data Picker"
        placeholder={props.lesDay}
        isNullable
        iosDisplay="spinner"
        //disable
        style={styles.time}
      />
      <View>
        <TouchableOpacity onPress={() => setVisibleStart(true)}>
          <Text
            style={styles.time}
          >{`${props.startTimeHours}:${props.startTimeMinutes}`}</Text>
        </TouchableOpacity>
        <TimePickerModal
          visible={visibleStart}
          onDismiss={onDismissStartTime}
          onConfirm={onConfirmStartTime}
          hours={12} // default: current hours
          minutes={14} // default: current minutes
          label="Select time" // optional, default 'Select time'
          cancelLabel="Cancel" // optional, default: 'Cancel'
          confirmLabel="Ok" // optional, default: 'Ok'
          animationType="fade" // optional, default is 'none'
        />
      </View>

      <View>
        <TouchableOpacity onPress={() => setVisibleEnd(true)}>
          <Text
            style={styles.time}
          >{`${props.endTimeHours}:${props.endTimeMinutes}`}</Text>
        </TouchableOpacity>
        <TimePickerModal
          visible={visibleEnd}
          onDismiss={onDismissEndTime}
          onConfirm={onConfirmEndTime}
          hours={12} // default: current hours
          minutes={14} // default: current minutes
          label="Select time" // optional, default 'Select time'
          cancelLabel="Cancel" // optional, default: 'Cancel'
          confirmLabel="Ok" // optional, default: 'Ok'
          animationType="fade" // optional, default is 'none'
        />
      </View>
      <TouchableOpacity onPress={props.onDelete}>
        <Text style={styles.deleteButton}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  time: {
    borderWidth: 1,
    borderColor: COLORS.primary.light,
    height: 40,
    width: 60,
    borderRadius: 5,
    color: COLORS.primary.light,
    padding: 10,
    textAlign: "center",
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "red",
    color: "red",
    height: 40,
    width: 40,
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LessonPeriod;
