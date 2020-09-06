'use strict'
var fs = require("fs");
//var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
const bunyan = require('bunyan');
const userProfile = require('./helpers/userProfile');
const action = require('./action/actionDelegator');
const log = bunyan.createLogger({ name: "serverPage" });
//var cors = require('cors');
var app = express();
//app.use(cors);
const userFiles = './user_upload/';
app.use(function (req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:4200', 'http://localhost:4200'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ verify: verifyRequest }));

var exStcOptions = {
  dotfiles: 'ignore',
  extensions: ['htm', 'html', 'png', 'css'],
  index: false,
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
    res.header('X-FRAME-OPTIONS', 'ALLOW-FROM ' + 'http://localhost4200');
    res.setHeader('Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');

  }
}

var exStcOptions1 = {
  dotfiles: 'ignore',
  extensions: ['htm', 'html', 'png', 'css', 'js'],
  index: false,
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static(__dirname, exStcOptions1));
app.use(express.static('views', exStcOptions));

app.set('port', (process.env.PORT || 5050));


app.get('/', function (req, res) {

  res.send('Hello world, what a day today');
});

if (module === require.main) {
  app.listen(app.get('port'), function (req, res) {
    console.log('running on port', app.get('port'));
  })
}

app.options('/webviewpost', async function (req, res) {
  console.log("options request received from webview.");

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Headers", "accept, content-type, CharacterEncoding, Cache-Control");
  res.setHeader("Cache-Control", "private, max-age=0, no-cache, no-store");
  res.sendStatus(200);

});

app.post('/webviewpost', async function (req, res) {
  console.log("post request received from webviewpost. and req is %s", req);
  let actions = await action.actionDelegators(req, res);
  console.log("post request received from webviewpost. and req is %s", actions);
  await handleResponseData(actions, req, res);

});


// Sending Response to User
async function handleResponseData(msgToShow, req, res) {
  var data = {
    "Data": " "
  };
  if (msgToShow != "" && msgToShow != undefined && msgToShow != null) {
    data["Data"] = msgToShow;
  } else {
    data["Data"] = "I don't understand what is this info for.";
  }
  res.json(data);
};


function verifyRequest(req, res, buf, encoding) {
  console.log("req.url is: , %s", req.url)
  if (req.url == '/webviewpost') {
    console.log("verifyRequest :: Allow this request. It came from webviewpost!")
  }
}
