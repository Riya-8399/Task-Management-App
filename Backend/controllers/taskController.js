const Task = require('../models/Task');
const mongoose = require('mongoose');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    let { title, description, dueDate, priority, status } = req.body;
    const { id } = req.user;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Ensure valid status and priority
    priority = (priority || 'medium').toLowerCase();
    if (!['low', 'medium', 'high'].includes(priority)) priority = 'medium';

    status = (status || 'pending').toLowerCase();
    if (!['pending', 'completed'].includes(status)) status = 'pending';

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      userId: id
    });

    const savedTask = await task.save();

    res.status(201).json({ message: 'Task created successfully', task: savedTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user tasks
exports.getUserTasks = async (req, res) => {
  try {
    const { id } = req.user;

    const results = await Task.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' },
      { $match: { userId: new mongoose.Types.ObjectId(id) } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          dueDate: 1,
          priority: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          email: '$userDetails.email',
          fullName: '$userDetails.fullName'
        }
      }
    ]);

    res.status(200).json({ tasks: results });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, status } = req.body;

    // Validate priority and status if present
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (dueDate) updateData.dueDate = dueDate;
    if (priority) {
      const p = priority.toLowerCase();
      updateData.priority = ['low', 'medium', 'high'].includes(p) ? p : 'medium';
    }
    if (status) {
      const s = status.toLowerCase();
      updateData.status = ['pending', 'completed'].includes(s) ? s : 'pending';
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


   


