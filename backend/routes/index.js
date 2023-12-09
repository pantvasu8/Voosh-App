const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.post('/add-user', userController.userSignup);
router.post('/login-user', userController.userLogin);
router.post('/add-order', verifyToken, userController.addOrder);
router.get('/get-order', verifyToken, userController.getOrder);

module.exports = router;
