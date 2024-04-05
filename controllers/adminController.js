const admins = require("../Models/adminSchema");

//: import jwt 
const jwt = require('jsonwebtoken')


//: Logic for register
exports.register =  async(req,res)=>{
    //:logic
    console.log('inside adminController-register logic')
    const userId = req.payload;
  console.log(userId);
    const {username , email , password} = req.body
          try {
            
          const existingAdmin = await  admins.findOne({email})
          if(existingAdmin){
            res.status(406).json('Account already exist...  Please Login')
          }
          else{
            //* if findOne returns null ,it means the email or user deosnt exist  so  we register the user 
            //*save cheyyunnath nammal create cheytha medel nte reethiyil aanu adyam object vcreate cheyyanam

            const newAdmin = new admins({  //*candidates is models name
              //*create object for the modal
              username,
              email,
              password,
              userId

            })
            //* in order to add the above object use save() method in mongoose
            await newAdmin.save()
            //* randum 2 sthalath host cheyyunna application anu so we use await



            //:response
            res.status(200).json(newAdmin)
          }
}
//*javascript resolve run time errors using try-catch block
catch(err){
    response.status(401).json("Register request failed due to", err)
}
}


//:logic for login 
exports.login = async(req,res)=>{
    console.log('inside login function');

    const {email,password} = req.body

  try{ const existingAdmin = await admins.findOne({email,password})


  if(existingAdmin){
    //*sign is the function used to create token
    //*first ar is payload - the information that secretly transmitted
    //*2nd arg is the secret key-based on which token generated

    const token = jwt.sign({userId:existingAdmin._id},"jobportalsecretkey123")

    res.status(200).json({

      existingAdmin,
      token
    })
  }
  else{
    res.status(404).json('Invalid email id or password') //404-not found
  }
  }
  catch(err){
         res.status(401).json('Login request failed due to :',err)
        
  }


}

//:edit admin profile
exports.editAdmin = async(req,res)=>{
   
    const userId = req.payload
    const {username,email,password,company,designation,profile} = req.body

    const profileImage = req.file?req.file.filename:profile

    try{
            const updateAdmin = await admins.findByIdAndUpdate({_id:userId},{username,email,password,company,designation,profile:profileImage},{new:true})

            // await updateAdmin.save()
            res.status(200).json(updateAdmin)

    } catch(err){
            res.status(401).json(err)
    }
}

//:get on superadmins dashboard
exports.getSuperRecruiters = async (req, res) => {
  const searchKey = req.query.search || ''; 
  console.log(searchKey);

  const query = {
    username: {
      $regex: searchKey,
      $options: 'i',
    }
  };

  try {
    const allSuperRecruiters = await admins.find(query);
    res.status(200).json(allSuperRecruiters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Request failed due to ${err.message}` });
  }
};

//:delete recruiter by super admin

exports.deleteRecruiterProfile = async(req,res)=>{
  const {id} = req.params
  try{
      const removeRecruiter = await admins.findByIdAndDelete({_id:id})
      res.status(200).json(removeRecruiter)

  } catch(err){
      res.status(401).json(err)
  }
}