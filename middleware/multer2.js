const multer = require('multer')


//*Storage Creation - disc storage 
 const storage = multer.diskStorage({
    //*it have 2 keys - 1. destination and 2. FileName
    //* destination - where the file is stored 
   
     destination:(req,file,callback)=>{
         callback(null,'./uploads')
     },

     filename:(req,file,callback)=>{
         //*now()- Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time
       const filename =  `image-${Date.now()}-${file.originalname}` 
       callback(null,filename)
    }
})



//*fileFilter
 const fileFilter = (req,file,callback)=>{
    if(file.mimetype ==='image/png' || file.mimetype ==='image/jpeg'|| file.mimetype ==='image/jpg'  ){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error ("Only png , jpeg,jpg files will be allowed !!"))
    }
} 

//*2. create multerconfiguration
const multerConfig2 = multer({
     storage,
    fileFilter
})

//* 3. export multer
module.exports = multerConfig2