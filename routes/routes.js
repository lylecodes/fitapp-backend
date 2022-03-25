const express = require('express');
// const { requireAuth } = require('express-openid-connect');
const routesController = require('../controllers/routesController');
const authController = require('../controllers/authController');
const router = express.Router();

// GET home page 
router.get('/', routesController.home);

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.get('/private', authController.isAuth);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});


module.exports = router;
