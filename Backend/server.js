const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const allowedOrigins = [
  "http://localhost:3000",        // Local dev frontend
  "http://riya-fullstack-frontend.s3-website.ca-central-1.amazonaws.com/signup"
  // "https://your-production-url.com" // Production frontend

];

const app = express();

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // IMPORTANT: allows cookies/JWT
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// const app = express();
// // app.use(cors()); // <-- allows frontend to talk to backend
// app.use(
//   cors({
//     origin: "http://localhost:3000", // your frontend origin
//      credentials: true,     
//     //// origin: "*",
//     //// methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//    // // allowedHeaders: ["Content-Type", "Authorization"],
//    // // credentials: false,          // allows sending cookies
//   })
// );
const cookieParser = require('cookie-parser');
// Middleware to parse JSON and URL-encoded data

// other middlewares
app.use(express.json());
app.use(cookieParser());  // <-- parses cookies from the request headers





require('dotenv').config(); //Makes hidden variables accessible in your code using process.env.VARIABLE_NAME.

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const settingRoutes = require('./routes/settingRoutes');

// Middleware
app.use(express.json()); // middleware to parse JSON body
app.use('/api', authRoutes); // all auth routes start with /api
app.use('/api/tasks', taskRoutes); // all task routes start with /api/tasks
app.use('/api/settings', settingRoutes); // all settings routes start with /api/settings

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


