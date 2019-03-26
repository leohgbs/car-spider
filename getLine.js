/*
* 根据首字母爬取所有车系,存入表 Line
* https://www.autohome.com.cn/car
 */
var request = require('request'),
	iconv = require('iconv-lite'),
	cheerio = require('cheerio'),
	async = require("async"),
	fs = require('fs'),
	JSONStream = require('JSONStream'),
  sql = require("./sql");

// 注意没有 U
const CHARS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];

let getBrandUrls = function () {
	let out = [];
	for (var char of CHARS) {
		out.push('http://www.autohome.com.cn/grade/carhtml/' + char + '.html');
	}
	return out
}

let getLineByUrl = function (url, callback) {
	console.info("抓取品牌 url: ", url)
	request({
		url: url,
		encoding: null
	}, function (err, res, body) {
		if (err || res.statusCode != 200) {
			console.error("抓取品牌 url 失败: ", url)
			return false;
		}
		let html = iconv.decode(body, 'gb2312')
		let $ = cheerio.load(html);
		let $lines = $('dl');
		let totalLines = $lines.length;
		for (var i = 0; i < totalLines; i++) {
			let brandName = $lines.eq(i).find('dt div a').text();
			let $curSeries = $lines.eq(i).find('h4 a');
			for (var j = 0; j < $curSeries.length; j++) {
				let item =  $curSeries.eq(j)
				let lineUrl = "https:" + item.attr('href')
				let tmp = lineUrl.replace("https://www.autohome.com.cn/", "")
				let lineId = tmp.split("/")[0]
				saveLine(brandName, lineId, item.text(), lineUrl)
			}
		}
		console.error("抓取品牌 url 成功: ", url)
		callback(null, url + 'Call back content');
	});
};

let saveLine = function (brandName, lineId, lineName, lineUrl) {
	let addData = [brandName, lineId, lineName, lineUrl]
	sql(`INSERT INTO Line(brandName, lineId, lineName, lineUrl) VALUES(?,?,?,?)`, addData)
}

let getLine = function() {
	let brandUrls = getBrandUrls();
	async.mapLimit(brandUrls, 1, function (url, callback) {
		getLineByUrl(url, callback);
	}, function () {
		console.info('--------------------------');
		console.info('车系抓取完毕！');
	});
}

getLine();