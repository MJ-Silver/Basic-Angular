/*
Code Attribution
Source: LabGuide
Title:APDS7311 Lab guide
Year: 2022
Author: The independent institue of education
*/
const mongoose = require('mongoose')

const dashboard = mongoose.Schema(
    {
        title: {type: String,required:true},
        description: {type: String,required:true}
    }
);

module.exports = mongoose.model('dash',dashboard);
