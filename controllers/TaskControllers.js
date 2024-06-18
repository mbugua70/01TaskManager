const TaskModal = require("../models/TasksModel");
const asyncWrapper = require("../middleware/asyncWrapper");

const { customError } = require("../classError/error_class");

// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await TaskModal.find({});
//     res.status(200).json({ tasks });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// };

// const createTasks = async (req, res) => {
//   const { name, completed } = req.body;

//   try {
//     const task = await TaskModal.create({ name, completed });
//     res.status(201).json({ task });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// };

// const getSingleTask = async (req, res) => {
//   const { id: taskID } = req.params;
//   try {
//     const task = await TaskModal.findOne({ _id: taskID });

//     if (!task) {
//       return res.status(404).json({ msg: `No task found with id ${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// };

// const updateTask = async (req, res) => {
//   const { id: taskID } = req.params;
//   const { name, completed } = req.body;
//   try {
//     const task = await TaskModal.findOneAndUpdate(
//       {
//         _id: taskID,
//       },
//       {
//         name,
//         completed,
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!task) {
//       res.status(404).json({ msg: `No task was found with ID: ${taskID}` });
//     }

//     res.status(200).json({ task });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// };

// const deleteTask = async (req, res) => {
//   const { id: taskID } = req.params;
//   try {
//     const deletedTask = await TaskModal.findOneAndDelete({ _id: taskID });
//     if (!deletedTask) {
//       return res.status(404).json({ msg: `No task found with ID: ${taskID}` });
//     }
//     res.status(200).json({ task: null, msg: `Success` });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// };

// using asyncWrapper instead

// get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await TaskModal.find({});
  res.status(200).json({ tasks });
});

// create task
const createTasks = asyncWrapper(async (req, res) => {
  const { name, completed } = req.body;

  const task = await TaskModal.create({ name, completed });
  res.status(201).json({ task });
});

// get single task

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await TaskModal.findOne({ _id: taskID });

  if (!task) {
    return next(customError(`No task found with id ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task found with id ${taskID}` });
  }
  res.status(200).json({ task });
});

// update the task

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const { name, completed } = req.body;

  const task = await TaskModal.findOneAndUpdate(
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

  if (!task) {
    return next(customError(`No task found with id ${taskID}`, 404));
    // res.status(404).json({ msg: `No task was found with ID: ${taskID}` });
  }

  res.status(200).json({ task });
});

// delete task
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const deletedTask = await TaskModal.findOneAndDelete({ _id: taskID });
  if (!deletedTask) {
    return next(customError(`No task found with id ${taskID}`, 404))
    // return res.status(404).json({ msg: `No task found with ID: ${taskID}` });
  }
  res.status(200).json({ task: null, msg: `Success` });
});

// exporting controllers

module.exports = {
  getAllTasks,
  getSingleTask,
  createTasks,
  deleteTask,
  updateTask,
};
