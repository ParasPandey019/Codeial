const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');
const cookieParser = require('cookie-parser');

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(express.static('./assets'));

app.use(express.urlencoded());

app.use(cookieParser());

// using express router
app.use('/',require("./routes/index"));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
        return;
    }

    console.log(`Server is up and running on port ${port}`);
})



