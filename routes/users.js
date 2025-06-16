const express = require('express');

const { handleUserSignup} = require('../controllers/users');

const router = express.Router();

router.post('/', handleUserSignup);


module.exports = router;