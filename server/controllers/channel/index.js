const { Router: router } = require("express");
const { create } = require("./create");
const { subscribe } = require("./subscribe");

module.exports = () => {
  const api = router();

  api.post("/", create());
  api.post("/subscribe", subscribe());

  return api;
};
