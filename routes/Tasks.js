const express = require('express');

const router = express.Router();

// import controllers

const {getAllTasks, createTasks, getSingleTask, updateTask, deleteTask} = require("../controllers/TaskControllers");


router.route("/").get(getAllTasks).post(createTasks);

// single task
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

// exporting all routers

module.exports = router;