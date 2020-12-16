const mongoose = require('mongoose')
const Schema = mongoose.Schema

const study_dataSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: "UserData",
      },
    studyfile:{type:String ,required:false},
    studytag:{type:String ,required:false},
    shared_email: [{type: String, required:true, unique:true}]
})

module.exports = mongoose.model('StudyData',study_dataSchema)
