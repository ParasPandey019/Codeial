const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');


const db = require('./config/mongoose.js');


const cookieParser = require('cookie-parser');


const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passportLocal.js')

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(express.static('./assets'));

app.use(express.urlencoded());

app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codial',
    // TODO
    secret: "something for now",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// using express router
app.use('/',require("./routes/index"));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
        return;
    }

    console.log(`Server is up and running on port ${port}`);
})



