const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');

const { createTask } = require('../controllers/taskController');
const { getUserTasks } = require('../controllers/taskController');
const {updateTask} = require('../controllers/taskController');
const {deleteTask} = require('../controllers/taskController');
const {userDetails} = require('../controllers/admincontroller');
const {filterTasksByDate} = require('../controllers/admincontroller');



// POST /api/tasks — create new task
router.post('/',authenticateJWT, createTask);
router.get('/get-user-tasks',authenticateJWT, getUserTasks);
router.delete('/delete-task/:id', authenticateJWT, deleteTask);
router.put('/update-task/:id', authenticateJWT, updateTask);
router.get('/user-details/:id', userDetails);
router.get('/filter-by-date/:id', filterTasksByDate);


module.exports = router;
