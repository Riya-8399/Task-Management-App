const Task = require('../models/Task');
const mongoose = require('mongoose');
// Create a new task
exports.createTask = async (req, res) => {
  try {
    let { title, description, dueDate, priority, status } = req.body;
    const { id, email } = req.user;
    // id = "68769ed0185353591d2582dc" 
    status = status.toLowerCase();
    priority = priority.toLowerCase();
    

    console.log('Creating task with data:', req.body);

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({
      title: title,
      description,
      dueDate,
      userId: id, // associate task with user
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


// get user task
exports.getUserTasks = async (req, res) => {
  try {
    const { id, email } = req.user;   // extracting id (userId) and not database ID  and email from token decode happening in middleware
    console.log('Fetching tasks for user:', id, email);

    // Now we want to find tasks associated with this userId
    const results =  await Task.find({userId : id}); 
    console.log('Tasks found:', results);  
    res.status(200).json({ tasks: results });

} catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};