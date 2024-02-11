const { User, Channel } = require("../../models");
const { getFiles3Url } = require("../../utils");
//edit the search feature
const list = () => async (req, res, next) => {
  //list videos for that channel
  const { page, pageSize, search, ...otherParams } = req.query;
  const { channelId } = req.params;
  const skip = (page - 1) * pageSize;

  const decodedToken = res.locals.result;
  const email = decodedToken["email"];
  const role = decodedToken["custom:role"];
  const user = await User.findOne({ email: email });
  const createdChannels = user.createdChannels;
  const subscribedChannels = user.subscribedChannels;

  const channel = await Channel.findOne({ _id: channelId });
  if (!channel) {
    res.status(400).send("No such channel found");
    return;
  }

  const _query = {
    ...otherParams,
    _id: channelId,
  };
  //console.log(search);
  if (search) {
    const regex = new RegExp(search, "i");
    _query.$or = [{ description: regex }, { name: regex }];
  }

  try {
    if (
      role == "ADMIN" ||
      createdChannels.includes(channelId) ||
      subscribedChannels.includes(channelId)
    ) {
      const result = await Channel.findOne(_query)
        .skip(skip)
        .limit(pageSize)
        .lean()
        .exec(); //need lean and exec so that I am able to edit the objects in result
      //need to add in the signedUrl in

      let promises = result.videos.map(async (video) => {
        const files3Url = await getFiles3Url(
          video.path,
          process.env.AWS_S3_BUCKET
        );

        video.videoUrl = files3Url;
      });
      await Promise.all(promises);

      res.status(200).send(result);
    } else {
      res
        .status(400)
        .send("You are not authorised to view videos from this channel");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { list };
