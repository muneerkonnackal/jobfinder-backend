//*import model 
const candidates = require('../Models/candidateSchema')

//: import jwt 
const jwt = require('jsonwebtoken')


//: Logic for register
exports.register =  async(req,res)=>{
    //:logic
    console.log('inside userController-register logic');
    //*Destructuring  data from the client request body (since the json format is converted intop javascript object by the json() method used in index.js file)
    const {username , email , password} = req.body
          try { //*since email is the unique value we are checking that the email is already present in tne database
            //*for that we are using findOne method which  return entire document when the condition is true else
          const existingCandidate  = await  candidates.findOne({email})
          if(existingCandidate){
            res.status(406).json('Account already exist...  Please Login')
          }
          else{
            //* if findOne returns null ,it means the email or user deosnt exist  so  we register the user 
            //*save cheyyunnath nammal create cheytha medel nte reethiyil aanu adyam object vcreate cheyyanam

            const newCandidate = new candidates({  //*candidates is models name
              //*create object for the modal
              username,
              email,
              password

            })
            //* in order to add the above object use save() method in mongoose
            await newCandidate.save()
            //* randum 2 sthalath host cheyyunna application anu so we use await



            //:response
            res.status(200).json(newCandidate)
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

        try{ const existingCandidate = await candidates.findOne({email,password})


        if(existingCandidate){
          //*sign is the function used to create token
          //*first ar is payload - the information that secretly transmitted
          //*2nd arg is the secret key-based on which token generated

          const token = jwt.sign({userId:existingCandidate._id},"jobportalsecretkey123")

          res.status(200).json({

            existingCandidate,
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
