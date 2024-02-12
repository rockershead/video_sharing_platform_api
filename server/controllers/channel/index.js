const { Router: router } = require("express");
const { create } = require("./create");
const { subscribe } = require("./subscribe");
const { list } = require("./list");
const { show } = require("./show");
const { update } = require("./update");

module.exports = () => {
  const api = router();

  api.post("/", create());
  api.get("/", list());
  api.get("/:channelId", show());
  api.put("/:channelId", update());
  api.post("/subscribe", subscribe());

  return api;
};
