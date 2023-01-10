/*
Code Attribution
Source: LabGuide
Title:APDS7311 Lab guide
Year: 2022
Author: The independent institue of education
*/
const mongoose = require('mongoose')

const userschema = mongoose.Schema(
    {
        id: {type: String,required:true},//username for users
        password: {type: String,required:true}//Hased password for users
    }
);

module.exports = mongoose.model('users',userschema);//mongoose for table
