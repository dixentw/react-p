'use strict'

const https = require('https');
const cheerio = require('cheerio');
const request = require('request');

module.exports = {
    fetch(url) {
        let reqOpts = {
            url : `https://www.ptt.cc${url}`,
            method : 'GET',
            headers : {
                'Cookie' : 'over18=1',
            }
        };
        return new Promise((resolve, reject) => {
            request(reqOpts, (err, response, body) => {
                if(err) {
                    reject(err);
                }
                if(response && response.statusCode !==200){
                    reject(`some thing wrong - ${response}`);
                }
                resolve(body);
            });
        });
    },

    fetchHotBoard() {
        return this.fetch('/bbs/hotboards.html')
        .then((raw) => {
            let doms = cheerio.load(raw);
            const res = doms(".b-list-container > div").map((i, el) => {
                let resultObj = {};
                resultObj.link = doms(el).children().attr('href');
                doms(el).children().children().each((i, e) => {
                    if(i == 0){
                        resultObj.boardName = doms(e).text();
                    }else if(i == 1){
                        resultObj.hotness = parseInt(doms(e).text().match('-*[0-9]+')[0]);
                    }else if(i == 3){
                        resultObj.boardCap = doms(e).text();
                    }
                });
                return resultObj;
            }).get();
            return Promise.resolve(res);
        });
    },

    fetchArticleList(u) {
        return this.fetch(u)
        .then((raw) => {
            let doms = cheerio.load(raw);
            let next = '';
            doms('#action-bar-container  a').each((_, e) => {
                if(doms(e).text() == '‹ 上頁'){
                    next = doms(e).attr('href');
                }
            });
            return Promise.resolve({
                next: next,
                data: this.rawHtmlToData(doms),
            });
        });
    },

    rawHtmlToData(doms) {
        let result = [];
        let entries = doms('.r-list-container').children();
        for(let i=0; i<entries.length; i++) {
            if (doms(entries[i]).hasClass('r-list-sep')) {
                break;
            }
            if (doms(entries[i]).hasClass('search-bar')) {
                continue;
            }
            result.push({
                link:  doms(entries[i]).children('.title').children().attr('href'),
                title: doms(entries[i]).children('.title').text(),
                nrec: doms(entries[i]).children('.nrec').text(),
                date: doms(entries[i]).children('.meta').children('.date').text(),
                author: doms(entries[i]).children('.meta').children('.author').text(),
            });
        }
        return result.reverse();
    },

    fetchArticle(url) {
        return this.fetch(url)
        .then((raw) => {
            var doms = cheerio.load(raw);
            return Promise.resolve({
                'rawData' : doms('#main-container').html()
            });
        });
    }
}