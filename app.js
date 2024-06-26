require('dotenv').config()

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// importing all routes
const TaskRoutes = require("./routes/Tasks");
const connectDB = require("./connect");

// middleware
const NotFound = require("./middleware/404");
const errorHandlingMiddleware = require("./middleware/errorHandling");

const MONGODBSTRING = process.env.MONGODB_STRING;

// connectiong to database
const DBstart = async () => {
  try {
    await connectDB(MONGODBSTRING);
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to database and listening to port: ${process.env.PORT}`
      );
    });
  } catch (err) {
    console.log(err);
  }
};

DBstart();

// middleWare
app.use(express.static("./public"));
app.use(express.json());



// apis
app.use("/api/v1/tasks", TaskRoutes);
app.use("/api/v1/tasks/:id", TaskRoutes);

// error handling middleware
app.use(NotFound);
app.use(errorHandlingMiddleware);




// Rest api
// representational state structure