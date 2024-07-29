// Remember to install express and body-parser before running this code
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const usersRouter = require('./Routes/user');

//Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// remove this route later, it's just for testing
app.get('/', (req, res) => res.send('Back-end for ecommerce website!'));

// add routes for products, orders, and users here...
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
