const router = require('express').Router()
const {User, Post, Comment} = require('../../models')

//handles posting new posts to the database
router.post('/newpost', async(req, res) => {
    try{
    const {title, body} = req.body

    const postData = await Post.create({post_title:title, post_body:body, user_id:req.session.user.id})
    if (!postData) return res.status(400).json("Not Posted")

    res.status(200).json("Posted")

    } catch (err){res.status(500).json(err)}
})

//handles posting new comments to the database
router.post('/newcomment', async(req, res) => {
    try{
    const {body, postId} = req.body

    const postData = await Comment.create({comment_body:body, post_id: postId, user_id:req.session.user.id})
    if (!postData) return res.status(400).json("Not Commented")

    res.status(200).json("Commented")

    } catch (err){res.status(500).json(err)}
})

//handles editing posts and saving them to the database
router.put('/postedit', async(req, res)=>{
    try{
        const {body, id} = req.body

        const postData = await Post.update({post_body:body}, {where:{id}})
        if (!postData) return res.status(400).json("Not Commented")
        res.status(200).json("Posted")
    }
    catch(err){res.status(500).json(err)}
})

//handles deleting posts from the database
router.delete('/postdelete', async(req, res)=>{
    try{
        const {id} = req.body
        const postData = await Post.destroy({where: {id}})
        if (!postData) return res.status(400).json("Not Commented")
        res.status(200).json("Destroyed")
    }
    catch(err){res.status(500).json(err)}
})

module.exports = router;
