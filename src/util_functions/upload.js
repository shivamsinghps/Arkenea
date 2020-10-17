const multer = require('multer'); 
  
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads/') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, (new Date()).toISOString() + file.originalname) 
    } 
}); 

const Filter = (req,file,cd)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null,true)
    else
    cb(null,false)
}
  
module.exports = multer({ storage,Filter }); 