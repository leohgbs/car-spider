var getCarConf = require("./getCarConf");
const async = require("async");
var sql = require("./sql")
var util = require("./util")

let search = `SELECT * FROM Model order by id desc;`
sql(search).then((models)=>{
	async.mapLimit(models, 20, function (item, callback) {
		let modelId = item.modelId
		let lineId = item.lineId

		let url = `https://car.autohome.com.cn/config/spec/${modelId}.html`
		getCarConf(url).then((res)=> {
			let formatRes = util.formatCarConf(res)
			console.info(`获取车系: ${lineId} , 车型: ${modelId} 成功`)
			for (let key in formatRes) {
				util.saveConfigData(lineId, key, JSON.stringify(formatRes[key]))
			}
			callback(null, url + 'Call back content');
		}).catch((e)=> {
			callback(null, url + 'Call back content');
			console.log(`获取 ${modelId} 失败`);
		})
	}, function() {
		console.log('----------------------------');
		console.log('详系配置抓取完毕');
	});
});