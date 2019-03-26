var sql = require("./sql")
const fieldMap = require("./fieldMaps")

// sublist(array): {
// 	subname: 'xx'
// 	subvalue: 1 (○ 选配) 2 (● 标配)  "" (- 无)
// 	price: 200
// }
// 胎压监测功能
// 安全带未系提醒
// 驾驶辅助影像
let formatCarConf = function (res) {
	if (!res) {
		return {}
	}
	let confMap = {}
	if (res.conf) {
		res.conf.forEach((confItem)=> {
			confItem.paramitems.forEach((item)=> {
				item.valueitems.forEach((value, index)=> {
					if (!confMap[value.specid]) {
						confMap[value.specid] = {}
					}
					if (!confMap[value.specid][confItem.name]) {
						confMap[value.specid][confItem.name] = []
					}
					confMap[value.specid][confItem.name].push({
						name: item.name,
						value: value.value
					})
					// if (res.priceList && res.priceList[index]) {
					// 	confMap[value.specid]["经销商参考价"] = res.priceList[index]
					// }
				})
			})
		})
	}
	if (res.option) {
		res.option.forEach((confItem)=> {
			confItem.configitems.forEach((item)=> {
				item.valueitems.forEach((value)=> {
					if (!confMap[value.specid]) {
						confMap[value.specid] = {}
					}
					if (!confMap[value.specid][confItem.name]) {
						confMap[value.specid][confItem.name] = []
					}
					confMap[value.specid][confItem.name].push({
						name: item.name,
						value: value.value,
						sublist: value.sublist
					})
				})
			})
		})
	}
	if (res.color) {
		res.color.forEach((item)=>{
			confMap[item.specid].color = item.coloritems
		})
	}
	if (res.innerColor) {
		res.innerColor.forEach((item)=>{
			confMap[item.specid].innerColor = item.coloritems
		})
	}
	// fs.writeFileSync('db-test.json', JSON.stringify(confMap));
	return confMap
}

let saveConfigData = function (lineId, modelId, data) {
	// let created = new Date();
	let addData = [lineId, modelId, JSON.stringify(data)]

	sql(`select modelId from Config where modelId=?`, [modelId]).then(res=> {

		if (!(res && res[0] && res[0].modelId)) {
			sql(`INSERT INTO Config(lineId, modelId, content) VALUES(?,?,?)`, addData)
		}
	});
}

function findItemByName(source, name) {
	if (!source) {
		return null
	}
	let total = source.length
	for (let i = 0; i < total; i++) {
		if (source[i].name == name) {
			return source[i]
		}
	}
	return null
}

let formatOneConfig = function(item) {
	let tmp = {
		brandName: item.bName,
		lineName: item.lName,
		lineId: item.lineId,
		modelId: item.modelId
	}
	if (item.content) {
		let resObj = JSON.parse(item.content)
		// tmp.color = resObj.color
		// tmp.innerColor = resObj.innerColor
		fieldMap.forEach(h=>{
			let source = resObj[h.name]
			// console.log(h.name, source)
			h.keys.forEach(sub=>{
				let find = findItemByName(source, sub.name)
				if (find) {
					// console.log(name, find.value)
					// sublist(array): {
					// 	subname: 'xx'
					// 	subvalue: 1 (○ 选配) 2 (● 标配)  "" (- 无)
					// 	price: 200
					// }
					if (find.value) {
						tmp[sub.key] = find.value
					} else {
						if (find.sublist) {
							let subOut = []
							let subTotal = find.sublist.length
							for (let i = 0; i < subTotal; i++) {
								let subitem = find.sublist[i]
								let tmpName = subitem.subname.replace("○", "○")
								let namePre =  ''
								if (subitem.subvalue == 1) {
									namePre = "●" + tmpName
									subOut.push()
								} else if (subitem.subvalue == 2) {
									namePre = "○" + tmpName
								} else {
									namePre = "-"
								}
								if (subitem.price > 0) {
									namePre += `(￥${subitem.price})`
								}
								subOut.push(namePre)
							}
							tmp[sub.key] = [].concat(subOut)
						} else {
							tmp[sub.key] = "-"
						}
					}
				} else {
					tmp[sub.key] = "-"
				}
			})
		})
	}
	return tmp
}

module.exports =  {
	formatCarConf: formatCarConf,
	saveConfigData: saveConfigData,
	formatOneConfig: formatOneConfig
}
