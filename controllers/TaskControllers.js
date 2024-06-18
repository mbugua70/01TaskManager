const TaskModal = require("../models/TasksModel");

const getAllTasks = async (req, res) => {
  try {
    const task = await TaskModal.find({});
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createTasks = async (req, res) => {
  const { name, completed } = req.body;

  try {
    const task = await TaskModal.create({ name, completed });
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getSingleTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await TaskModal.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task found with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
  const { name, completed } = req.body;
  try {
    const updatedValue = await TaskModal.findOneAndUpdate(
      {
        _id: taskID,
      },
      {
        name,
        completed,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedValue) {
      res.status(404).json({ msg: `No task was found with ID: ${taskID}` });
    }

    res.status(200).json({ data: updatedValue });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const deletedTask = await TaskModal.findOneAndDelete({ _id: taskID });
    if (!deletedTask) {
      return res.status(404).json({ msg: `No task found with ID: ${taskID}` });
    }
    res.status(200).json({ task: null, msg: `Success` });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// exporting controllers

module.exports = {
  getAllTasks,
  getSingleTask,
  createTasks,
  deleteTask,
  updateTask,
};
