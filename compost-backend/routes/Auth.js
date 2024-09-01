const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
router.use('/',AuthController);

 
module.exports = router