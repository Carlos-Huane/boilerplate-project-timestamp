// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  res.json({unix: new Date().getTime(), utc: new Date()});
});

app.get("/api/:timestamp", function (req, res) {
  let timestamp = req.params.timestamp;
  let date = new Date(Number(timestamp)).toUTCString();
if(!isNaN(Number(timestamp)) && timestamp.toString().length === 13) {
  console.log("aqui la validación1-->", !isNaN(Number(timestamp)) && timestamp.toString().length === 13)
  console.log("timestamp: ", timestamp);

  console.log("aqui el resultado date->", new Date(Number(timestamp)))
  return res.json ({
    unix: timestamp,
    utc: date,
  })
}else if(date !== 'Invalid Date') {
  console.log("aqui la validación2-->", !isNaN(Number(timestamp)) && timestamp.toString().length === 13)

  return res.json({
    unix: new Date(timestamp).getTime(),
    utc: date,
  })
} else {
  console.log("aqui la validación3-->", !isNaN(Number(timestamp)) && timestamp.toString().length === 13)
  res.json({error: 'Invalid Date'});
}
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
