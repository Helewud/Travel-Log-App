const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./src/config/.env" });

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error(error.message));

app.set("port", process.env.PORT || 8000);
const server = app.listen(app.get("port"), () =>
  console.log(`Listening at http://localhost:${server.address().port}`)
);
