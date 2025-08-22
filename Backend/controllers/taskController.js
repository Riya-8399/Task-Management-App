const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    let { title, description, dueDate, priority, status } = req.body;
    status = status.toLowerCase();
    priority = priority.toLowerCase();
    

    console.log('Creating task with data:', req.body);

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
    });

    const savedTask = await task.save();

    res.status(201).json({ message: 'Task created successfully', task: savedTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
