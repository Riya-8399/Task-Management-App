const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
app.use(cors()); // <-- allows frontend to talk to backend
const cookieParser = require('cookie-parser');
// Middleware to parse JSON and URL-encoded data

// other middlewares
app.use(express.json());
app.use(cookieParser());  // <-- parses cookies from the request headers



require('dotenv').config(); //Makes hidden variables accessible in your code using process.env.VARIABLE_NAME.

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
    // app.listen(PORT, () => {
    //   console.log(`🚀 Server is running on port ${PORT}`);
    // });
    app.listen(5000, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });


