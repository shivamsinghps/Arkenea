const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserData = require('../../models/userdata')
const errorInit = require('../../util_functions/errorcrtr')
const {uploadToCloudinary,deleteFromCloudinary} = require('../../util_functions/cloudinary')
const {uploadToAws} = require('../../util_functions/aws_s3')

exports.user_signup = (req, res, next) => {
  UserData.find({email: req.body.email})
    .then((user) => {
      if (user.length >= 1) {
        next(errorInit('User Exists', 409));
      }else{
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          next(err);
        }
          const user = new UserData({
          email:req.body.email,
          password:hash,
        })
          user.save()
          .then((user) => {
            const token = jwt.sign({
              email: user.email,
              userId: user._id,
            },
            process.env.SECRET, {
              expiresIn: '1h',
            });
            res.status(201)
              .json({
                message: 'Auth successful',
                idToken:token,
                expiresIn:3600,
              });
          })
          .catch((err) => next(errorInit(`${err.message}database connection error`, 500)));
      })};
    })
    .catch((err) => next(errorInit(`${err.message}database connection error`, 500)));
};

exports.user_signin = (req, res, next) => {
  UserData.find({
      email: req.body.email,
  })
    .then((user) => {
      
      bcrypt.compare(req.body.password, user[0].password, (err,result,isMatch) => {
        
        if (!result) {
          next(errorInit('Check password', 409));
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.SECRET, {
            expiresIn: '1h',
          });
         res.status(202)
            .json({
              message: 'Auth successful',
              idToken:token,
              expiresIn:3600,
            });
        }
      });
    })
    .catch((err) => next(errorInit(`${err.message}Check your Email`, 404)));
};


exports.user_form = async(req, res, next) => {
 const data = {...req.body}

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
     const newuserdata = await UserData.findOneAndUpdate(
      {email:req.userData.email},
      {
        firstName: data.firstName,
        LastName: data.LastName,
        Phone: data.Phone,
        image:fieldsToUpdate.image,
        imagePublicId:fieldsToUpdate.imagePublicId
      })
      newuserdata.save().then((user)=>{
        res.status(200).json({message:'User Data Saved'})
      }).catch((err) => next(errorInit(`${err.message}database connection error`, 500)))
    
  
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
    UserData.findOne({email:req.userData.email})
  .then(user=>{
    res.status(200)
    .json({
      data: user,
    });
  })
  .catch((err)=> next(errorInit(`${err.message}database connection error`, 500)))
  
};

exports.user_delete = async(req, res, next) => {

  try{
  const user = await UserData.findOneAndRemove({email:req.userData.email})
  if(user.imagePublicId!==undefined)
    await deleteFromCloudinary(user.imagePublicId)
    res.json({
      data:user
    })
  }catch(err){next(errorInit(`${err.message}database connection error`, 500))}
};

exports.user_update = async(req, res, next) => { 
  const fieldsToUpdate = {image:'',imagePublicId:''};
  
      if(req.file!==undefined){
      const file_process = req.file.mimetype.split('/')
      if(file_process[0]==='image'){
        const uploadImage = await uploadToCloudinary(req.file.buffer, "user");
        if (uploadImage.secure_url) {
          console.log(uploadImage);
        fieldsToUpdate.image = uploadImage.secure_url;
        fieldsToUpdate.imagePublicId = uploadImage.public_id;
      }
      }
    }
  let data = req.file!==undefined?{...req.body, ...fieldsToUpdate}:{...req.body}
  
  Object.keys(data).forEach(item=>{
    if(data[item]==="" || data[item]==="undefined")
    delete data[item]
  })

  try{
  const user = await UserData.findOneAndUpdate(
    {email:req.userData.email},
    {...data},
    )
    if(req.file!==undefined)
     await deleteFromCloudinary(user.imagePublicId)
    res.json({
      data:user
    })
  }catch(err){next(errorInit(`${err.message}database connection error`, 500))}
};

exports.user_Studies = async(req, res, next) => {

 try{
  const user = await UserData.findOne({email:req.userData.email})
     if(user){
       
      studies = await req.files.map(async (item)=>{
        
        const uploadFile = await uploadToAws(item.buffer)
        if (!uploadFile.Location) {
          throw new Error("Something went wrong while uploading File!");
        }
        const study = {studyfile:uploadFile.Location,studytag:uploadFile.ETag}
        await UserData.findOneAndUpdate(
          { email:req.userData.email }, 
          { $push: { studies: study } },
      )
      })
     }   
     res.sendStatus(200)
    }catch(err){next(errorInit(`${err.message}database connection error`, 500))}
 }