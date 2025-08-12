const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // trims whitespace
  },
  description: {
    type: String,
    default: '',
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'], // restrict values
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
}, { timestamps: true }); // automatically add createdAt and updatedAt

module.exports = mongoose.model('Task', taskSchema);
