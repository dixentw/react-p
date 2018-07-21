var express = require('express');
var app = express();
var fetcher = require('./backend/fetch.js')

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/hot', (req, res) => {
    fetcher.fetchHotBoard().then((data)=>{
        res.status(200).json(data);
    });
});

app.get('/api/alist/:url', (req, res) => {
    fetcher.fetchArticleList(req.params.url).then((val)=>{
        res.status(200).json(val);
    });
});

app.get('/api/article/:url', (req, res) => {
    fetcher.fetchArticle(req.params.url).then((val)=>{
        res.status(200).json(val);
    });
});

app.get('*', function(req, res){
    res.send('what???', 404);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
