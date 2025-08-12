const User = require("../models/user"); // Import the User model
// const { v4: uuidv4 } = require("uuid"); // for generating unique tokens
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

// Creats an email transporter (example using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});

const signupUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;// destructuring the req body

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate 4-digit verification code
  const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

  // Hash the code
  const hashedCode = await bcrypt.hash(verificationCode, 10);

  // Set expiry time (e.g., 10 minutes from now)
  const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  // Save user with hashed verification code
  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
    verificationCode: hashedCode,
    codeExpiresAt,
    verified: false,
  });

  // Save user to database
  await newUser.save();

  if (newUser) {
    // Send plain code in the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification Code",
      text: `Your verification code is: ${verificationCode}`, // use the actual code, not `code`
    });

    res.status(201).json({
      _id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      message:
        "User registered successfully. Check email for verification code.",
    });
    
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});




  // Verify email
  const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    console.log("Received verify request for email:", email, "with code:", code);

    const user = await User.findOne({ email });
    if (!email || !code) {
      return res.status(400).json({ message: 'Email and code are required' });
    }

    if (!user) {
       console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    const isCodeValid = await bcrypt.compare(code, user.verificationCode);

    if (!isCodeValid) {
      console.log("Invalid verification code");
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.verified = true;
    user.verificationCode = undefined;
    await user.save();

    console.log("User verified successfully");
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
     console.error("Error in verifyEmail:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};



   

//post/api/login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password" });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please sign up first." });
    }

    // Check if email is verified
    if (!user.verified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in." });
    }

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
     // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );


    // If all good
    res
      .status(200)
      .json({
        message: "Login successful",
        token, 
        user: { name: user.name, email: user.email },
      });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};



//Forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No user with this email found" });

    const code = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit code
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now


    const hashedCode = await bcrypt.hash(code, 10);

    user.resetCode = hashedCode;  // save hashed code
    user.resetCodeExpires = expiry;
    await user.save();
    console.log('User after saving resetCode:', user);


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      html: `<p>Hello ${user.name},</p>
             <p>Your password reset code is: <strong>${code}</strong></p>
             <p>This code will expire in 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Reset code sent to your email" });
  } catch (error) {
    res.status(500)
      .json({ message: "Failed to send reset code", error: error.message });
  }
};


//verifyreset code
const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      email,
      resetCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

     // Compare hashed code with entered code
    const isCodeValid = await bcrypt.compare(code, user.resetCode);
    if (!isCodeValid) {
      return res.status(400).json({ message: "Invalid code" });
    }

    res.status(200).json({ message: "Code verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Verification failed", error: error.message });
  }
};

//Setnewpassword aftercode
const setNewPasswordAfterCode = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetCode = undefined;
  user.resetCodeExpires = undefined;

  await user.save();
  return res.status(200).json({ message: "Password updated successfully" });
};



// Get user profile (JWT version)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -verificationToken -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to get profile", error: error.message });
  }
};


// Update user profile
// const updateProfile = async (req, res) => {
//   try {
//     const { email } = req.headers; // identify user
//     const { name, newEmail } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required in headers" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (name) user.name = name;
//     if (newEmail) user.email = newEmail;

//     await user.save();

//     res.status(200).json({ message: "Profile updated successfully", user });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to update profile", error: error.message });
//   }
// };

const updateProfile = async (req, res) => {
  try {
    // Get user ID from JWT decoded token (set by your authenticateJWT middleware)
    const userId = req.user.id; 

    // Extract new data from request body
    const { name, newEmail } = req.body;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (newEmail) user.email = newEmail;

    // Save changes
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

module.exports = {
  signupUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  verifyResetCode,
  setNewPasswordAfterCode,
  getProfile,
  updateProfile,
};
