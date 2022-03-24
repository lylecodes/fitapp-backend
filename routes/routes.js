const express = require("express");
// const { requireAuth } = require('express-openid-connect');
const routesController = require("../controllers/routesController");
const router = express.Router();

// GET home page
router.get("/", routesController.home);

module.exports = router;
