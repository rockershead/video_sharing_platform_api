const { User, Channel } = require("../../models");

const { SUBSCRIPTION_TIER } = require("../../../library/Constants");

//TODOS check based on subsription tier also.

const create = () => async (req, res, next) => {
  const { path, description, channelId } = req.body;
  const decodedToken = res.locals.result;
  const email = decodedToken["email"];
  const user = await User.findOne({ email: email });
  const createdChannels = user.createdChannels;
  const channel = await Channel.findOne({ _id: channelId });
  if (!channel) {
    res.status(400).send("Channel Id not found");
    return;
  }

  if (createdChannels.includes(channelId)) {
    const videos = channel.videos;

    videos.push({
      path: path,
      dateCreated: new Date(),
      description: description,
    });
    channel.videos = videos;
    await channel.save();
    res.status(200).send("Video added to channel");
  } else {
    res.status(400).send("Not authorised to upload videos for this channel");
  }
};

module.exports = { create };
