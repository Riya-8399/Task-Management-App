const User = require('../models/user'); // Import the User model
const { v4: uuidv4 } = require('uuid'); // for generating unique tokens
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');




// Setup email transporter (example using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      // your email address
    pass: process.env.EMAIL_PASS,      // your email password or app password
  },
});

  const signupUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
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
  subject: 'Email Verification Code',
  text: `Your verification code is: ${verificationCode}`, // use the actual code, not `code`
});


    res.status(201).json({
      _id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      message: 'User registered successfully. Check email for verification code.',
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Verify email
const verifyEmail = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

   if (user.codeExpiresAt && user.codeExpiresAt < new Date()) {
    res.status(400);
    throw new Error('Verification code has expired');
  }

  const isMatch = await bcrypt.compare(code, user.verificationCode);
  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid verification code');
  }

  user.verified = true;
  user.verificationCode = undefined;
   user.codeExpiresAt = undefined; // Clear after verification
  await user.save();

  res.status(200).json({ message: 'Email verified successfully' });
});

   
        



//post/api/login


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter email and password' });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up first.' });
    }

    // Check if email is verified
    if (!user.verified) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    // Check password match
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
}
 // If all good
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user with this email found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

   const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;


    // ✅ LOGGING FOR DEBUGGING:
    console.log(`🔐 Forgot password requested for: ${email}`);
    console.log(`✅ Reset URL: ${resetUrl}`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Task Manager: Password Reset Request',
      html: `<p>Hello ${user.name},</p>
             <p>You requested a password reset. Click below to reset:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>This link expires in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reset password link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send reset link', error: error.message });
  }
};



const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    // Validate inputs
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    // Find the user with matching token and valid expiry time
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // check if token not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and remove the token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: 'Password reset failed', error: error.message });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const { email } = req.headers;  // or req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required in headers' });
    }

    const user = await User.findOne({ email }).select('-password -verificationToken -resetPasswordToken -resetPasswordExpires');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get profile', error: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { email } = req.headers;  // identify user
    const { name, newEmail } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required in headers' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (newEmail) user.email = newEmail;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};



module.exports = { signupUser, verifyEmail, loginUser, forgotPassword,resetPassword, getProfile, updateProfile} ;


