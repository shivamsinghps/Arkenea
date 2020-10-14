const fs = require('fs')
const path = require('path')
const UserData = require('../../models/userdata')

exports.user_form = async (req, res, next) => {
  UserData.find({email: req.body.email})
  .then((user)=>{
    if(user.length>=1){
      next(errorInit('UserData Exists',409))
    }else{
      const newuserdata =new UserData({
        firstName: req.body.firstName,
        LastName: req.body.LastName,
        email: req.body.email,
        Phone: req.body.Phone,
        Profile:{
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/jpg'
        }
      })
      newuserdata.save().then((user)=>{
        res.status(200).json({message:'User Data Saved'})
      }).catch((err) => next(errorInit(`${err.message}database connection error`, 500)))
    }
  })
};

exports.users_list = (req, res, next) => {
  UserData.find()
  .then(users=>{
    res.json({
      data:users
    })
  })
  .catch((err)=> next(errorInit(`${err.message}database connection error`, 500)))
};

exports.user = (req, res, next) => {
  UserData.findOne({email:req.params.id})
  .then(user=>{
    res.json({
      data:user

    })
  })
  .catch((err)=> next(errorInit(`${err.message}database connection error`, 500)))
};

exports.user_delete = (req, res, next) => {
  UserData.findOneAndRemove({email:req.params.id})
  .then(user=>{
    res.json({
      data:user

    })
  })
  .catch((err)=> next(errorInit(`${err.message}database connection error`, 500)))
};

exports.user_update = (req, res, next) => {
  UserData.findOneAndUpdate(
    {email:req.params.id},
    {...req.body},
    {new:true}
    )
  .then(user=>{
    res.json({
      data:user
    })
  })
  .catch((err)=> next(errorInit(`${err.message}database connection error`, 500)))
};
