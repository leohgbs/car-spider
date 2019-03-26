var sql = require('./sql')
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'
var util = require("./util")

witeToMongo()
function witeToMongo() {
	sql(`SELECT Config.*, Line.brandName bName, Line.lineName lName from Config LEFT JOIN Line ON Config.lineId=Line.lineId`).then(results=>{
		results = results.map(row => (row.content = JSON.parse(row.content), row));

		console.info(`共 ${results.length} 条数据`)
		console.info(`开始导出,请稍后...`)
		let all = []
		results.forEach((item)=>{
			all.push(util.formatOneConfig(item))
		})
		insertMongo(all)
	});
}

function insertMongo(all) {
	mongo.connect(url, (err, client) => {
		if (err) {
			console.error(err)
			return
		}
		const db = client.db('car')
		const collection = db.collection('carConfig')
		collection.insertMany(all, (err, result) => {
			if (err) {
				console.error(err)
			} else {
				console.log("导出 mongodb 成功")
			}
		})
	})
}