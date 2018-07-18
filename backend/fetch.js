'use strict'

var https = require('https');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

module.exports = {
    fetchHotBoard : function(){
        let options = {
            hostname : 'www.ptt.cc',
            port : 443,
            path : '/bbs/hotboards.html',
            method : 'GET'
        };
        let rawHTML;
        return new Promise(((resolve, reject) => {
            const httpReq = https.request(options, (outsideRes) => {
                outsideRes.on('data', function (chunk) {
                var buf = iconv.decode(chunk, 'big5');
                    rawHTML += buf;
                });
                outsideRes.on('end', function(){
                    var result = [];
                    var doms = cheerio.load(rawHTML);
                    doms(".b-list-container > div").each((idx, elm) => {
                        var resultObj = {};
                        resultObj.link = doms(elm).children().attr('href');
                        doms(elm).children().children().each((i, e) => {
                            if(i == 0){
                                resultObj.boardName = doms(e).text();
                            }else if(i == 1){
                                resultObj.hotness = parseInt(doms(e).text().match('-*[0-9]+')[0]);
                            }else if(i == 3){
                                resultObj.boardCap = doms(e).text();
                            }
                        });
                        result.push(resultObj);
                    });
                    resolve(JSON.stringify(result));
                })
            });
            httpReq.on('error', (err) => {
                reject(err);
            });
            httpReq.end();
        }));
    },
    rawHtmlToData : function(rawHTML){
        var result = [];
        var doms = cheerio.load(rawHTML);
        doms(".r-list-container > .r-ent").each(function(idx, e){
            var tmpObj = {};
            tmpObj.link = doms(e).children('.title').children().attr('href');
            tmpObj.title = doms(e).children('.title').text();
            tmpObj.nrec = doms(e).children('.nrec').text();
            tmpObj.date = doms(e).children('.meta').children('.date').text();
            tmpObj.author = doms(e).children('.meta').children('.author').text();
            result.push(tmpObj);
        });
        return result.reverse();
    },
    fetchArticleList : function(url, page, callback){
        try{
            var options = {
                    hostname : 'www.ptt.cc',
                    headers : {Cookie : 'over18=1'},
                    port : 443,
                    path : url,
                    method : 'GET'
            };
            var rawHTML;
            var me = this;
            var httpReq = https.request(options, function(outsideRes) {
                    outsideRes.on('data', function (chunk) {
                        rawHTML += chunk;
                    });
                    outsideRes.on('end', function(){
                        if(page > 1){
                            var doms = cheerio.load(rawHTML);
                            var link = 'default';
                            doms('#action-bar-container a').each(function(idx, e){
                                if(doms(this).text() == '‹ 上頁'){
                                    link = doms(this).attr('href');
                                }
                            });
                            console.log(">>>> : " + link);
                            console.log("number : " + link.match(/\d+/)[0]);
                            var pttPageCount = link.match(/index\d+/)[0].match(/\d+/)[0];
                            var neededPageCount = pttPageCount - (page - 2);
                            console.log("need number : " + neededPageCount);
                            var neededLink = link.replace(pttPageCount, neededPageCount);
                            options.path = neededLink;
                            rawHTML = "";
                            var shttpReq = https.request(options, function(res){
                                res.on('data', function(chunk){
                                    rawHTML += chunk;
                                });
                                res.on('end', function(){
                                    callback(JSON.stringify(me.rawHtmlToData(rawHTML)));
                                })
                            });
                            shttpReq.end();
                        }else{
                            callback(JSON.stringify(me.rawHtmlToData(rawHTML)));
                        }
                    })
            });
            httpReq.end();
        }catch(e){
            console.log(e.message);
            callback(e.message);
        }
    },

    fetchArticle : function(url, callback){
        try{
            var options = {
                    hostname : 'www.ptt.cc',
                    headers : {Cookie : 'over18=1'},
                    port : 443,
                    path : url,
                    method : 'GET'
            };
            var rawHTML;
            var httpReq = https.request(options, function(outsideRes) {
                    outsideRes.on('data', function (chunk) {
                        rawHTML += chunk;
                    });
                    outsideRes.on('end', function(){
                        var result = [];
                        var doms = cheerio.load(rawHTML);
                        var warp = {"rawData" : doms("#main-container").html()};
                        callback(JSON.stringify(warp));
                    })
            });
            httpReq.end();
        }catch(e){
            console.log(e.message);
            callback(e.message);
        }
    }
}
