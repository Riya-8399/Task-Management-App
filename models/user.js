const mongoose = require('mongoose');  // Import mongoose so we can define a schema

// Step 1: Create a schema (structure of the user data)
const userSchema = new mongoose.Schema({
  name: {
    type: String,             // name must be a string
    required: true,           // name is mandatory
    trim: true                // removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,             // each email must be different
    lowercase: true,          // convert email to lowercase
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6              // password must be at least 6 characters
  },

 // NEW fields for email verification
  verified: {
    type: Boolean,
    default: false,        // user is not verified by default
  },
  verificationToken: {
    type: String,
  },
resetPasswordToken: { 
    type: String
},
resetPasswordExpires: {
    type: Date
}
},
{
  timestamps: true            // this adds `createdAt` and `updatedAt` automatically
});

// Step 2: Create a model from the schema
const User = mongoose.model('User', userSchema);

// Step 3: Export the model so we can use it in other files
module.exports = User;
