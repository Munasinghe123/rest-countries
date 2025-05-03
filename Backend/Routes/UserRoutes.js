const{login,register, logout,checkToken} = require('../Controllers/UserController');
const verifyToken = require('../Middleware/verifyRole');
const verifyRole = require('../Middleware/verifyRole');
const photo = require('../Middleware/multerConfig');
const express = require('express');

const router = express.Router();

router.post('/register',photo,register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/checktoken',checkToken);

module.exports = router;
