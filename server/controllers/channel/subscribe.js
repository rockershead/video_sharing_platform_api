const { Channel, User } = require("../../models");

//means user has already paid to subscribe to this channel
const subscribe = () => async (req, res, next) => {
  const { channelId } = req.body;
  const decodedToken = res.locals.result;
  const email = decodedToken["email"];

  const user = await User.findOne({ email: email });
  const channel = await Channel.findOne({ _id: channelId });

  try {
    const sc = user.subscribedChannels;
    sc.push(channelId);
    user.subscribedChannels = sc;
    user.save();

    const subscribers = channel.subscribers;
    subscribers.push(user._id);
    channel.subscribers = subscribers;
    await channel.save();

    res.status(200).send("User Subscription Done");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { subscribe };
