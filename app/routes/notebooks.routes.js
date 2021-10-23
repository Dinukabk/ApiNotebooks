module.exports = app => {
  const notebooks = require("../controllers/notebooks.controller.js");

  
  app.post("/notebooks", notebooks.create);


  app.get("/notebooks", notebooks.findAll);

  
  app.get("/notebooks/:notebookId", notebooks.findOne);

  
  app.put("/notebooks/:notebookId", notebooks.update);

  
  app.delete("/notebooks/:notebookId", notebooks.delete);

  
  app.delete("/notebooks", notebooks.deleteAll);
};
