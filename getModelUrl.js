/*
 * 根据 Line 表中的 lineId 爬取部分车型 modelId
 * 例如 lineId = 3170 
 * https://www.autohome.com.cn/3170
 * 有3个地方需要抓取数据
 * 1. 在售: 元素 (#specWrap-2 dd) 下的所有的 modelId
 * 2. 没有在售: 元素 .car_detail 下的 modelId
 * 3. 在售的停售款: https://www.autohome.com.cn/3170/sale.html, 元素 .car_detail 下的 modelId
 */
var request = require('request'),
	iconv = require('iconv-lite'),
	cheerio = require('cheerio'),
	async = require("async"),
	fs = require('fs'),
	JSONStream = require('JSONStream'),
	sql = require("./sql");

const SLEEP = 50;

let sleep = function (numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

var getModelByLineUrl = function (line, callback) {
	let lineUrl = line["lineUrl"]
	let lineId = line["lineId"]
	var startTime = Date.now();
	request({
		url: lineUrl,
		encoding: null // gbk转码关键代码
	}, function (err, res, body) {
		if (err || res.statusCode != 200) {
			console.error('车系页面失败: ', lineUrl)
			callback(null, lineUrl + 'Call back content');
			return false;
		}

		var html = iconv.decode(body, 'gb2312')
		var $ = cheerio.load(html);

		// 类型1 (在售)
		if ($('#specWrap-2 dd')[0] || $('#haltList')[0]) {
			var totalItem = $('#specWrap-2 dd');
			for (let i = 0; i < totalItem.length; i++) {
				let year = totalItem.eq(i).find(".name-param a").eq(0).text().substr(0, 4)
				let yearId = totalItem.eq(i).find(".name-param p").eq(0).attr("id")
				let modelId = yearId.replace("spec_", "")
				saveModel(lineId, modelId, year)
			}
		} else {
			// 类型2(都是停售)
			$(".car_detail").each(function () {
				let wrap = $(this).find(".modtab1 .name_d .name")
				let $a = wrap.find('a').eq(0)
				let modelId = $a.attr('href').split("/")[1]
				let year = $a.text().substr(0, 4)
				saveModel(lineId, modelId, year)
			})
		}

		// 停售
		request({
			url: `https://www.autohome.com.cn/${lineId}/sale.html`,
			encoding: null
		}, function (err, res, body) {
			if (err || res.statusCode != 200) {
				console.error('车系停售页面失败: ', lineId)
			} else {
				let html = iconv.decode(body, 'gb2312')
				let $ = cheerio.load(html);
				$(".car_detail").each(function () {
					let wrap = $(this).find(".modtab1 .name_d .name")
					let $a = wrap.find('a').eq(0)
					let modelId = $a.attr('href').split("/")[1]
					let year = $a.text().substr(0, 4)
					saveModel(lineId, modelId, year)
				})
			}
		})

		console.info(`${lineId} 抓取成功, 耗时 ${Date.now() - startTime} ms`);
		sleep(SLEEP);
		callback(null, lineUrl + 'Call back content');
	});
};

let saveModel = function (lineId, modelId, year) {
	try {
		let addData = [lineId, modelId, year]
		sql(`select modelId from Model where modelId=?`, [modelId]).then(res=>{
			if (!(res && res[0] && res[0].modelId)) {
				sql(`INSERT INTO Model(lineId, modelId, year) VALUES(?,?,?)`, addData)
			}
		})
	} catch (e){}
}

let getModelUrl = function () {
	let search = `SELECT * FROM Line`
	sql(search).then((res)=>{
		async.mapLimit(res, 20, function (line, callback) {
			getModelByLineUrl(line, callback);
		}, function () {
			console.info('----------------------------');
			console.info('部分车型详细配置 url 抓取完毕');
		});
	})
}

getModelUrl()