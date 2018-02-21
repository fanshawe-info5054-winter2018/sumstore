const express = require('express'); // Fast, unopinionated, minimalist web framework
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers
const config = require('./config/index.js');
// init app
const app = express();

app.use(bodyParser.urlencoded({extended: false})); // to support URL-encoded bodies
app.use(bodyParser.json()); // to support JSON-encoded bodies

//routes
app.use(express.static("frontend"));

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || config.port, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}