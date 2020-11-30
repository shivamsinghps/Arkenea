const fs = require('fs')
const path = require('path')
const UserData = require('../../models/userdata')
const errorInit = require('../../util_functions/errorcrtr')
const dicomParser = require('dicom-parser')
const Rusha = require('rusha')
// const encrypt = require('../../Utility/dcmencoder')
// const decrypt = require('../../Utility/dcmdecoder')

function sha1(buffer, offset, length) {
  offset = offset || 0;
  length = length || buffer.length;
  var subArray = dicomParser.sharedCopy(buffer, offset, length);
  var rusha = new Rusha();
  return rusha.digest(subArray);
}

exports.user_form = async(req, res, next) => {
 const data = {...req.body}

 const user =  await  UserData.find({email: data.email})
    if(user.length>=1){
     
      next(errorInit('UserData Exists',409))
    }else{
      const dicomFileAsBuffer = fs.readFileSync(req.file.path);
      try {
        var dataSet = dicomParser.parseDicom(dicomFileAsBuffer);
        console.log(dataSet);
        
      
      // print the patient's name
        var patientName = dataSet.string('x00100010');
        console.log('Patient Name = '+ patientName);
      
      // Get the pixel data element and calculate the SHA1 hash for its data
        var pixelData = dataSet.elements.x7fe00010;
        var pixelDataBuffer = dicomParser.sharedCopy(dicomFileAsBuffer, pixelData.dataOffset, pixelData.length);
        console.log('Pixel Data length = ', pixelDataBuffer.length);
        console.log("Pixel Data SHA1 hash = ", sha1(pixelDataBuffer));
      
      
        if(pixelData.encapsulatedPixelData) {
          var imageFrame = dicomParser.readEncapsulatedPixelData(dataSet, pixelData, 0);
          console.log('Old Image Frame length = ', imageFrame.length);
          console.log('Old Image Frame SHA1 hash = ', sha1(imageFrame));
      
          if(pixelData.basicOffsetTable.length) {
            var imageFrame = dicomParser.readEncapsulatedImageFrame(dataSet, pixelData, 0);
            console.log('Image Frame length = ', imageFrame.length);
            console.log('Image Frame SHA1 hash = ', sha1(imageFrame));
          } else {
            var imageFrame = dicomParser.readEncapsulatedPixelDataFromFragments(dataSet, pixelData, 0, pixelData.fragments.length);
            console.log('Image Frame length = ', imageFrame.length);
            console.log('Image Frame SHA1 hash = ', sha1(imageFrame));
          }
        }
      
      }
      catch(ex) {
        console.log(ex);
      }

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
