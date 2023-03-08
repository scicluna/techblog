const router = require('express').Router();
const homePage = require('./home')
const dashBoard = require('./user')

router.use('/user', dashBoard)
router.use('/', homePage)

module.exports = router;
