const express = require('express')
// const multer = require('multer')
const upload = require('../util_functions/upload')
const router = express.Router()
const UserController = require('./controller/user')
const checkAuth = require('../middleware/auth')

router.get('/users',UserController.users_list)

router.get('/user',checkAuth,UserController.user)

// router.post('/profileSetup',checkAuth,upload.single('Userimage'),UserController.user_form)

router.post('/signin',UserController.user_signin)

router.post('/signup',UserController.user_signup)

router.patch('/user',checkAuth,upload.single('Userimage'),UserController.user_update)

router.post('/upload_studies',checkAuth,upload.array('Userimage',10),UserController.user_Studies)

router.post('/share_studies',checkAuth,UserController.user_Share_Studies)

router.delete('/user',checkAuth,UserController.user_delete)


module.exports = router
