// 根据 modelId 获取详细配置
// 例: id=5253 node getOneSpec.js

var util = require("./util")
var getCarConf = require("./getCarConf");

let modelId = process.env.id
if (!modelId) {
	console.error("id 参数必须: id=xxx node getOneSpec.js")
	return
}

let url = `https://car.autohome.com.cn/config/spec/${modelId}.html`
getCarConf(url).then((res)=> {
	try {
		let formatRes = util.formatCarConf(res);
		let lineId = res.lineId;
		console.info(`获取车系: ${lineId} , 车型: ${modelId} 成功`)
		console.info(`共 ${Object.keys(formatRes).length} 款车型配置`)
		for (let mid in formatRes) {
			util.saveConfigData(lineId, mid, JSON.stringify(formatRes[mid]))
		}
	} catch (e){}
}).catch((e)=> {
	console.log(`获取 ${modelId} 失败`);
})
