const bcrypt = require('bcrypt');
const authData = require('../models/User');
const {success, error} = require('../utils/responseWrapper')
const jwt = require('jsonwebtoken');
const User = require('../models/User');



const signupController = async(req,res) => {


    try {
        

        const {name, email , password} = req.body;

        //email or password not found

        console.log(req.body);
        

        if(!name || !email || !password){
            
           return res.send(error(400, "All fields are required"));
        }

        //already user find

        const oldUser = await authData.findOne({email});
        if(oldUser){
           
           return res.send(error(409, "user already exits"))
        }

        //hash password create
        const hashPassword = await bcrypt.hash(password,10);

        //user created
        const user = await authData.create({
            name,
            email,
            password: hashPassword,
        })

       

        return res.send(success(201, "User created successfully"));


    } catch (e) {

        return res.send(error(500,e.message));
        
    }


}



const loginController = async(req,res) => {



    try {

        const {email,password} = req.body;

        //email or password not found
        if(!email || !password){
            return res.send(error(400, "All fields are required"));
        }

        //find user
        const user = await User.findOne({email}).select('+password');

        //if user not found
        if (!user){
            return res.send(error(404 , "User not found"));
        }

        //match password if user found
        const matched = await bcrypt.compare(password, user.password);


        //if password not matched
        if(!matched) {
            return res.send(error(404 , "Incorrect password"));
        }

        const accessToken = generateAccessToken({
            _id : user._id
        });


        const refreshToken = generateRefreshToken({
            _id : user._id
        });

        res.cookie("jwt" , refreshToken ,{
            httpOnly:true,
            secure:true,
        });

        return res.send(success(200, { accessToken }));
 
        
    } catch (e) {

        return res.send(error(500, e.message));

    }
}


const refreshController = (req, res) => {
    const cookies = req.cookies;

    //refresh token not found
    if (!cookies.jwt) {
        
        return res.send(error(401, "Refresh token in cookie is required"));
    }

    const refreshToken = cookies.jwt;

    console.log('refressh', refreshToken);

    try {
        const decode = jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN_PRIVATE_KEY);
        const _id = decode._id;
        const accessToken = generateAccessToken({ _id });
        
        return res.send(success(201, { accessToken }));

    } catch (e) {

        return res.send(error(401, "invalid refresh token"));
    }
}

const logoutController = async(req,res) => {
    try {
        res.clearCookie("jwt" , {
            httpOnly:true,
            secure:true,
        });

        return res.send(success(200,'User logged out'));
    } catch (e) {

        return res.send(error(500, e.message));
        
    }
}

const generateRefreshToken = (data) => {
    try {

        const token = jwt.sign(data, process.env.REFRESH_ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: "1y",
        });
       
        return token;
    }
    catch (e) {
        
        return res.send(error(401, "invalid refresh token"));
    }
}

const generateAccessToken = (data) => {
    try {

        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: "1d",
        });
        
        return token;
    }
    catch (e) {
       
        return res.send(error(401, "invalid refresh token"));
    }
} 


module.exports = {
    signupController,
    loginController,
    refreshController,
    logoutController
}
