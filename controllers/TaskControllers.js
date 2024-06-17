const getAllTasks =  (req,res ) => {
    res.send("all Tasks");
}

const createTasks = (req, res) => {
    res.send("Tasks created")
}

const getSingleTask = (req, res) => {
    res.send("Single Task");
}

const updateTask = (req, res) => {
    res.send("update task")
}

const deleteTask = (req, res) => {
    res.send("delete task");
}


// exporting controllers

module.exports = {
    getAllTasks,
    getSingleTask,
    createTasks,
    deleteTask,
    updateTask,

}