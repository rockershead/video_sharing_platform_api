const express = require("express");

const { errorHandler, permissionHandler } = require("../middleware");

// List all controllers here

//const users = require("../controllers/users");
const channel = require("../controllers/channel");
const auth = require("../controllers/auth");
const video = require("../controllers/video");

const routersInit = (config) => {
  const router = express();

  router.use("/auth", auth());

  router.use(permissionHandler);
  router.use("/channels", channel());
  router.use("/videos", video());
  // Define API Endpoints
  //router.use("/users", users());

  // Catch all API Errors
  router.use(errorHandler);
  return router;
};

module.exports = routersInit;
