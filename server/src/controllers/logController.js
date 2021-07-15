const multer = require("multer");
const path = require("path");
const LogEntry = require("../models /LogEntry");

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, next) => {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed" }, false);
    }
  },
};

exports.upload = multer(multerOptions).single("image");

exports.postLog = async (req, res) => {
  const logEntry = new LogEntry(req.body);

  const logger = await logEntry.save({
    new: true,
  });

  res.json(logger);
};

exports.getLog = async (req, res) => {
  const logs = await LogEntry.find();
  res.json(logs);
};
