const User = require('../models/user'); // Import the User model
const { v4: uuidv4 } = require('uuid'); // for generating unique tokens
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');



// Setup email transporter (example using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      // your email address
    pass: process.env.EMAIL_PASS,      // your email password or app password
  },
});


// POST /api/signup
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

       
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

 // Generate a verification token
    const verificationToken = uuidv4();

        // Create new user with verification token and verified=false
   const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds
    const newUser = new User({
     name,
     email,
     password: hashedPassword,
     verified: false,
     verificationToken,
});

    await newUser.save();

    // Send verification email
   const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from:`"Task Manager" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your email for Task Manager App',
     html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <p>Hi ${name},</p>
      <p>Thank you for signing up for <strong>Task Manager App</strong>.</p>
      <p>To complete your registration, please click the button below to verify your email:</p>
      <p>
        <a href="${verificationUrl}" 
           style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
           Verify Email
        </a>
      </p>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
      <p>Thanks,<br/>Task Manager Team</p>
    </div>
  `,
};

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User created successfully. Please verify your email.' });
  } catch (error) {
       
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    console.log('Token received for verification:', token);  // <---- Add here

    if (!token) {
      return res.status(400).json({ message: 'Verification token is missing' });
    }

    const user = await User.findOne({ verificationToken: token.trim() });

    console.log('User found for token:', user);  // <---- Add here

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    if (user.verified) {
      return res.status(200).json({ message: 'Email already verified!' });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({ message: 'Email verified successfully! You can now login.' });
  } catch (error) {
    return res.status(500).json({ message: 'Email verification failed', error: error.message });
  }
};





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


// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'No user with this email found' });
//     }

//     // Generate secure random token
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const resetTokenExpiry = Date.now() + 3600000; // 1 hour

//     // Save token and expiry in user doc
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = resetTokenExpiry;
//     await user.save();

//     // Email with reset link
//     const resetUrl = `http://localhost:5000/api/reset-password?token=${resetToken}`;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Task Manager: Password Reset Request',
//       html: `<p>Hello ${user.name},</p>
//              <p>You requested a password reset. Click below to reset:</p>
//              <a href="${resetUrl}">${resetUrl}</a>
//              <p>This link expires in 1 hour.</p>`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: 'Reset password link sent to your email' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to send reset link', error: error.message });
//   }
// };

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


