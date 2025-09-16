const express = require('express');
const router = express.Router();
const authenticateJWT  = require("../middleware/authenticateJWT");
const { signupUser, verifyEmail, loginUser, forgotPassword, verifyResetCode, setNewPasswordAfterCode,  getProfile, updateProfile, refreshToken, logoutUser  } = require('../controllers/authcontroller');



router.post('/signup', signupUser);
router.post('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
// Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyResetCode);
router.post('/set-new-password', setNewPasswordAfterCode);
// Protected routes (JWT required)
router.get('/profile', authenticateJWT, getProfile);
router.put('/update-profile', authenticateJWT, updateProfile)
router.post('/logout',  logoutUser);

module.exports = router;
