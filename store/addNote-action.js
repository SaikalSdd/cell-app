import * as FileSystem from "expo-file-system";
import * as dbExecutions from "../helpers/db";

export const ADD_NOTEBOOK = "ADD_NOTEBOOK";
export const SET_NOTEBOOKS = "SET_NOTEBOOKS";
export const DELETE_NOTEBOOK = "DELETE_NOTEBOOK";

export const ADD_IMAGE = "ADD_IMAGE";

export const ADD_DATA = "ADD_DATA";
export const SET_DATA = "SET_DATA";
export const DELETE_DATA = "DELETE_DATA";
export const DELETE_ALL_NOTEBOOK_DATA = "DELETE_ALL_NOTEBOOK_DATA";

export const ADD_CORNELL = "ADD_CORNELL";
export const SET_CORNELL = "SET_CORNELL";
export const UPDATE_CORNELL = "UPDATE_CORNELL";
export const DELETE_CORNELL = "DELETE_CORNELL";
export const DELETE_CORNELL_DATA = "DELETE_CORNELL_DATA";
export const DELETE_ALL_NOTEBOOK_CORNELL = "DELETE_ALL_NOTEBOOK_CORNELL";

export const ADD_TEXT = "ADD_TEXT";
export const UPDATE_TEXT = "UPDATE_TEXT";

export const UPDATE_TITLE = "UPDATE_TITLE";

export const IS_MODAL_VISIBLE = "IS_MODAL_VISIBLE";

export const addNotebook = (title) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.insertNewNotebook(title);
      console.log(dbResult);
      dispatch({
        type: ADD_NOTEBOOK,
        noteData: {
          id: dbResult.insertId,
          title: title,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const addImage = (imageUri, notebookId, cornellId) => {
  return async (dispatch) => {
    const fileName = imageUri.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    const date = new Date().toString();

    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      const dbResult = await dbExecutions.insertData(
        newPath,
        notebookId,
        cornellId,
        date,
        "image"
      );
      console.log(dbResult);
      console.log(`Image is successfully added: ${dbResult}`);
      dispatch({
        type: ADD_IMAGE,
        imageData: {
          id: dbResult.insertId,
          imageUri: newPath,
          notebookId: notebookId,
          cornellId: cornellId,
          date: date,
          dataType: "image",
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const addText = (textData, notebookId, cornellId) => {
  return async (dispatch) => {
    const date = new Date().toString();

    try {
      const dbResult = await dbExecutions.insertData(
        textData,
        notebookId,
        cornellId,
        date,
        "text"
      );
      console.log(dbResult);
      console.log(`Text is successfully added: ${dbResult}`);

      dispatch({
        type: ADD_TEXT,
        textData: {
          id: dbResult.insertId,
          textData: textData,
          notebookId: notebookId,
          cornellId: cornellId,
          date: date,
          dataType: "text",
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const addCornell = (notebookId) => {
  return async (dispatch) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const getDate = new Date();
    const day = getDate.getDate();
    const month = monthNames[getDate.getMonth()];
    const year = getDate.getFullYear();

    const date = `${day} ${month}, ${year}`;
    try {
      const dbResult = await dbExecutions.insertCornellNote(
        "Title",
        date,
        "",
        "",
        notebookId
      );
      console.log(dbResult);
      console.log(`Cornell is successfully added: ${dbResult}`);
      dispatch({
        type: ADD_CORNELL,
        cornellData: {
          id: dbResult.insertId,
          title: "Title",
          date: date,
          kql: "",
          summary: "",
          notebookId: notebookId,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const loadNotebooks = () => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.fetchNotebooks();
      console.log(dbResult);
      dispatch({ type: SET_NOTEBOOKS, noteBooks: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const loadData = () => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.fetchData();
      console.log("fetched noteData", dbResult);
      dispatch({ type: SET_DATA, noteData: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const loadCornellNote = () => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.fetchCornellNote();
      console.log("fetched noteData", dbResult);
      dispatch({ type: SET_CORNELL, cornellData: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const removeNotebook = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.deleteNotebook(id);
      console.log(dbResult);
      const dbUpdate = await dbExecutions.fetchNotebooks();
      dispatch({
        type: DELETE_NOTEBOOK,
        noteBooks: dbUpdate.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const removeData = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.deleteData(id);
      console.log(dbResult);
      const dbUpdate = await dbExecutions.fetchData();

      dispatch({
        type: DELETE_DATA,
        noteData: dbUpdate.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const removeCornellData = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.deleteCornellData(id);
      console.log(dbResult);
      const dbUpdate = await dbExecutions.fetchData();

      dispatch({
        type: DELETE_CORNELL_DATA,
        noteData: dbUpdate.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const removeCornell = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.deleteCornell(id);
      console.log(dbResult);
      const dbUpdate = await dbExecutions.fetchCornellNote();

      dispatch({
        type: DELETE_CORNELL,
        cornellData: dbUpdate.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const removeAllNotebookData = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.deleteAllNotebookData(id);
      console.log(dbResult);
      const dbUpdate = await dbExecutions.fetchData();

      dispatch({
        type: DELETE_ALL_NOTEBOOK_DATA,
        noteData: dbUpdate.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const updateTitle = (id, title) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.updateNotebookTitle(id, title);
      console.log(dbResult);
      const dbUpdate = await dbExecutions.fetchNotebooks();

      dispatch({
        type: UPDATE_TITLE,
        notebook: dbUpdate.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const isVisible = () => {
  return {
    type: IS_MODAL_VISIBLE,
  };
};

export const updateCornellNote = (title, kql, summary, cornellId) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.updateCornell(
        title,
        kql,
        summary,
        cornellId
      );

      const dbUpdate = await dbExecutions.fetchCornellNote();
      console.log(dbUpdate);
      dispatch({
        type: UPDATE_CORNELL,
        cornellData: dbUpdate.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const updateTextData = (id, text) => {
  return async (dispatch) => {
    try {
      const dbResult = await dbExecutions.updateText(id, text);
      console.log(dbResult);
      const dbUpdate = await dbExecutions.fetchTextData();

      dispatch({
        type: UPDATE_TEXT,
        textData: dbUpdate.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
