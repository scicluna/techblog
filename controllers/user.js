const router = require('express').Router();
const authUser = require('../utils/auth')

router.get('/:user', authUser, async(req, res) => {
    res.render('dashboard', {loggedIn: req.session.loggedIn, user: req.session.user})
})

module.exports = router