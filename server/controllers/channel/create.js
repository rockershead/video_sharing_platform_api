const { Channel, User } = require("../../models");

const create = () => async (req, res, next) => {
  const { name, description, subscriptionPrice } = req.body;
  const decodedToken = res.locals.result;
  const owner_email = decodedToken["email"];

  //channelname must be unique
  const channelName = await Channel.findOne({ name: name });
  const user = await User.findOne({ email: owner_email });

  if (channelName) {
    res
      .status(400)
      .send("This name has been taken up.Please choose another name");
    return;
  }

  const channel = new Channel({
    owner: owner_email,
    description: description,
    subscriptionPrice: subscriptionPrice,
    name: name,
  });

  channel
    .save()
    .then(async (result) => {
      //update the createdChannels field in the user database
      const cc = user.createdChannels;
      cc.push(result._id);
      user.createdChannels = cc;
      await user.save();
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = { create };
