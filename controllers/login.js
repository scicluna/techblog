const router = require('express').Router();

//handles login screen rendering
router.get('/', async(req, res) => {
    if (req.session.loggedIn) return res.redirect('/')
    res.render('login')
})

module.exports = router