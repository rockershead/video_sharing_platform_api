const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const Video = new mongoose.Schema({
  path: { type: String, required: true }, //s3 path
  dateCreated: { type: Date, required: true },
  description: { type: String, required: true },
});

const Channel = {
  name: "Channel",
  define: {
    _id: { type: String, require: true, default: uuid },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    subscribers: {
      type: Array, //array of subscriber userIds
      required: false,
      default: [],
    },
    subscriptionPrice: {
      type: Number,
      required: true,
    },
    videos: {
      type: [Video],
      required: false,
      default: [],
    },

    deletedAt: { type: Date, select: false },
  },
  options: {
    autoCreate: false,
    timestamps: true,
  },
};

const schema = mongoose.Schema(Channel.define, Channel.options);

// this function helps to ignore deleted documents
//setPreIgnoreDeletedDocuments(schema);

module.exports = mongoose.model(Channel.name, schema);
