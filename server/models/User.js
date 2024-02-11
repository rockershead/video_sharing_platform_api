const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const User = {
  name: "User",
  define: {
    _id: { type: String, require: true, default: uuid },
    email: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },
    subscribedChannels: {
      type: Array, //array of channelIds
      required: false,
      default: [],
    },
    createdChannels: {
      type: Array, //array of channelIds
      required: false,
      default: [],
    },
    subscriptionTier: {
      //for video creators they can choose free tier or paid ones(starter,standard,advanced)
      type: String,
      required: false,
      default: null,
    },
    confirmationStatus: {
      type: Boolean,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },

    deletedAt: { type: Date, select: false },
  },
  options: {
    autoCreate: false,
    timestamps: true,
  },
};

const schema = mongoose.Schema(User.define, User.options);

// this function helps to ignore deleted documents
//setPreIgnoreDeletedDocuments(schema);

module.exports = mongoose.model(User.name, schema);
