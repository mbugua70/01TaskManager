require('dotenv').config()

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// importing all routes
const TaskRoutes = require("./routes/Tasks");
const connectDB = require("./connect");

const MONGODBSTRING = process.env.MONGODB_STRING;

// connectiong to database
const DBstart = async () => {
    try{
        await connectDB(MONGODBSTRING);
        app.listen(process.env.PORT, () => {
            console.log(`Connected to database and listening to port: ${process.env.PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}

DBstart();


// middleWare
app.use(express.json());


// apis
app.use("/api/v1/tasks", TaskRoutes);
app.use("/api/v1/tasks/:id", TaskRoutes);




// Rest api
// representational state structure