const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const tourRouter = require("./routes/tourRoutes");
const app = express();

// MIDDLEWARES
if(process.env.NODE_ENV === 'development'){
  app.use(morgan("tiny"));
}
app.use(express.static(`${__dirname}/public`)); //this is how we serve static files
app.use(express.json());
app.use("/api/v1/users", userRouter); //these both are also middlewares
app.use("/api/v1/tours", tourRouter);

module.exports = app;
