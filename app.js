const express = require('express');
const app = express();
const fetcher = require('./backend/fetch.js')
const mcache = require('memory-cache');

const cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cacheBody = mcache.get(key);
        if (cacheBody) {
            res.send(cacheBody);
            return;
        } else {
            res.originSend = res.send;
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.originSend(body);
            }
            next();
        }
    }
}

app.use(express.static('build'));

app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/hot', (req, res) => {
    fetcher.fetchHotBoard().then((data)=>{
        res.status(200).json(data);
    });
});

app.get('/api/alist/:url', cache(120) ,(req, res) => {
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
    res.status(404).send('what???');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
