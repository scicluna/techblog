const router = require('express').Router();
const homePage = require('./home')
const dashBoard = require('./user')
const signUp = require('./signup')
const logIn = require('./login')
const api = require('./api/index')
const newPost = require('./newpost')
const comment = require('./comment')

router.use('/comment', comment)
router.use('/newPost', newPost)
router.use('/api', api)
router.use('/login', logIn)
router.use('/signup', signUp)
router.use('/user', dashBoard)
router.use('/', homePage)

module.exports = router;
