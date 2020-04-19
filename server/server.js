const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const socket = require("socket.io");

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 4000;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully");
    const server = app.listen(PORT, () => {
      console.log("Server running on port..." + PORT);
    });

    const io = socket(server);

    io.on("connection", function (socket) {
      socket.on("like", function (data) {
        socket.broadcast.emit("like", {
          message: "somenone liked your picture",
          forUser: data.likefor,
        });
      });
    });
  })
  .catch((err) => {
    console.log("Error in connection", err);
  });
