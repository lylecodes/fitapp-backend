const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const homeRouter = require("./routes/routes");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

require("dotenv").config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50000000000000mb" }));
app.use(cors());
app.use("/", homeRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(console.log("Mongo connected"))
  .catch((err) => console.error(err));
