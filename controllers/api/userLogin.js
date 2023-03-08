const router = require('express').Router()
const { User } = require('../../models/index')

router.post('/login', (req, res) => {
    const {username, password} = req.body
    
})

router.post('/signup', (req, res) => {
    const {username, password} = req.body

})

module.exports = router;
