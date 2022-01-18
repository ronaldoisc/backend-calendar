const express=require('express');
const { dbConnection } = require('./database/config.js');

const cors=require('cors');
require('dotenv').config();

//create express server

const app=express();


//batabase
dbConnection();

// public directory

app.use(express.static('public'));

//cprs
app.use(cors());

//read and parsed
app.use(express.json())
//routes

app.use('/api/auth',require('./routes/auth.js'));
// TODO: CRUD events

app.use('/api/events',require('./routes/events.js'));

//listen request

app.listen(process.env.PORT,()=>{
    console.log(`Server running in the port ${process.env.PORT}`)

});

