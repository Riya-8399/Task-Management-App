const express = require('express');
const router = express.Router();
const { signupUser, verifyEmail, loginUser, forgotPassword, verifyResetCode, setNewPasswordAfterCode,  getProfile, updateProfile  } = require('../controllers/authcontroller');



router.post('/signup', signupUser);
router.post('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyResetCode);
router.post('/set-new-password', setNewPasswordAfterCode);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);





module.exports = router;
