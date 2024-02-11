const { Router: router } = require("express");
const { create } = require("./create");
const { uploadVideo } = require("./uploadVideo");
const { list } = require("./list");
const multer = require("multer");
const upload = multer({
  limits: { files: 1 },
});

module.exports = () => {
  const api = router();

  api.post("/", create());
  api.post("/uploadVideo", upload.single("video"), uploadVideo());
  api.get("/:channelId", list());

  return api;
};
