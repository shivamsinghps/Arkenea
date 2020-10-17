const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user_dataSchema = new Schema({
  firstName: {type: String, required:true},
  LastName: {type: String, required:true},
  email: {type: String, required:true, unique:true},
  Phone: {type: Number, required:true},
  Profile: {type:String ,required:false} 
})

module.exports = mongoose.model('UserData',user_dataSchema)
