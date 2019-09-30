const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.get('/', (req, res) => { res.render('index'); });
app.get('/login', (req, res) => { res.render('login'); });

app.get('/pdf-1', (req, res) => {
  fs.readFile(path.resolve(__dirname, './static/TopoJSON-2013.pdf'), function (err, data) {
     res.contentType('application/pdf');
     res.send(data);
  });
});

app.get('/pdf-2', function(req, res, next) {
  const filename = 'TopoJSON-2013.pdf';
  const stream = fs.ReadStream(path.resolve(__dirname, `./static/${filename}`));

  // Be careful of special characters (use encodeURIComponent)
  res.setHeader('Content-disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
  res.setHeader('Content-type', 'application/pdf');

  stream.pipe(res);
});

app.get('/webm-2', function(req, res, next) {
  const filename = 'site-video-3.webm';
  const stream = fs.ReadStream(path.resolve(__dirname, `./static/${filename}`));

  // Be careful of special characters (use encodeURIComponent)
  res.setHeader('Content-disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
  res.setHeader('Content-type', 'application/webm');

  stream.pipe(res);
});

app.get('/pdf-3', function(req, res) {
  const filename = 'TopoJSON-2013.pdf';

  res.sendFile(path.resolve(__dirname, `./static/${filename}`));
});

app.listen(3000, () => console.log('Express is listening on port 3000'));
