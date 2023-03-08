const router = require('express').Router();
const homePage = require('./home')
const dashBoard = require('./user')
const signUp = require('./signup')
const logIn = require('./login')
const api = require('./api/index')

router.use('/api', api)
router.use('/login', logIn)
router.use('/signup', signUp)
router.use('/user', dashBoard)
router.use('/', homePage)

module.exports = router;
