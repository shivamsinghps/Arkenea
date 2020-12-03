const express = require('express')
const multer = require('multer')
const upload = require('../util_functions/upload')
const router = express.Router()
const UserController = require('./controller/user')

router.get('/users',UserController.users_list)

router.get('/user/:id',UserController.user)

router.post('/profileSetup',upload.single('Userimage'),UserController.user_form)

router.patch('/user/:id',upload.single('Userimage'),UserController.user_update)

router.post('/upload_studies/:id',upload.array('Userimage',10),UserController.user_Studies)

router.delete('/user/:id',UserController.user_delete)


module.exports = router
