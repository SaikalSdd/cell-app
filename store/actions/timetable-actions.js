import * as dbExecutions from "../../helpers/db";

export const SET_TIMETABLE = "SET_TIMETABLE";
export const ADD_LESSON = "ADD_LESSON";
export const DELETE_LESSON = "DELETE_LESSON";
export const UPDATE_TIMETABLE = "UPDATE_TIMETABLE";

export const addLesson = (
  title,
  startTime,
  endTime,
  location,
  extra_descriptions
) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.insertLesson(
        title,
        startTime,
        endTime,
        location,
        extra_descriptions
      );
      dispatch({
        type: ADD_LESSON,
        lessonData: {
          id: dbResult.insertId,
          title: title,
          startTime: startTime,
          endTime: endTime,
          location: location,
          extra_descriptions: extra_descriptions,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadTimetable = () => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.fetchTimetable();
      dispatch({ type: SET_TIMETABLE, timetableData: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const removeLesson = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.deleteLesson(id);
      const dbUpdate = await dbExecutions.fetchTimetable();

      dispatch({
        type: DELETE_LESSON,
        timetableData: dbUpdate.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const updateTimetable = (
  title,
  startTime,
  endTime,
  location,
  lessonId
) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.updateLesson(
        title,
        startTime,
        endTime,
        location,
        lessonId
      );

      const dbUpdate = await dbExecutions.fetchTimetable();
      dispatch({
        type: UPDATE_TIMETABLE,
        timetableData: dbUpdate.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
