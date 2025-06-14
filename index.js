const express = require('express');

const mongoose = require('mongoose');
const { connectMongoDB } = require('./connection');
const urlRoute = require('./routes/url');

const app = express();
const port = 3000;

connectMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("MongoDB connected"));

// Middlewares

app.use(express.json());

app.use('/url', urlRoute);


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})