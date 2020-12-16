const mongoose = require('mongoose')
const Schema = mongoose.Schema
const StudyData = require('./study')

const user_dataSchema = new Schema({
  firstName: {type: String},
  LastName: {type: String},
  email: {type: String, required:true, unique:true},
  password:{type: String, required:true},
  Phone: {type: Number, required:false},
  image: {type:String ,required:false},
  imagePublicId: {type:String ,required:false},
  studies : [{
    type: Schema.Types.ObjectId,
    ref: "StudyData",
  }],
})

user_dataSchema.pre('remove', function(next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  StudyData.remove({userId: this._id}).exec();
  next();
});

module.exports = mongoose.model('UserData',user_dataSchema)
