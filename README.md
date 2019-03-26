# 汽车之家 车型配置爬取

## 环境准备
- [安装node](https://nodejs.org/en/)
- 安装基本库
```
npm install
```

## mysql
- 配置文件 sql.js, 数据库: car_config(sql/car_config.sql)
- Line 表: 车系
- Model 表: 车型
- Config 表: 车型详情配置

## mongodb 导出
- 当前车型数据 car/
- mongodump -h localhost -d car -o toPath

# 功能
- getLine.js: 根据首字母爬取所有车系
- getModelUrl.js: 根据 Line 表中数据获取部分车型 modelId
- getConfig.js: 根据 Model 表中 modelId 获取所有车型详细配置(同一年份的车型配置都在一个详情页面,只需要获取其中一个 modelId 详情)
- updateByModelId.js: 根据 modelId 更新配置
```
id=5253 node updateByModelId.js
```
- exportMongo.js: 导出数据到 mongodb
- getOneSpec.js: 根据 modelId 获取详细配置
```
id=5253 node getOneSpec.js
```


