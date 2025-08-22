const mongoose = require('mongoose');  // Import mongoose so we can define a schema

// Step 1: Create a schema (structure of the user data)
const userSchema = new mongoose.Schema({
  fullName: {
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
  phone: { 
    type: String
  },    // new field
  address: {
     type: String
   },       // new field
  city: { 
    type: String 
  },
 // NEW fields for email verification
 verificationCode: {
  type: String,
},
codeExpiresAt: { type: Date }, // <-- ADD THIS

  verified: {
    type: Boolean,
    default: false,        // user is not verified by default
  },
  resetCode: {
  type: String,
},
resetCodeExpires: {
  type: Date,
},
refreshToken: { type: String }


 });

// Step 2: Create a model from the schema
const User = mongoose.model('User', userSchema);

// Step 3: Export the model so we can use it in other files
module.exports = User;
