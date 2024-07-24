// Remember to install express and body-parser before running this code
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const usersRouter = require('./Routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Back-end for ecommerce website!'));

app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
