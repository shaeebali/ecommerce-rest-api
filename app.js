// Remember to install express and body-parser before running this code
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const usersRouter = require('./Routes/user');
const registerRouter = require('./Routes/register');
const authRouter = require('./Routes/auth');
const refreshTokenRouter = require('./Routes/refresh');
const logoutRouter = require('./Routes/logout');
const productsRouter = require('./Routes/product');
const verifyJWT = require('./Middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./Middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
require('dotenv').config();

// Connect to MongoDB
connectDB();

//Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware to parse cookies
app.use(cookieParser());

// Handle options credentials check - before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// Add other middlewares here app.use (i.e. CORS, express-session, etc.)
app.use(cors(corsOptions));

// Set session cookie to be secure
app.set('trust proxy', 1);

// Create a secret key for session
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
// these routes do not need to be protected by JWT
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshTokenRouter);
app.use('/logout', logoutRouter);
app.use('/products', productsRouter); // does this need to be protected?

// add verifyJWT middleware here (i.e. app.use(verifyJWT))
app.use(verifyJWT);
// all protected routes should be added after this line
app.use('/users', usersRouter);

// Catch all errors and send a 404 response
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not found' });
  } else {
    res.type('txt').send('404 Not found');
  }
})

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
