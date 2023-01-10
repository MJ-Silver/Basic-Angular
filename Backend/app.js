/*
Code Attribution
Source: LabGuide
Title:APDS7311 Lab guide
Year: 2022
Author: The independent institue of education
*/

const express = require('express')
const app = express()
const urlprefix = '/api';
const mongoose = require('mongoose');
const userModel = require('./models/users');
const fs = require('fs');
const users = require('./models/users');
const cert = fs.readFileSync('./keys/certificate.pem');
  const userRoutes = require("./routes/users");
const dashboardRoutes = require("./routes/dashboard");

const options = {
    server: {sslCA: cert}};
    const connstring ='mongodb+srv://St10121065:st10121065@cluster0.q2dj8gl.mongodb.net/usersData?retryWrites=true&w=majority';
//String to mongo DB
  

 mongoose.connect(connstring).then(()=>//sending request and connection to mongDB
 {
    console.log('Connection Successful');
 }
 ).catch(()=>{
    console.log("Connection error")
},options);



const helmet = require("helmet");


app.use(helmet());

const morgan = require('morgan');
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})





app.use(express.json());
//using express json

app.use((reg,res,next)=> {
res.setHeader('Access-Control-Allow-Origin', '*'); //setting up Cross orgin resource CORS
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*'); next(); });


 app.use(urlprefix+'/dash',dashboardRoutes);//routig for bullentin board
 app.use(urlprefix+'/users',userRoutes);//routing for user authentication



 console.log("DONE!");
module.exports = app;