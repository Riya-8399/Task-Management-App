const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
app.use(cors()); // <-- allows frontend to talk to backend


require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Middleware
app.use(express.json()); // middleware to parse JSON body
app.use('/api', authRoutes); // all auth routes start with /api
app.use('/api/tasks', taskRoutes); // all task routes start with /api/tasks
// Test route
app.get('/', (req, res) => {
  res.send('Hello World! Task Manager Backend is running');
  
});
const PORT = process.env.PORT || 5000;


mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
   })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });


