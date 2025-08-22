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
    enum: ['low', 'medium', 'high'], // restrict values
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
}, { timestamps: true }); // automatically add createdAt and updatedAt

module.exports = mongoose.model('Task', taskSchema);
