const express = require("express");
const router = express.Router();
const joiValidate = require("../middlewares/joiValidation");
const logController = require("../controllers/logController");
const { catchErrors } = require("../middlewares/errorHandler");
const multer = require("multer");

router.get("/api/logs", catchErrors(logController.getLog));

router.post(
  "/api/logs",
  multer().single("image"),
  joiValidate,
  catchErrors(logController.postLog)
);

module.exports = router;
