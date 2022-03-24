const express = require('express');
// const { requireAuth } = require('express-openid-connect');

const userController = require('../controllers/userController');
const router = express.Router();

// GET all users 
router.get('/', userController.getUsers);

// GET a specific user
router.get('/:id', userController.getAUser);

// GET request to create a user
router.get('/create', userController.userCreateGet);

// POST request to create a user
router.post('/create', userController.userCreatePost);

// GET request to delete a user
router.get('/:id/delete', userController.userDeleteGet);

// POST request to delete a user
router.post('/:id/delete', userController.userDeletePost);

// GET request to update a user
router.get('/:id/update', userController.userUpdateGet);

// POST request to update a user
router.post('/:id/update', userController.userUpdatePost);

module.exports = router;