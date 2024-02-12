const { Channel } = require("../../models");

const show = () => async (req, res, next) => {
  const { channelId } = req.params;

  const channel = await Channel.findOne({ _id: channelId });
  if (channel) {
    res.status(200).send(channel);
  } else {
    res.status(400).send("This channel does not exist");
  }
};

module.exports = { show };
