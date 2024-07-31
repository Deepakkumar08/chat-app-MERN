const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB')
const router =require('./routes/index')
const cookiesParser =  require('cookie-parser')

const app = express();
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  };
  
  app.use(cors(corsOptions));
// app.use(cors())
app.use(express.json())
app.use(cookiesParser())
const PORT  = process.env.PORT || 8080

app.get('/',(req,res)=>{
    res.json({
        message : 'server is running at ' + PORT
    })
})


app.use('/api',router)

  

connectDB().then(()=>{
    app.listen(PORT, (req,res)=>{
        console.log('server is running at DB ' +  PORT)
    })
})

