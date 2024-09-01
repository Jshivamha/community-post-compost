require('dotenv').config()

const express = require('express')
const session = require('express-session')
const MongoDBSession = require('connect-mongo')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['https://compost-delta.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Necessary for including cookies and auth headers
};
app.use(cors(corsOptions)); // Use CORS for all routes

const store = MongoDBSession.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'mysession'
})

app.use(session({
    secret: "this is the key",
    saveUninitialized: false,
    resave: false,
    store,
    cookie: {
        secure: false, // Set to true if using https
        httpOnly: true,
    },
}));


app.get('/', (req, res) => {
    console.log('Visited Home Page');
    res.status(200).send('Welcome to the home Page');
});

const Auth = require('./routes/Auth')
app.use('/auth',Auth)

const isAuth = require('./controllers/isAuth');
const dashboard = require('./routes/dashboard');
app.use('/u', isAuth, dashboard);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to db and Listening on PORT: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);  
    }); 