const LogEntry = require("../models /LogEntry");

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
