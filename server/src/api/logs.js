const express = require("express");
const router = express.Router();
const joiValidate = require("../middlewares/joiValidation");
const logController = require("../controllers/logController");
const { catchErrors } = require("../middlewares/errorHandler");

router.get("/api/logs", catchErrors(logController.getLog));

router.post("/api/logs", joiValidate, catchErrors(logController.postLog));

module.exports = router;
