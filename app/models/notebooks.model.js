const sql = require("./db.js");

// constructor
const notebooks = function(notebooks) {
  this.title = notebooks.title;
  
  
};

notebooks.create = (newnotebooks, result) => {
  sql.query("INSERT INTO notebooks SET ?", newnotebooks, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created notebook: ", { id: res.insertId, ...newnotebooks });
    result(null, { id: res.insertId, ...newnotebookss });
  });
};

notebooks.findById = (notebokID, result) => {
  sql.query(`SELECT * FROM notebooks WHERE id = ${notebokID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found notebooks: ", res[0]);
      result(null, res[0]);
      return;
    }

  
    result({ kind: "not_found" }, null);
  });
};

notebooks.getAll = result => {
  sql.query("SELECT * FROM notebooks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("notebooks: ", res);
    result(null, res);
  });
};

notebooks.updateById = (id, notebooks, result) => {
  sql.query(
    "UPDATE notebooks SET title = ? WHERE id = ?",
    [notebooks.title, , id],
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

      console.log("updated notebooks: ", { id: id, ...notebooks });
      result(null, { id: id, ...notebooks });
    }
  );
};

notebooks.remove = (id, result) => {
  sql.query("DELETE FROM notebooks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted notebooks with id: ", id);
    result(null, res);
  });
};

notebooks.removeAll = result => {
  sql.query("DELETE FROM notebooks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} notebooks`);
    result(null, res);
  });
};

module.exports = notebooks;
