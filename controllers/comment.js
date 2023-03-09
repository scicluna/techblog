const router = require('express').Router();
const authUser = require('../utils/auth')
const {Post, User, Comment} = require('../models')

router.get('/:id', authUser, async(req, res) => {

    const postId = req.params.id
    const postData = await Post.findOne({include:User, where: {id : postId}} )
    const plainPostData = postData.get({plain:true})

    const commentData = await Comment.findAll({include: User, where: {post_id : postId},  order: [["createdAt", "DESC"]]})
    const plainCommentData = commentData.map(comment=>comment.get({plain:true}))

    console.log(plainCommentData)

    res.render('comment', {plainPostData, plainCommentData, loggedIn: req.session.loggedIn, user: req.session.user})
})

module.exports = router