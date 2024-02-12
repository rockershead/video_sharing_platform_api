const { Channel, User } = require("../../models");

const update = () => async (req, res, next) => {
  const { channelId } = req.params;
  const { name, description, subscriptionPrice, owner } = req.body;
  const decodedToken = res.locals.result;
  const owner_email = decodedToken["email"];
  const user = await User.findOne({ email: owner_email });
  const createdChannels = user.createdChannels;
  const channel = await Channel.findOne({ _id: channelId });

  if (!channel) {
    res.status(400).send("Channel does not exist");
  }
  if (name || description || subscriptionPrice || owner) {
    if (createdChannels.includes(channelId)) {
      const result = await Channel.updateOne({ _id: channelId }, req.body);
      res.status(200).send(result);
    } else {
      res.status(400).send("Not authorized to edit this channel");
    }
  } else {
    res.status(400).send("Not allowed to update any of the other fields");
  }
};

module.exports = { update };
