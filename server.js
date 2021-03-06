'use strict';

const express = require('express');
const cors    = require('cors');
const multer  = require("multer");

const upload  = multer();
const app     = express();

app.use(cors());
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
});

app.get('/hello', (req, res) => {
  res.json({greetings: "Hello, API"})
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  });
});

app.listen(process.env.PORT || 3000, () => console.log('Node.js listening ...'));