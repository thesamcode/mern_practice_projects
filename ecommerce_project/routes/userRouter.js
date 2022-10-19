// const { model } = require('mongoose')

const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')

// router.post('/register', (req, res) =>{
//     res.json({msg: "Test Router"})
// })

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)



module.exports = router