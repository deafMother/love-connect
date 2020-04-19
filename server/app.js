const express = require("express");
const cors = require("cors");

const globalErrorHandler = require("./utils/ErrorHandler");
const AppError = require("./utils/AppError");
const userRouter = require("./routes/userRoute");

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + "/public"));

if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    //console.log(req.headers);
    next();
  });
}

// routes
app.use("/user", userRouter);

// default undefined routes
app.all("*", (req, res, next) => {
  next(new AppError("This route is not defined", 404));
});

app.use(globalErrorHandler);

module.exports = app;
