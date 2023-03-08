const router = require('express').Router();
const userLogin = require('./userLogin')

router.use('/user', userLogin)

module.exports = router;
