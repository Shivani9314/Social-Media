const express = require('express');
const dotenv = require('dotenv');
const DbConnect = require('./dbconnect');
const app = express();
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRoutes')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require('morgan')
const cloudinary = require('cloudinary').v2;

dotenv.config('./env')

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const PORT = process.env.PORT || 4000;

app.use(express.json({limit : '10mb'}));
app.use(morgan('common'));
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))



DbConnect();


app.use('/auth', authRouter);
app.use('/posts' ,postRouter );
app.use('/user', userRouter);


app.listen(PORT,()=> {
    console.log("listening");
})

