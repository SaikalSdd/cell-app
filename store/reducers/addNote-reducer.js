import {
  ADD_IMAGE,
  ADD_NOTEBOOK,
  ADD_TEXT,
  DELETE_NOTEBOOK,
  SET_NOTEBOOKS,
  UPDATE_TEXT,
  UPDATE_TITLE,
  SET_DATA,
  DELETE_DATA,
  DELETE_ALL_NOTEBOOK_DATA,
  SET_CORNELL,
  ADD_CORNELL,
  DELETE_CORNELL,
  DELETE_CORNELL_DATA,
  IS_MODAL_VISIBLE,
  UPDATE_CORNELL,
} from "../actions/addNote-action";
import Notebook from "../../models/note";
import Data from "../../models/noteData";
import CornellNote from "../../models/cornellNote";

const initialState = {
  noteBooks: [],
  cornellNotes: [],
  noteData: [],
  isModalVisible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTEBOOKS:
      return {
        noteBooks: action.noteBooks.map(
          (nt) => new Notebook(nt.notebookId.toString(), nt.title)
        ),
        cornellNotes: state.cornellNotes,
        noteData: state.noteData,
        isModalVisible: state.isModalVisible,
      };

    case ADD_NOTEBOOK:
      const newNotebook = new Notebook(
        action.noteData.id.toString(),
        action.noteData.title
      );
      return {
        noteBooks: state.noteBooks.concat(newNotebook),
        cornellNotes: state.cornellNotes,
        noteData: state.noteData,
        isModalVisible: state.isModalVisible,
      };
    case ADD_IMAGE:
      const newImage = new Data(
        action.imageData.id.toString(),
        action.imageData.imageUri,
        action.imageData.notebookId.toString(),
        action.imageData.cornellId.toString(),
        action.imageData.date,
        action.imageData.dataType
      );
      return {
        noteBooks: state.noteBooks,
        cornellNotes: state.cornellNotes,
        noteData: state.noteData.concat(newImage),
        isModalVisible: state.isModalVisible,
      };

    case ADD_TEXT:
      const newText = new Data(
        action.textData.id.toString(),
        action.textData.textData,
        action.textData.notebookId.toString(),
        action.textData.cornellId.toString(),
        action.textData.date,
        action.textData.dataType
      );
      return {
        noteBooks: state.noteBooks,
        cornellNotes: state.cornellNotes,
        noteData: state.noteData.concat(newText),
        isModalVisible: state.isModalVisible,
      };

    case ADD_CORNELL:
      const newCornell = new CornellNote(
        action.cornellData.id.toString(),
        action.cornellData.title,
        action.cornellData.date,
        action.cornellData.kql,
        action.cornellData.summary,
        action.cornellData.notebookId.toString()
      );
      return {
        noteBooks: state.noteBooks,
        cornellNotes: state.cornellNotes.concat(newCornell),
        noteData: state.noteData,
        isModalVisible: state.isModalVisible,
      };
    case SET_DATA:
      return {
        noteBooks: state.noteBooks,
        cornellNotes: state.cornellNotes,
        noteData: action.noteData.map(
          (dt) =>
            new Data(
              dt.dataId.toString(),
              dt.dataContent,
              dt.notebookId.toString(),
              dt.cornellId.toString(),
              dt.date,
              dt.dataType
            )
        ),
        isModalVisible: state.isModalVisible,
      };
    case SET_CORNELL:
      return {
        noteBooks: state.noteBooks,
        cornellNotes: action.cornellData.map(
          (cor) =>
            new CornellNote(
              cor.cornellId.toString(),
              cor.title,
              cor.date,
              cor.kql,
              cor.summary,
              cor.notebookId.toString()
            )
        ),
        noteData: state.noteData,
        isModalVisible: state.isModalVisible,
      };

    case DELETE_NOTEBOOK:
      return {
        noteBooks: action.noteBooks.map(
          (nt) => new Notebook(nt.notebookId.toString(), nt.title)
        ),
        cornellNotes: state.cornellNotes,
        noteData: state.noteData,
        isModalVisible: state.isModalVisible,
      };

    case DELETE_DATA:
      return {
        noteBooks: state.noteBooks,
        cornellNotes: state.cornellNotes,
        noteData: action.noteData.map(
          (dt) =>
            new Data(
              dt.dataId.toString(),
              dt.dataContent,
              dt.notebookId.toString(),
              dt.cornellId.toString(),
              dt.date,
              dt.dataType
            )
        ),
        isModalVisible: state.isModalVisible,
      };
    case DELETE_CORNELL_DATA:
      return {
        noteBooks: state.noteBooks,
        cornellNotes: state.cornellNotes,
        noteData: action.noteData.map(
          (dt) =>
            new Data(
              dt.dataId.toString(),
              dt.dataContent,
              dt.notebookId.toString(),
              dt.cornellId.toString(),
              dt.date,
              dt.dataType
            )
        ),
        isModalVisible: state.isModalVisible,
      };
    case DELETE_CORNELL:
      return {
        noteBooks: state.noteBooks,
        cornellNotes: action.cornellData.map(
          (dt) =>
            new CornellNote(
              dt.cornellId.toString(),
              dt.title,
              dt.date,
              dt.kql,
              dt.summary,
              dt.notebookId.toString()
            )
        ),
        noteData: state.noteData,
        isModalVisible: state.isModalVisible,
      };
    case DELETE_ALL_NOTEBOOK_DATA:
      return {
        noteBooks: state.noteBooks,
        cornellNotes: state.cornellNotes,
        noteData: action.noteData.map(
          (dt) =>
            new Data(
              dt.dataId.toString(),
              dt.dataContent,
              dt.notebookId.toString(),
              dt.cornellId.toString(),
              dt.date,
              dt.dataType
            )
        ),
        isModalVisible: state.isModalVisible,
      };
    case UPDATE_TITLE:
      return {
        noteBooks: action.notebook.map(
          (nt) => new Notebook(nt.notebookId.toString(), nt.title)
        ),
        cornellNotes: state.cornellNotes,
        noteData: state.noteData,
        isModalVisible: state.isModalVisible,
      };
    case UPDATE_CORNELL:
      return {
        noteBooks: state.noteBooks,
        cornellNotes: action.cornellData.map(
          (cor) =>
            new CornellNote(
              cor.cornellId.toString(),
              cor.title,
              cor.date,
              cor.kql,
              cor.summary,
              cor.notebookId.toString()
            )
        ),
        noteData: state.noteData,
        isModalVisible: state.isModalVisible,
      };
    case UPDATE_TEXT:
      return {
        noteBooks: state.noteBooks,
        cornellNotes: state.cornellNotes,
        noteData: action.noteData.map(
          (dt) =>
            new Data(
              dt.dataId.toString(),
              dt.dataContent,
              dt.notebookId.toString(),
              dt.cornellId.toString(),
              dt.date,
              dt.dataType
            )
        ),
        isModalVisible: state.isModalVisible,
      };
    case IS_MODAL_VISIBLE:
      return {
        noteBooks: state.noteBooks,
        cornellNotes: state.cornellNotes,
        noteData: state.noteData,
        isModalVisible: !state.isModalVisible,
      };
    default:
      return state;
  }
};
