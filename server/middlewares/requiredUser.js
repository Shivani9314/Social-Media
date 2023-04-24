const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {error} = require("../utils/responseWrapper");



module.exports = requireuser = async (req,res,next) => {

    try {
        
        if(!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
            return res.send(error(401,"Authorization token not found"));
        }

        const accessToken = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(accessToken,process.env.ACCESS_TOKEN_PRIVATE_KEY);

        req._id = decode._id;

        const user = await User.findById(req._id);


        if(!user){
            return res.send(error(404, 'User not found'));
        }

        next();


    } catch (e) {

     
     return res.send(error(401, "access token not found"));
        
    }
}