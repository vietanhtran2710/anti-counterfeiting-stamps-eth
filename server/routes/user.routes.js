module.exports = app => {
  const user = require("../controllers/user.controller.js");
  const auth = require("../controllers/auth.controller.js")

  var router = require("express").Router();

  // Create a new User
  router.post("/", user.create);

  //Sign in
  router.post("/login", auth.signIn)

  // Retrieve all users
  router.get("/", user.findAll);

  // Retrieve all unverified users
  router.get("/unverified", user.findUnverified);

  // Retrieve a single user
  router.get("/address/:address", user.findOne)

  // Retrieve user nonce
  router.get("/nonce/:address", user.getNonce)

  // Retrieve users with a certain role
  router.get("/role/:role", user.findByRole)

  // Edit an user with address
  router.put("/:address", user.edit)

  //Delete an user with address
  router.delete("/:address", user.delete);

  app.use('/api/user', router);
};
