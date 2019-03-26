// 根据 url 获取汽车 配置 json 及字典

const phantom = require('phantom');
const cheerio = require('cheerio');
const beautify = require('js-beautify').js;

const toReplace = `$InsertRule$($index$, $temp$);`;

module.exports = async function getCarConfByUrl(url, noDebug) {
	if (!noDebug) {
		console.info(`获取: ${url}`)
	}
	const instance = await phantom.create();
	const page = await instance.createPage();
	var status = await page.open(url);
	var configMap = [];
	var baseConf = null;
	var optionConf = null;
	var color = null;
	var innerColor = null;
	// 经销商参考价
	var cPriceList = [];
	var lineId = '';

	if ("success" == status) {

		await page.evaluate(function() {
			return {
				config: window.config,
				option: window.option,
				color: window.color,
				innerColor: window.innerColor
			};
		}).then(function(conf){
			if (!conf) {
				console.error(`获取${url}配置失败`)
			} else {
				if (conf.config) {
					baseConf = conf.config.result.paramtypeitems;
				}
				if (conf.option) {
					optionConf = conf.option.result.configtypeitems;
				}
				if (conf.color) {
					color = conf.color.result.specitems;
				}
				if (conf.innerColor) {
					innerColor = conf.innerColor.result.specitems;
				}
			}
		});

		let html = await page.property("content");

		// 获取 head 中的字典(一个)
		const replaceTo = `;if(!window.confMap) { window.confMap = []};window.confMap.push({ key: $index$, value: $temp$ });` + toReplace;
		var headKeyMapScriptContent = getScriptContent(html, 'head', [replaceTo]);
		// fs.writeFile(`head-map.js`, headKeyMapScriptContent[0])
		await page.evaluateJavaScript("function headMap(){ " + headKeyMapScriptContent[0] + "}")
		await page.evaluate(function () {
			return window.confMap;
		}).then(function (confMap) {
			if (confMap) {
				configMap.push({
					name: 'head',
					keys: confMap
				})
			}
		})

		// 获取 body 中的字典(两个)
		const replaceToBody1 = `;if(!window.confMapBody0) { window.confMapBody0 = []};window.confMapBody0.push({ key: $index$, value: $temp$ });` + toReplace;
		const replaceToBody2 = `;if(!window.confMapBody1) { window.confMapBody1 = []};window.confMapBody1.push({ key: $index$, value: $temp$ });` + toReplace;
		var bodyKeyMapScriptContent = getScriptContent(html, 'body', [replaceToBody1, replaceToBody2]);
		var total = bodyKeyMapScriptContent.length;
		for (let i = 0; i < total; i++) {
			// fs.writeFile(`body-map-${i}.js`, bodyKeyMapScriptContent[i])
			await page.evaluateJavaScript("function bodyMap(){ " + bodyKeyMapScriptContent[i] + "}")
			var key =
			await page.evaluate(function (key) {
				return window[key];
			}, [`confMapBody${i}`]).then(function (confMap) {
				if (confMap) {
					configMap.push({
						name: 'body' + i,
						keys: confMap
					})
				}
			});
		}

		// 经销商参考价
		await page.evaluate(function () {
			window.priceList = [];
			$("#tr_2001 td").each(function () {
				if ($(this).text().indexOf("暂无报价") != -1) {
					window.priceList.push("暂无报价")
				} else {
					window.priceList.push($(this).find("a").text())
				}
			});
			return window.priceList;
		}).then(function (priceList) {
			if (priceList) {
				cPriceList = priceList
			}
		})

		// lineId
		await page.evaluate(function () {
			window.lineId = null;
			try {
				var lineUrl = $(".subnav-title-return a").attr("href")
				lineId = lineUrl.replace("//www.autohome.com.cn/", "").split("/")[0]
			} catch (e){}
			return window.lineId;
		}).then(function (id) {
			if (id) {
				 lineId = id
			}
		})
	} else {
		console.error(`获取配置失败: ${url}`)
		await instance.exit();
		return null
	}
	await instance.exit();
	var baseKeyMap = getMapItemByName(configMap, "body0")
	var translatedConf = replaceDataByMap(baseConf, baseKeyMap, "paramitems", "_config")
	var optionKeyMap = getMapItemByName(configMap, "body1")
	var translatedOption = replaceDataByMap(optionConf, optionKeyMap, "configitems", "_option")

	if (!noDebug) {
		console.info(`获取${url}配置成功`)
	}
	return {
		conf: translatedConf,
		option: translatedOption,
		color: color,
		innerColor: innerColor,
		priceList: cPriceList,
		lineId: lineId
	}
}

function getMapItemByName(mapSource, name) {
	var total = mapSource.length;
	for( let i = 0; i < total; i++) {
		if (mapSource[i].name == name) {
			return mapSource[i].keys
		}
	}
	return null
}

function replaceDataByMap(carConf, keyMap, key, separator) {
	if (!carConf) {
		return
	}
	carConf.forEach((group)=>{
		var total = group[key].length;
		for (let i = 0; i < total; i++) {
			var item = group[key][i];
			group[key][i].name = translateText(item.name, keyMap, separator);
			var totalValue = group[key][i].valueitems.length;
			for (let j = 0; j < totalValue; j++) {
				group[key][i].valueitems[j].value = translateText(group[key][i].valueitems[j].value, keyMap, separator)
				if (group[key][i].valueitems[j].sublist) {
					var totalSub = group[key][i].valueitems[j].sublist.length
					for (let k=0; k < totalSub; k++) {
						group[key][i].valueitems[j].sublist[k].subname = translateText(group[key][i].valueitems[j].sublist[k].subname, keyMap, separator)
					}
				}
			}
		}
	})
	return carConf
}

function translateText(text, keyMap, separator) {
	text = text.replace('<i class="icons-standard"></i>', '')
	var $ = cheerio.load(text);
	var children = $().children()[0].children
	var out = ""
	children.forEach((node)=>{
		if (node.type == "tag" && node.name == "span") {
			out += getRealNameByMap(node.attribs.class, keyMap, separator)
		} else if (node.type == "tag" && node.name == "i") {
				out += "●"
		} else if (node.type == "text") {
			out += node.data
		}
	})
	return out
}

function getRealNameByMap(name, keyMap, separator) {
	var realKey = name.replace("hs_kw", "")
	realKey = realKey.split(separator)[0]
	var out = name
	keyMap.forEach((item)=>{
		if (item.key == realKey) {
			out = item.value
		}
	});
	return out
}

// 获取 javascript 内容, 并替换关键字
function getScriptContent(html, parent, replaceTo) {
	var $ = cheerio.load(html);
	let keyword = toReplace
	let out = []
	var find = 0;
	$(`${parent} script`).each(function() {
		let content = $(this).text();
		if(content.indexOf(keyword) !== -1){
			let beautifulContent = beautify(content, {
				indent_size: 2,
				space_in_empty_paren: true
			});
			if (beautifulContent.indexOf(keyword) !== -1) {
				beautifulContent = beautifulContent.replace(toReplace, replaceTo[find]);
				out.push(beautifulContent);
				find ++;
			}
		}
	});
	return out;
}