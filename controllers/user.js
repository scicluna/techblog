const router = require('express').Router();
const authUser = require('../utils/auth')

router.get('/:user', authUser, async(req, res) => {
    res.render('homepage', {loggedIn: req.session.loggedIn, user: req.session.user})
})

module.exports = router