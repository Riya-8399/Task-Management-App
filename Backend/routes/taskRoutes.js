const express = require('express');
const router = express.Router();

const { createTask } = require('../controllers/taskController');

// POST /api/tasks — create new task
router.post('/', createTask);

module.exports = router;
