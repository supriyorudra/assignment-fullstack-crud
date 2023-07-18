const { Router } = require("express");
const { 
    getTasks,
    saveTasks,
    updateTask,
    deleteTask
 } = require("../controllers/TaskControllers");

const router = Router();

//Assigning routes for the relevant API paths

router.get('/get', getTasks);
router.post('/save', saveTasks);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

module.exports = router;