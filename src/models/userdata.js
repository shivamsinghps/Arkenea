const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user_dataSchema = new Schema({
  firstName: {type: String},
  LastName: {type: String},
  email: {type: String, required:true, unique:true},
  password:{type: String, required:true},
  Phone: {type: Number, required:false},
  image: {type:String ,required:false},
  imagePublicId: {type:String ,required:false},
  studies :[{
    studyfile:{type:String ,required:false},
    studytag:{type:String ,required:false}
  }]
})

module.exports = mongoose.model('UserData',user_dataSchema)
