const router = require('express').Router();
const authUser = require('../utils/auth')
const {Post, User} = require('../models')

router.get('/', authUser, async(req, res) => {
    res.redirect(`/user/${req.session.user.user_name}`)
})

router.get('/:user', authUser, async(req, res) => {
    if (req.params.user != req.session.user.user_name) return res.redirect('/')

    const posts = await Post.findAll({include:User, where: {user_id : req.session.user.id},  order: [["createdAt", "DESC"]]})
    const blogPosts = posts.map(post=>post.get({plain:true}))

    res.render('dashboard', {blogPosts, loggedIn: req.session.loggedIn, user: req.session.user})
})

module.exports = router