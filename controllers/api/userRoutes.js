const router = require('express').Router()
const { User } = require('../../models/index')

//handles logins
router.post('/login', async(req, res) => {
    try {
        const {username, password} = req.body
    
        const userData = await User.findOne({where:{user_name: username}})
        if (!userData) return res.status(500).json("Not a valid login or password") //check for username

        const validPassword = await userData.checkPassword(password)
        if (!validPassword) return res.status(500).json("Not a valid login or password") //check for matching password
 
        //saving the session
        req.session.save(()=>{ 
            req.session.loggedIn = true
            req.session.user = userData.get({plain: true})
            res.status(200).json({ user: userData, message: 'You are now logged in!' })
        })
    } catch (err){res.status(500).json(err)}
})

//handles sign ups
router.post('/signup', async(req, res) => {
    try {
        const {username, password} = req.body

        const newUser = await User.create({user_name: username, password: password})
        if (!newUser) return res.status(400).json({msg: "User not created"})

        req.session.save(()=>{
            req.session.loggedIn = true
            req.session.user = newUser.get({plain:true})
            res.status(200).json({ user: newUser, message: 'You are now logged in!' })
        })
    }  catch (err){res.status(500).json(err)}
})

//handles logging out
router.post('/logout', (req,res) => {
    if (req.session.loggedIn) {req.session.destroy(()=>{
        res.status(204).end()
    })} else res.status(404).end()
})

module.exports = router;
