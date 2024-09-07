const express=require('express');
const connectDB = require('./config/db');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const allowedOrigins = [
    'https://joshuasblog.vercel.app',
    'http://localhost:3000'  // Replace with your second origin
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
const postRoutes=require('./routes/postRoutes');
const authRoutes=require('./routes/authRoutes');
connectDB();
app.use(postRoutes);
app.use(authRoutes);
app.listen(8000,(req,res)=>{
    console.log("Sever live at 8000");
});