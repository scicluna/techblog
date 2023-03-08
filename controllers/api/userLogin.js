const router = require('express').Router()
const { User } = require('../../models/index')

router.post('/login', async(req, res) => {
    try {
        const {username, password} = req.body
    
        const userData = await User.findOne({where:{user_name: username}})
        if (!userData) return res.status(500).json("Something Went Wrong")

        const validPassword = await userData.checkPassword(password)
        if (!validPassword) return res.status(500).json("Not a valid login or password")
 
        req.session.save(()=>{
            req.session.loggedIn = true
            req.session.user = userData.get({plain: true})
            res.status(200).json({ user: userData, message: 'You are now logged in!' })
        })

    } catch (err){res.status(500).json(err)}
})

router.post('/signup', (req, res) => {
    try {
        const {username, password, password2} = req.body

        if (password !== password2) return alert("Passwords don't match")

        const newUser = User.create({user_name: username, password})
        if (!newUser) return res.status(400).json({msg: "User not created"})

        res.session.save(()=>{
            req.session.loggedIn = true
            req.session.user = newUser.get({plain:true})
            res.status(200).json({ user: userData, message: 'You are now logged in!' })
        })
    }  catch (err){res.status(500).json(err)}
})

router.post('/logout', (req,res) => {
    if (req.session.loggedInq) {req.session.destroy(()=>{
        res.status(204).end()
    })} else res.status(404).end()
})

module.exports = router;
