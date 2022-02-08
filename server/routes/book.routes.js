module.exports = app => {
    const book = require("../controllers/book.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", book.create);
  
    // Retrieve all users
    router.get("/", book.findAll);

    // Retrieve a single book with a serial Number
    router.get("/:serialNumber", book.findBySerialNumber)
  
    //Delete an user with serial Number
    router.delete("/:serialNumber", book.delete);
  
    app.use('/api/book', router);
  };
  