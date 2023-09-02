// index.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const app = express();
const accepts = require('accepts');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// your first API endpoint...
app.get('/api/whoami', function(req, res) {
  const ipAddress = req.ip; // This retrieves the client's IP address
  // Parse the "accept-language" header from the request
  const accept = accepts(req);

  // Get the client's preferred language
  const preferredLanguage = accept.language()[0] || 'en'; // Default to 'en' if not specified

  const userAgent = req.headers['user-agent'] || '';
  res.json({ ipaddress: ipAddress, language: preferredLanguage, software: userAgent });
});

// listen for requests :)
const listener = app.listen(process.env['PORT'] || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
