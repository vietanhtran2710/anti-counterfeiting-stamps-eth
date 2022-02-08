module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all users
    router.get("/", user.findAll);

    // Retrieve users with a certain role
    router.get("/role/:role", user.findByRole)
  
    //Delete an user with address
    router.delete("/:address", user.delete);
  
    app.use('/api/user', router);
  };
  