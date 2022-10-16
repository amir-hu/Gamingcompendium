var path = require('path'); 		    // some convenient dir/path functions
var express = require('express');	    // use the express module
const cors = require('cors');
var app = express();			        // this is our express.js instance
const PORT = process.env.PORT || 5000;  // Port should be 5000 by default


app.use(cors());
app.options('*', cors());
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'cool beans' }));
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    
    app.use(express.static(path.join(__dirname, 'Pages'))) // lets us serve static files from the "public" directory
        .get('/', (req, res, next) => {                           // respond to HTTP GET request. '/' is the root endpoint.
            res.sendFile(path.join(__dirname, 'Pages/Index.html')) // serve the landing static page
    }).listen(PORT); // keep the server listening on port 5000
});
