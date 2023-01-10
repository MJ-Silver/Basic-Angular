/*
Code Attribution
Source: LabGuide
Title:APDS7311 Lab guide
Year: 2022
Author: The independent institue of education
*/
const express = require('express');
const dash = require('../models/dashboard');

const jwt = require('jsonwebtoken');
const checkauth = require('../check-auth');
const dashboard = require('../models/dashboard');
const router = express.Router();



router.get('',checkauth,(req,res)=>{
    res.status(201).json({
message:'Welcome you are authenticated.'
    })
});



router.post('/addPost',checkauth,(req,res)=>{
   
        const post = new dashboard({//adding to dashboard schema
                title: req.body.title,
                description: req.body.description
        });
        
        post.save().then(result =>
        {
             res.status(201).json({
            message: 'Dashboard post has been Added',
            result: result//adding the information
        })
        }).catch(err =>{
    res.status(500).json({
        message:"An error has occured!"
            } );  
        })
    });


router.get('/displayPosts',checkauth,(req,res)=>{

        dash.find({//finding and displaying all posts
           
        }).then(result =>{
            res.status(200).json({Posts:result})
        }).catch(err =>{
            res.status(404).json({message:"An Error has occured!"});
        });
});


router.delete('/deletePost/:_id',checkauth,(req,res)=>{
    dash.deleteOne({ _id: req.params._id}).then((result)=>
    {
    res.status(200).json({message:"Post has been deleted"});
    }
    );

})


module.exports =router;