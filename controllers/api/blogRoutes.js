const router = require('express').Router()
const {User, Post, Comment} = require('../../models')

router.post('/newpost', async(req, res) => {
    try{
    const {title, body} = req.body

    const postData = await Post.create({post_title:title, post_body:body, user_id:req.session.user.id})
    if (!postData) return res.status(400).json("Not Posted")

    res.status(200).json("Posted")

    } catch (err){res.status(500).json(err)}
})

router.post('/newcomment', async(req, res) => {
    try{
    const {body, postId} = req.body

    const postData = await Comment.create({comment_body:body, post_id: postId, user_id:req.session.user.id})
    if (!postData) return res.status(400).json("Not Commented")

    res.status(200).json("Commented")

    } catch (err){res.status(500).json(err)}
})









module.exports = router;
