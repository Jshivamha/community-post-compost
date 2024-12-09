require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongo');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['https://compost-delta.vercel.app', 'http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions)); // Use CORS for all routes

// Session store configuration
const store = MongoDBSession.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'mysession'
});

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || "default_secret",
    saveUninitialized: false,
    resave: false,
    store,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Secure cookies in production
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12, // 12 hours
    },
}));

// Home route
app.get('/', (req, res) => {
    console.log('Visited Home Page');
    res.status(200).send('Welcome to the home Page');
});

// Auth routes
const AuthController = require('./controllers/AuthController');
app.use('/auth', AuthController);

const isAuth = require('./controllers/isAuth');
const dashboard = require('./routes/dashboard');
app.use('/u', isAuth, dashboard);

// Post routes
const PostController = require('./controllers/Post');
app.use('/api/post', PostController);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Connected to db and Listening on PORT: ${process.env.PORT || 4000}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
