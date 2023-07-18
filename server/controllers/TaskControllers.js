const TaskModel = require('../models/TaskModel');

//controller for getting the tasks
module.exports.getTasks = async (req, res) =>{
    const task = await TaskModel.find();
    res.send(task);
}

//conroller for saving the tasks 
module.exports.saveTasks = (req, res) =>{
    const {task} = req.body;

    TaskModel.create({task})
        .then(data => {
            console.log("Saved Successfully");
            res.status(201).send(data);
        })
        .catch(err =>{
            console.log(err);
            res.send({error: err, message: "Somethings went wrong!"})
        })
}

//controller for updating a task
module.exports.updateTask = (req, res) =>{
    const { id } = req.params;
    const {task} = req.body;

    TaskModel.findByIdAndUpdate(id, {task})
        .then(()=>{
            res.send("Updated Successfully!!");
        })
        .catch(err =>{
            console.log(err);
            res.send({error: err, message: "Somethings went wrong!"})
        })
}


//controller for Deletion of a task
module.exports.deleteTask = (req, res) =>{
    const {id} = req.params;

    TaskModel.findByIdAndDelete(id)
        .then(data => {
            console.log("Deleted Successfully");
            res.status(201).send(data);
        })
        .catch(err =>{
            console.log(err);
            res.send({error: err, message: "Somethings went wrong!"})
        })
}