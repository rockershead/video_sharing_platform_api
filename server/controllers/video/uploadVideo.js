const { uploadFile } = require("../../utils");

const uploadVideo = () => async (req, res, next) => {
  const { mimetype, originalname, buffer } = req.file;

  const decodedToken = res.locals.result;

  const path = `videos/${originalname}`;

  await uploadFile(path, process.env.AWS_S3_BUCKET, buffer);
  //no use the signedUrl max expiry time is 7 days
  //res.status(200).send({ path: path, signedUrl: signedUrl });
  res.status(200).send({ path: path });
};

module.exports = { uploadVideo };
