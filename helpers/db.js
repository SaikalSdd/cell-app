import * as SQLite from "expo-sqlite";

const noteBooks = SQLite.openDatabase("noteBooks.db");

export const noteBooks_init = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS notebookList (notebookId INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const noteData_init = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS noteData (dataId INTEGER PRIMARY KEY NOT NULL, dataContent TEXT NOT NULL, notebookId INTEGER NOT NULL, cornellId INTEGER NOT NULL, date TEXT, dataType TEXT);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const cornell_init = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS cornell (cornellId INTEGER PRIMARY KEY NOT NULL, title TEXT, date TEXT, kql TEXT,  summary TEXT, notebookId INTEGER NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const timetable_init = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS timetable (lessonId INTEGER PRIMARY KEY NOT NULL, title TEXT, startTime TEXT, endTime TEXT, location TEXT, extra_descriptions TEXT);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertNewNotebook = (title) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO notebookList (title) VALUES (?);`,
        [title],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertData = (
  dataContent,
  notebookId,
  cornellId,
  date,
  dataType
) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO noteData (dataContent, notebookId, cornellId, date, dataType) VALUES (?, ?, ?, ?, ?);`,
        [dataContent, notebookId, cornellId, date, dataType],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertCornellNote = (title, date, kql, summary, notebookId) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO cornell (title, date, kql, summary, notebookId) VALUES (?,  ?, ?, ?, ?);`,
        [title, date, kql, summary, notebookId],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const insertLesson = (
  title,
  startTime,
  endTime,
  location,
  extra_descriptions
) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO timetable (title, startTime, endTime, location, extra_descriptions) VALUES (?, ?, ?, ?, ?);`,
        [title, startTime, endTime, location, extra_descriptions],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchNotebooks = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notebookList",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM noteData",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const fetchCornellNote = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cornell",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchTimetable = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM timetable",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteNotebook = (id) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM notebookList WHERE notebookId = ?",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteData = (id) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM noteData WHERE dataId = ?",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteCornellData = (id) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM noteData WHERE cornellId = ?",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteCornell = (id) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM cornell WHERE cornellId = ?",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteAllNotebookData = (id) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM noteData WHERE notebookId = ?",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteLesson = (id) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM timetable WHERE lessonId = ?",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const updateNotebookTitle = (id, title) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "UPDATE notebookList SET title = ? WHERE notebookId = ?",
        [title, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//('UPDATE users SET first_name = ? , last_name = ? WHERE id = ?', ["Doctor", "Strange", 3])

export const updateLesson = (title, startTime, endTime, location, lessonId) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "UPDATE timetable SET title = ?, startTime = ?, endTime = ?, location = ? WHERE lessonId = ?",
        [title, startTime, endTime, location, lessonId],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const updateCornell = (title, kql, summary, cornellId) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "UPDATE cornell SET title = ?, kql=?, summary=? WHERE cornellId = ?",
        [title, kql, summary, cornellId],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const updateText = (id, text) => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "UPDATE noteData SET dataContent = ? WHERE dataId = ?",
        [text, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const dropNotebooksTable = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE notebookList;",

        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const dropMainNotesTable = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE mainNotes;",

        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const dropCornellTable = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE cornell;",

        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const dropNoteDataTable = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE noteData;",

        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const dropTimetable = () => {
  const promise = new Promise((resolve, reject) => {
    noteBooks.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE timetable;",

        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
