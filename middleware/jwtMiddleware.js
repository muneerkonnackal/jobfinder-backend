//*import jsom webtoken
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');
    //*logic
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    try{
        const jwtResponse = jwt.verify(token,"jobportalsecretkey123")
        console.log(jwtResponse);
       //: user id ne req oru key il send cheyyunnu  already req il method,url,data,header und athil oru key ayo req payload undakki userid ne pass cheyyunnu ith nere pokunnath controller il anu 
        req.payload = jwtResponse.userId
        next()

    } catch(err){
        res.status(401).json('Authentication failed please login')
    }
    // next()
}

module.exports = jwtMiddleware