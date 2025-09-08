const express = require('express');
const router = express.Router();

const { createTask } = require('../controllers/taskController');
const { getUserTasks } = require('../controllers/taskController');
const authenticateJWT = require('../middleware/authenticateJWT');

// POST /api/tasks — create new task
router.post('/',authenticateJWT, createTask);
router.get('/get-user-tasks',authenticateJWT, getUserTasks);

module.exports = router;
