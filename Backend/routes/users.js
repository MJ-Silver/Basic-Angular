/*
Code Attribution
Source: LabGuide
Title:APDS7311 Lab guide
Year: 2022
Author: The independent institue of education
*/
const express = require('express');
const bodyparser = require('body-parser');
const users = require('../models/users');
const bcrypt = require('bcrypt');
const checkauth = require('../check-auth');
const jwt = require('jsonwebtoken');
const checkAuth = require('../check-auth');
const e = require('express');
const router = express.Router();
var currentUser 
var ExpressBrute = require('express-brute');
 
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);

router.post('/register', bruteforce.prevent,(req, res) =>{
//post request for user register as data is being sent!
  bcrypt.hash(req.body.password,10).then(hash =>{//generating hash for users password
 
    const user = new users({
            id: req.body.id,
            password: hash
    });//creating users infor to schema
    
    user.save().then(result =>
    {
         res.status(201).json({
        message: 'User Added',
        result: result
    })//saving the users data
    }).catch(err =>{
res.status(500).json({
    message:"An Error has occured!"
        } );  
    })//exception handling
})
});

router.post('/login', bruteforce.prevent, (req,res) =>{
let loginUser;

        users.findOne({//finding specific user by username
             id: req.body.id 
        }).then(user => {
            if(!user){
                return res.status(401).json({
                     message: "Authentication Error"
                });
            } else{
                 loginUser = user;
            return bcrypt.compare(req.body.password,user.password);//comparing encrypted passwords
            }
        }).then(result =>{
            if(!result){
                return res.status(401).json({
                   message: "User name or password is wrong"
                });    
            }else{           
              const token = jwt.sign({id:loginUser.id,userid:loginUser._id}, "supersecrettoken" ,{expiresIn:'1h'});   //getting token information 
                 res.status(200).json({ message: "Login Successful!", token: token})
                 currentUser = loginUser.id;//saving logged in used
                }   
        }).catch(err =>{
            return res.status(401).json({
             message: "User name or password is wrong"
            });
           
        })
  
});


router.get('/logged',checkAuth,(req,res)=>{
    if(currentUser != null){
      res.status(200).json({
        message: "User is logged in" ,
        user: currentUser
      })  
    }else{
        res.status(404).json({
            message :" There is no user!"
        })
    }
    
});


router.delete('/:_id',checkauth,(req,res)=>
{
userModel.deleteOne({ _id: req.params._id}).then((result)=>
{
res.status(200).json({message:"User has been deleted"});
}
);
});

module.exports = router;

