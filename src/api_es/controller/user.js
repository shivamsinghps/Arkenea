const fs = require('fs')
const path = require('path')
const UserData = require('../../models/userdata')
const errorInit = require('../../util_functions/errorcrtr')
const dicomParser = require('dicom-parser')
const {uploadToCloudinary,deleteFromCloudinary} = require('../../util_functions/cloudinary')
const {uploadToAws} = require('../../util_functions/aws_s3')

exports.user_form = async(req, res, next) => {
 const data = {...req.body}

 const user =  await  UserData.find({email: data.email})
    if(user.length>=1){
     
      next(errorInit('UserData Exists',409))
    }else{
      const fieldsToUpdate = {image:'',imagePublicId:''};
      if(req.file){
      const file_process = req.file.mimetype.split('/')
      if(file_process[0]==='image'){
        const uploadImage = await uploadToCloudinary(req.file.buffer, "user");
        if (uploadImage.secure_url) {
        fieldsToUpdate.image = uploadImage.secure_url;
        fieldsToUpdate.imagePublicId = uploadImage.public_id;
      }
      }
    }
     const newuserdata = new UserData({
        firstName: data.firstName,
        LastName: data.LastName,
        email: data.email,
        Phone: data.Phone,
        image:fieldsToUpdate.image,
        imagePublicId:fieldsToUpdate.imagePublicId
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

exports.user_delete = async(req, res, next) => {

  try{
  const user = await UserData.findOneAndRemove({email:req.params.id})
  const result = await deleteFromCloudinary(user.imagePublicId)
    res.json({
      data:user
    })
  }catch(err){next(errorInit(`${err.message}database connection error`, 500))}
};

exports.user_update = async(req, res, next) => { 
  const fieldsToUpdate = {image:'',imagePublicId:''};
      if(req.file){
      const file_process = req.file.mimetype.split('/')
      if(file_process[0]==='image'){
        const uploadImage = await uploadToCloudinary(req.file.buffer, "user");
        if (uploadImage.secure_url) {
        fieldsToUpdate.image = uploadImage.secure_url;
        fieldsToUpdate.imagePublicId = uploadImage.public_id;
      }
      }
    }
  let data = req.file?{...req.body, ...fieldsToUpdate}:{...req.body}
  console.log(data);
  Object.keys(data).forEach(item=>{
    if(data[item]==="" || data[item]==="undefined")
    delete data[item]
  })

  try{
  const user = await UserData.findOneAndUpdate(
    {email:req.params.id},
    {...data},
    )
    const result = await deleteFromCloudinary(user.imagePublicId)
    res.json({
      data:user
    })
  }catch(err){next(errorInit(`${err.message}database connection error`, 500))}
};

exports.user_Studies = async(req, res, next) => {
  console.log('llko');
  const data = {...req.body}

 try{
  const user = await UserData.findOne({email: data.email})
     if(user){
       console.log(user);
      studies = await req.files.map(async (item)=>{
        
        const uploadFile = await uploadToAws(item.buffer)
        if (!uploadFile.Location) {
          throw new Error("Something went wrong while uploading File!");
        }
        const study = {studyfile:uploadFile.Location,studytag:uploadFile.ETag}
        await UserData.findOneAndUpdate(
          { email: data.email }, 
          { $push: { studies: study } },
      )
      })
     }   
     res.sendStatus(200)
    }catch(err){next(errorInit(`${err.message}database connection error`, 500))}
 }