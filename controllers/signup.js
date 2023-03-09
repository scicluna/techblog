const router = require('express').Router();

//handles our signup page render
router.get('/', async(req, res) => {
    if (req.session.loggedIn) return res.redirect('/')
    res.render('signup')
})

module.exports = router