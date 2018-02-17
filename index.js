const express = require('express'); // Fast, unopinionated, minimalist web framework
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers
const config = require('./config/index.js');
// init app
const app = express();

app.use(bodyParser.urlencoded({extended: false})); // to support URL-encoded bodies
app.use(bodyParser.json()); // to support JSON-encoded bodies

//routes
app.use(express.static("frontend"));

app.listen(config.port); // listen port (config/index.js)
console.log('Listening on ' + config.port);
