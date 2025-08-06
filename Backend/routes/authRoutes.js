const express = require('express');
const router = express.Router();
const authenticateJWT  = require("../middleware/authenticateJWT");
const { signupUser, verifyEmail, loginUser, forgotPassword, verifyResetCode, setNewPasswordAfterCode,  getProfile, updateProfile  } = require('../controllers/authcontroller');



router.post('/signup', signupUser);
router.post('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyResetCode);
router.post('/set-new-password', setNewPasswordAfterCode);
// Protected routes (JWT required)
router.get('/profile', authenticateJWT, getProfile);
router.put('/profile', authenticateJWT, updateProfile);

module.exports = router;
