const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const logs = require("./api/logs");
const { notFound, errorHandle } = require("./middlewares/errorHandler");

const app = express();
global.rootPath = __dirname;

dotenv.config({ path: "./src/config/.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(morgan("common"));
app.use(helmet());

app.use("/", logs);

app.use(notFound);
app.use(errorHandle);

module.exports = app;
