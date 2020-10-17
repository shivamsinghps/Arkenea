const fs = require('fs')
const path = require('path')
const UserData = require('../../models/userdata')
const errorInit = require('../../util_functions/errorcrtr')

exports.user_form = async(req, res, next) => {
 const data = {...req.body}

 const user =  await  UserData.find({email: data.email})
    if(user.length>=1){
     
      next(errorInit('UserData Exists',409))
    }else{
      const newuserdata = new UserData({
        firstName: data.firstName,
        LastName: data.LastName,
        email: data.email,
        Phone: data.Phone,
        Profile:req.file.path
      })
      newuserdata.save().then((user)=>{
        res.status(200).json({user:user,message:'User Data Saved'})
      }).catch((err) => next(errorInit(`${err.message}database connection error`, 500)))
    }
  
}

exports.users_list = async (req, res, next) => {
  let limit = +req.query.limit
  let page = +req.query.page
  await UserData.find().skip((page-1)*limit).limit(limit)
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
  let new_data = req.body
  let data = {...new_data}
  Object.keys(data).forEach(item=>{
    if(data[item]==="" || data[item]==="undefined")
    delete data[item]
  })
 if(req.file!==undefined)
  data.Profile = req.file.path
  
  UserData.findOneAndUpdate(
    {email:req.params.id},
    {...data},
    {new:true}
    )
  .then(user=>{
    res.json({
      data:user
    })
  })
  .catch((err)=> next(errorInit(`${err.message}database connection error`, 500)))
};
