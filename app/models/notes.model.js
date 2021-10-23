const sql = require("./db.js");

// constructor
const notes = function(notes) {
  this.title = notes.title;
  this.content = notes.content;
  
  
};

notes.create = (newnotes, result) => {
  sql.query("INSERT INTO notes SET ?", newnotes, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created newnotes: ", { id: res.insertId, ...newnotebooks });
    result(null, { id: res.insertId, ...newnotebookss });
  });
};

notes.findById = (notekID, result) => {
  sql.query(`SELECT * FROM notes WHERE id = ${notekID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found notes: ", res[0]);
      result(null, res[0]);
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};

notes.getAll = result => {
  sql.query("SELECT * FROM notes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("notes: ", res);
    result(null, res);
  });
};

notes.updateById = (id, notes, result) => {
  sql.query(
    "UPDATE notes SET title = ? WHERE id = ?",
    [notes.title, , id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated notes: ", { id: id, ...notes });
      result(null, { id: id, ...notes });
    }
  );
};

notes.remove = (id, result) => {
  sql.query("DELETE FROM notes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted notes with id: ", id);
    result(null, res);
  });
};

notes.removeAll = result => {
  sql.query("DELETE FROM notes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} notes`);
    result(null, res);
  });
};

module.exports = notes;
