/*
Code Attribution
Source: LabGuide
Title:APDS7311 Lab guide
Year: 2022
Author: The independent institue of education
*/
const http = require('https');
const app = require('./app');
const fs = require('fs');

const port = 3000;

const server = http.createServer({

    key: fs.readFileSync('./keys/privatekey.pem'),//ssl implementation
    cert: fs.readFileSync('./keys/certificate.pem')//ssl implementation
},app);

server.listen(port);