const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { restrictToLoggedInUsersOnly, checkAuth } = require('./middleware/auth')
const { connectMongoDB } = require('./connection');
const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/users');

const app = express();
const port = 3000;

connectMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("MongoDB connected"));

// Express is compatible with ejs, so we use ejs for SSR
// Setting the view engine to ejs
app.set('view engine', 'ejs');
// Setting the path for ejs files
app.set('views', path.resolve('./views'));

// For SSR, we use ejs files in views directory. Ejs files are html files

// Middlewares
app.use(express.json());  // Supports json data
app.use(express.urlencoded({ extended: false}));  // Supports form data
app.use(cookieParser());  // We have to parse cookies to use them

// Templates engines (Ejs) are used to render html.
app.get('/test', async (req,res)=>{
    const allURLs = await URL.find({}); 
    // We can pass variables in render function as json.
    res.render('home', {
        urls: allURLs
    });
})

// To access public
app.use(express.static('public'));

// We are sending actual requests from views using staticRoute
app.use('/', checkAuth, staticRoute);

// The request send by staticRoute from views are handled by these routes
// restrictToLoggedInUsersOnly only runs if req is made on /url, means a user has to be logged in to send req to /url
app.use('/url', restrictToLoggedInUsersOnly, urlRoute);
app.use('/users', userRoute);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})