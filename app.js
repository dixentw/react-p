var express = require('express');
var app = express();
var fetcher = require('./backend/fetch.js')

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/hot', (req, res) => {
  fetcher.fetchHotBoard().then((data)=>{
    console.log(data);
    res.send(data);
  });
});

app.get('*', function(req, res){
  res.send('what???', 404);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
