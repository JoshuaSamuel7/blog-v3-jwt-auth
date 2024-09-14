const express=require('express');
const connectDB = require('./config/db');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const passport=require('./config/passport');
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    // https://joshuasblog.vercel.app
    origin:'https://joshuasblog.vercel.app',
    credentials:true

}));
const postRoutes=require('./routes/postRoutes');
const authRoutes=require('./routes/authRoutes');
connectDB();
app.use(postRoutes);
app.use(authRoutes);
app.listen(8000,(req,res)=>{
    console.log("Sever live at 8000");
});