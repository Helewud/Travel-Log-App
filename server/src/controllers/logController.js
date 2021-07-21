const LogEntry = require("../models /LogEntry");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const cld = () => {
  return cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
};

exports.postLog = async (req, res) => {
  cld();

  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      return streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    const result = await streamUpload(req);
    req.body.image = result.secure_url;
    const logEntry = new LogEntry(req.body);
    const logger = await logEntry.save({
      new: true,
    });
    res.json(logger);
  }

  upload(req);
};

exports.getLog = async (req, res) => {
  const logs = await LogEntry.find();
  res.json(logs);
};
