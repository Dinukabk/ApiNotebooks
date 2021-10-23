const notebooks = require("../models/notebooks.model.js");


exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const notebooks = new notebooks({
    title: req.body.title
    
  });

  
  notebooks.create(notebooks, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the notebooks."
      });
    else res.send(data);
  });
};


exports.findAll = (req, res) => {
  notebooks.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notebooks."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  notebooks.findById(req.params.notebookId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found notebooks with id ${req.params.notebookId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving notebooks with id " + req.params.notebookId
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

  notebooks.updateById(
    req.params.notebookId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found notebook with id ${req.params.notebookId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating notebook with id " + req.params.notebookId
          });
        }
      } else res.send(data);
    }
  );
};


exports.delete = (req, res) => {
  notebooks.remove(req.params.notebookId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found notebooks with id ${req.params.notebookId}.`
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
  notebooks.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all notebooks."
      });
    else res.send({ message: `All notebooks were deleted successfully!` });
  });
};
