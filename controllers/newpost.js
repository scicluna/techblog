const router = require('express').Router();
const authUser = require('../utils/auth')

router.get('/', authUser, async(req, res) => {
    res.render('newpost', {loggedIn: req.session.loggedIn, user: req.session.user})
})

module.exports = router