/*
Code Attribution
Source: LabGuide
Title:APDS7311 Lab guide
Year: 2022
Author: The independent institue of education
*/
const jwt = require('jsonwebtoken');
const tokenstring = "supersecrettoken"
module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token,tokenstring)
         next();
    }catch(error){
        res.status(401).json({
            message: error.message
        })
    }
}