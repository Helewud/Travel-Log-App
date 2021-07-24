const LogEntry = require("../models /LogEntry");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// cloudinary confiq
const cloudiaryConfig = () => {
  return cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
};

exports.postLog = async (req, res) => {
  // initailizing cloudinary config function
  cloudiaryConfig();

  // cloudinary stream upload method
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        { quality: 50 },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      //   converting image buffer to streamm
      return streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  // save location details to the database
  async function upload(req) {
    const result = await streamUpload(req);
    req.body.image = result.secure_url;
    const logEntry = new LogEntry(req.body);
    const logger = await logEntry.save({
      new: true,
    });
    res.send(logger);
  }

  upload(req);
};

exports.getLog = async (req, res) => {
  const logs = await LogEntry.find();
  res.json(logs);
};
