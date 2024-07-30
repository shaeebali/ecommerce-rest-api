// Remember to install express and body-parser before running this code
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const usersRouter = require('./Routes/user');
require('dotenv').config();

//Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add other middlewares here app.use (i.e. CORS, express-session, etc.)
app.use(cors());

// Set session cookie to be secure
app.set('trust proxy', 1);

// Createe a secret key for session
app.use(
  session({  
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// remove this route later, it's just for testing
app.get('/', (req, res) => res.send('Back-end for ecommerce website!'));

// add routes for products, orders, and users here...
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
