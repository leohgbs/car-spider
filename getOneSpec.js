var util = require("./util")
var sql = require("./sql")
var getCarConf = require("./getCarConf");

let modelId = process.env.id
if (!modelId) {
	console.error("id 参数必须: id=xxx node getOneSpec.js")
	return
}

let url = `https://car.autohome.com.cn/config/spec/${modelId}.html`
getCarConf(url, true).then((res)=> {
	let formatRes = util.formatCarConf(res);
	for (let mid in formatRes) {
		if (mid == modelId) {
			formatOneSpec(formatRes[mid], res.lineId, mid)
		}
	}
}).catch((e)=> {
	console.error(`获取 ${modelId} 失败`);
})

function formatOneSpec(content, lineId, modelId) {
	if (lineId) {
		sql(`SELECT brandName bName,lineName lName from Line where lineId=?`, [lineId]).then(res=>{
			let detail = null
			if (res && res[0] && res[0].bName) {
				detail = util.formatOneConfig({
					bName: res[0].bName,
					lName: res[0].lName,
					lineId: lineId,
					modelId: modelId,
					content: JSON.stringify(content)
				});
			} else {
				detail = util.formatOneConfig({
					lineId: lineId,
					modelId: modelId,
					content: JSON.stringify(content)
				});
			}
			console.log(detail)
			process.exit(0)
		});
	} else {
		console.log(util.formatOneConfig({
			lineId: lineId,
			modelId: modelId,
			content: JSON.stringify(content)
		}));
		process.exit(0)
	}
}