import {
  SET_TIMETABLE,
  ADD_LESSON,
  UPDATE_TIMETABLE,
  DELETE_LESSON,
} from "../actions/timetable-actions";

import Timetable from "../../models/timetable";

const initialState = {
  timetable: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LESSON:
      const newLesson = new Timetable(
        action.lessonData.id,
        action.lessonData.title,
        action.lessonData.startTime,
        action.lessonData.endTime,
        action.lessonData.location,
        action.lessonData.extra_descriptions
      );
      return {
        timetable: state.timetable.concat(newLesson),
      };
    case SET_TIMETABLE:
      return {
        timetable: action.timetableData.map(
          (tm) =>
            new Timetable(
              tm.lessonId,
              tm.title,
              tm.startTime,
              tm.endTime,
              tm.location,
              tm.extra_descriptions
            )
        ),
      };
    case DELETE_LESSON:
      return {
        timetable: action.timetableData.map(
          (tm) =>
            new Timetable(
              tm.lessonId,
              tm.title,
              tm.startTime,
              tm.endTime,
              tm.location,
              tm.extra_descriptions
            )
        ),
      };
    case UPDATE_TIMETABLE:
      return {
        timetable: action.timetableData.map(
          (tm) =>
            new Timetable(
              tm.lessonId,
              tm.title,
              tm.startTime,
              tm.endTime,
              tm.location,
              tm.extra_descriptions
            )
        ),
      };
    default:
      return state;
  }
};
