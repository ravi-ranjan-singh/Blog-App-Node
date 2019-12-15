const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.post('/forgetPassword', authController.forgetPassword);
router.post('/resetPassword/:token', authController.resetPassword);

router.patch('/updateMe', authController.protect, userController.updateMe);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

router.delete('/deleteMe', authController.protect, userController.deleteMe)

module.exports = router;
