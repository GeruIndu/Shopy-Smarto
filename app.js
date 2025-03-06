const db = require('./config/mongoose-connection')

const express = require('express');
const path = require('path');
const app = express();
const expressSession = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const usersRouter = require('./routes/usersRouters');
const productsRouter = require('./routes/productsRouters');
const ownersRouter = require('./routes/ownersRouter');
const indexRouter = require('./routes/index')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash()); // we can't use flash without using express session
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');

app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/owners', ownersRouter);

app.listen(3000);