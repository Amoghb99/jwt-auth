const express =require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');


//Connect to DB
/* mongoose.connect('mongodb://localhost:27017/auth-app',{useNewUrlParser:true},
{useUnifiedTopology:true},()=>{
    console.log('Connected to DB');
}); */

mongoose.connect('mongodb://localhost:27017/auth-app',
{ useUnifiedTopology:true, useNewUrlParser:true,
}).then (()=>{
    console.log('connected to localhost 3000');
}).catch((error)=>{
    console.log(error);
})

//Middleware
app.use(express.json());


// Routes Middleware
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

//Route Middleware


app.listen(3000, ()=> {
    console.log('Server runing on port 3000');
})