const express = require('express')
const sql = require('mysql')
const cors = require('cors')
const jwt= require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const session = require('express-session');
const cookieParser = require ('cookie-parser')
const db = require ('./db')
const bodyParser = require('body-parser')



const app =express();
app.use(express.json({ limit:'80mb'}));
app.use(cors(  {
     origin: 'http://localhost:3001',
     methods: ['POST','GET', 'PUT', 'DELETE' ],
     credentials: true}));
app.use(cookieParser() );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true , limit:'80mb'}));
app.use(
    session({
          key:"userID",
          secret: 'something',
          resave: false,
          saveUninitialized: true,
          cookie:{
            expires:60*60*24*1000, sameSite:'strict'
          
          }
        })
      ) 
  
app.use('/login',require('./Routes/login' ));
app.use('/verify',require('./Routes/verify' ));
app.use('/signup',require('./Routes/signup' ));
app.use('/user',require('./Routes/user') );
app.use('/dashboard',  require('./Routes/dashboard'))
app.use('/courses', require('./Routes/courses'));
app.use('/hackathons', require('./Routes/hackathons'));
app.use('/dashboard/courses', require('./Routes/enrolledCourses'));
app.use('/paths', require('./Routes/learningPaths'));
app.use('/instructor', require('./Routes/instructor'));
app.use('/notifications', require('./Routes/notification'));
app.use('/claims', require('./Routes/claims'));
app.use('/schedule', require('./Routes/schedule'));
app.use('/logout',require('./Routes/logout') );

app.listen(3000,()=>{

    console.log('server on 3000');
})
