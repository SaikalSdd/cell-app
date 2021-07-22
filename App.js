import "react-native-gesture-handler";
import { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";

import Home from "./screens/notebooks/Home";
import Notebooks from "./screens/notebooks/NotebooksList";
import NoteScreen from "./screens/notebooks/NoteScreen";
import Timetable from "./screens/timetables/Timetable";

import notesReducer from "./store/reducers/addNote-reducer";
import timetableReducer from "./store/reducers/timetable-reducers";
import {
  noteBooks_init,
  cornell_init,
  noteData_init,
  timetable_init,
} from "./helpers/db";
import AddNewLesson from "./screens/timetables/AddNewLesson";
import EditLesson from "./screens/timetables/EditLesson";
import AddText from "./screens/notebooks/AddText";
import EditText from "./screens/notebooks/EditText";

SplashScreen.preventAutoHideAsync();

noteBooks_init()
  .then(() => {
    console.log("Initialized database - Notebooks");
  })
  .catch((err) => {
    console.log("Initializing db failed - Notebooks.");
    console.log(err);
  });

cornell_init()
  .then(() => {
    console.log("Initialized database - Cornell");
  })
  .catch((err) => {
    console.log("Initializing db failed - Cornell.");
    console.log(err);
  });

noteData_init()
  .then(() => {
    console.log("Initialized database - Notedata");
  })
  .catch((err) => {
    console.log("Initializing db failed - Notedata.");
    console.log(err);
  });

timetable_init()
  .then(() => {
    console.log("Initialized database - Timetable");
  })
  .catch((err) => {
    console.log("Initializing db failed - Timetable.");
    console.log(err);
  });

const rootReducer = combineReducers({
  noteBooks: notesReducer,
  timetable: timetableReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const Stack = createStackNavigator();

function App() {
  [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => alert(err)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NotebooksList" component={Notebooks} />
          <Stack.Screen name="NoteScreen" component={NoteScreen} />
          <Stack.Screen name="Timetable" component={Timetable} />
          <Stack.Screen name="AddNewLesson" component={AddNewLesson} />
          <Stack.Screen name="EditLesson" component={EditLesson} />
          <Stack.Screen name="AddText" component={AddText} />
          <Stack.Screen name="EditText" component={EditText} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "mountains-of-christmas-regular": require("./assets/fonts/MountainsofChristmas-Regular.ttf"),
    "mountains-of-christmas-bold": require("./assets/fonts/MountainsofChristmas-Bold.ttf"),
  });
};

export default App;
