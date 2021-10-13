import {
  SET_TIMETABLE,
  ADD_LESSON,
  UPDATE_TIMETABLE,
  DELETE_LESSON,
} from "../actions/timetable-actions";

const initialState = {
  timetable: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LESSON:
      const newLesson = {
        id: action.lessonData.id,
        title: action.lessonData.title,
        startTime: action.lessonData.startTime,
        endTime: action.lessonData.endTime,
        location: action.lessonData.location,
        extra_descriptions: action.lessonData.extra_descriptions,
      };

      return {
        timetable: state.timetable.concat(newLesson),
      };
    case SET_TIMETABLE:
      return {
        timetable: action.timetableData.map((tm) => ({
          id: tm.lessonId,
          title: tm.title,
          startTime: new Date(tm.startTime),
          endTime: new Date(tm.endTime),
          location: tm.location,
          extra_descriptions: tm.extra_descriptions,
        })),
      };
    case DELETE_LESSON:
      return {
        timetable: action.timetableData.map((tm) => ({
          id: tm.lessonId,
          title: tm.title,
          startTime: new Date(tm.startTime),
          endTime: new Date(tm.endTime),
          location: tm.location,
          extra_descriptions: tm.extra_descriptions,
        })),
      };
    case UPDATE_TIMETABLE:
      return {
        timetable: action.timetableData.map((tm) => ({
          id: tm.lessonId,
          title: tm.title,
          startTime: new Date(tm.startTime),
          endTime: new Date(tm.endTime),
          location: tm.location,
          extra_descriptions: tm.extra_descriptions,
        })),
      };
    default:
      return state;
  }
};
