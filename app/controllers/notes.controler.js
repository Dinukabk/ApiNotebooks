const notebooks = require("../models/notes.model.js");


exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const notes = new notes({
    title: req.body.title
    
  });

  
  notes.create(notes, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the notes."
      });
    else res.send(data);
  });
};


exports.findAll = (req, res) => {
    notes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notes."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
    notes.findById(req.params.noteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found notes with id ${req.params.noteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving notes with id " + req.params.noteId
        });
      }
    } else res.send(data);
  });
};


exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  notes.updateById(
    req.params.noteId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found notes with id ${req.params.noteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating notebook with id " + req.params.noteId
          });
        }
      } else res.send(data);
    }
  );
};


exports.delete = (req, res) => {
  notes.remove(req.params.noteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found notebooks with id ${req.params.noteId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete notebooks with id " + req.params.notebookId
        });
      }
    } else res.send({ message: `notebooks was deleted successfully!` });
  });
};


exports.deleteAll = (req, res) => {
    notes.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all notes."
      });
    else res.send({ message: `All notes were deleted successfully!` });
  });
};
