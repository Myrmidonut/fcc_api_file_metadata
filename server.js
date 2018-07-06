'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require("multer");
var upload = multer();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// .single(fieldname)
// req.file
//   fieldname	  Field name specified in the form	
//   originalname	Name of the file on the user's computer	
//   encoding	    Encoding type of the file	
//   mimetype	    Mime type of the file	
//   size	        Size of the file in bytes

// {"name": ..., "type": ..., "size": ...}
// {"name":"package-lock.json","type":"application/json","size":18017}

// form: name="upfile" POST

app.post("/api/fileanalyse", upload.single("upfile"), function(req, res) {
  res.json({"name": req.file.originalname, "type": req.file.mimetype, "size": req.file.size});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});