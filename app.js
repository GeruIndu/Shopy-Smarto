const express = require('express');
const path = require('path');
const app = express();

const db = require('./config/mongoose-connection')

const usersRouter = require('./routes/usersRouters');
const productsRouter = require('./routes/productsRouters');
const ownersRouter = require('./routes/ownersRouter');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/owners', ownersRouter);

app.listen(3000);