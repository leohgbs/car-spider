// 车型配置字段匹配

// 	brandName: "品牌名"
// 	lineName: "车系"
// 	lineId:  "车系id"
// 	modelId: "车型id"
let fieldMaps = [
	{
		name: "基本参数",
		keys: [
			{ name: "车型名称", key: "baseModelName" },
			{ name: "厂商指导价(元)", key: "baseGuidePrice" },
			{ name: "厂商", key: "baseManufacturer" },
			{ name: "级别", key: "baseLevel" },
			{ name: "能源类型", key: "baseEnergyType" },
			{ name: "上市时间", key: "baseTimeToMarket" },
			{ name: "最大功率(kW)", key: "baseMaxPower" },
			{ name: "最大扭矩(N·m)", key: "baseMaxTorque" },
			{ name: "发动机", key: "baseEngine" },
			{ name: "变速箱", key: "baseGearbox" },
			{ name: "长*宽*高(mm)", key: "baseSize" },
			{ name: "车身结构", key: "baseCarBody" },
			{ name: "最高车速(km/h)", key: "baseMaxSpeed" },
			{ name: "官方0-100km/h加速(s)", key: "baseOfficialAcceleration" },
			{ name: "实测0-100km/h加速(s)", key: "baseActualAcceleration" },
			{ name: "实测100-0km/h制动(m)", key: "baseActualBrake" },
			{ name: "工信部综合油耗(L/100km)", key: "baseOfficialFuelConsumption" },
			{ name: "实测油耗(L/100km)", key: "baseActualFuelConsumption" },
			{ name: "整车质保", key: "baseWarrantyTime" }
		]
	},{
		name: "车身",
		keys: [
			{ name: "长度(mm)", key: "bodyLength" },
			{ name: "宽度(mm)", key: "bodyWidth" },
			{ name: "高度(mm)", key: "bodyHeight" },
			{ name: "轴距(mm)", key: "bodyWheelbase" },
			{ name: "前轮距(mm)", key: "bodyFrontWheelTread" },
			{ name: "后轮距(mm)", key: "bodyBackWheelTread" },
			{ name: "最小离地间隙(mm)", key: "bodyMinGroundClearance" },
			{ name: "车身结构", key: "bodyStructure" },
			{ name: "车门数(个)", key: "bodyDoorNum" },
			{ name: "座位数(个)", key: "bodySeatNum" },
			{ name: "油箱容积(L)", key: "bodyTankVolume" },
			{ name: "行李厢容积(L)", key: "bodySuitcaseSize" },
			{ name: "整备质量(kg)", key: "bodyWeight" }
		]
	},{
		name: "发动机",
		keys: [
			{ name: "发动机型号", key: "engineModel" },
			{ name: "排量(mL)", key: "engineDisplacementMl" },
			{ name: "排量(L)", key: "engineDisplacementL" },
			{ name: "进气形式", key: "engineInletModels" },
			{ name: "气缸排列形式", key: "engineCylinderArrangement" },
			{ name: "气缸数(个)", key: "engineCylinderNum" },
			{ name: "每缸气门数(个)", key: "enginePerCylinderNum" },
			{ name: "压缩比", key: "engineCompressionRatio" },
			{ name: "配气机构", key: "engineAirSupply" },
			{ name: "缸径(mm)", key: "engineCylinderDiameter" },
			{ name: "行程(mm)", key: "engineStoke" },
			{ name: "最大马力(Ps)", key: "engineMaxHorsepower" },
			{ name: "最大功率(kW)", key: "engineMaxPower" },
			{ name: "最大功率转速(rpm)", key: "engineMaxPowerRotatingSpeed" },
			{ name: "最大扭矩(N·m)", key: "engineMaxTorque" },
			{ name: "最大扭矩转速(rpm)", key: "engineMaxTorqueRotatingSpeed" },
			{ name: "发动机特有技术", key: "engineUniqueTech" },
			{ name: "燃料形式", key: "engineFuelType" },
			{ name: "燃油标号", key: "engineFuelLabel" },
			{ name: "供油方式", key: "engineOilSupplyType" },
			{ name: "缸盖材料", key: "engineCylinderHeadMaterial" },
			{ name: "缸体材料", key: "engineCylinderBodyMaterial" },
			{ name: "环保标准", key: "engineEnvironmentalStandards" }
		]
	},{
		name: "变速箱",
		keys: [
			{ name: "挡位个数", key: "gearboxGearsNum" },
			{ name: "变速箱类型", key: "gearboxType" },
			{ name: "简称", key: "gearboxAbbreviation" }
		]
	},{
		name: "底盘转向",
		keys: [
			{ name: "驱动方式", key: "chassisSteeringDriveMode" },
			{ name: "四驱形式", key: "chassisSteeringDriveForm" },
			{ name: "中央差速器结构", key: "chassisSteeringDifferentialStructure" },
			{ name: "前悬架类型", key: "chassisSteeringFrontSuspensionType" },
			{ name: "后悬架类型", key: "chassisSteeringBackSuspensionType" },
			{ name: "助力类型", key: "chassisSteeringAssistType" },
			{ name: "车体结构", key: "chassisSteeringBodyStructure" }
		]
	},{
		name: "车轮制动",
		keys: [
			{ name: "前制动器类型", key: "wheelBrakeFrontType" },
			{ name: "后制动器类型", key: "wheelBrakeBackType" },
			{ name: "驻车制动类型", key: "wheelBrakeParkingType" },
			{ name: "前轮胎规格", key: "wheelBrakeFrontTireSpec" },
			{ name: "后轮胎规格", key: "wheelBrakeBackTireSpec" },
			{ name: "备胎规格", key: "wheelBrakeSpareTireSpec" }
		]
	},{
		name: "主/被动安全装备",
		keys: [
			{ name: "主/副驾驶座安全气囊", key: "safetyEquipmentMainAirbag" },
			{ name: "前/后排侧气囊", key: "safetyEquipmentSideAirbag" },
			{ name: "前/后排头部气囊(气帘)", key: "safetyEquipmentHeadAirbag" },
			{ name: "膝部气囊", key: "safetyEquipmentLapAirbag" },
			{ name: "后排安全带式气囊", key: "safetyEquipmentBeltAirbag" },
			{ name: "后排中央安全气囊", key: "safetyEquipmentCentralAirbag" },
			{ name: "被动行人保护", key: "safetyEquipmentPassivePedestrianProtection" },
			{ name: "胎压监测功能", key: "safetyEquipmentPressureMonitor" },
			{ name: "零胎压继续行驶", key: "safetyEquipmentZeroPressureContinueToDrive" },
			{ name: "安全带未系提醒", key: "safetyEquipmentSeatBeltRemind" },
			{ name: "ISOFIX儿童座椅接口", key: "safetyEquipmentISOFIX" },
			{ name: "制动力分配(EBD/CBC等)", key: "safetyEquipmentBrakePowerDistribution" },
			{ name: "ABS防抱死", key: "safetyEquipmentABS" },
			{ name: "刹车辅助(EBA/BAS/BA等)", key: "safetyEquipmentBrakeAssist" },
			{ name: "牵引力控制(ASR/TCS/TRC等)", key: "safetyEquipmentTractionControl" },
			{ name: "车身稳定控制(ESC/ESP/DSC等)", key: "safetyEquipmentBodyStabilityControl" },
			{ name: "并线辅助", key: "safetyEquipmentParallelAssist" },
			{ name: "车道偏离预警系统", key: "safetyEquipmentLaneDepartureWarn" },
			{ name: "车道保持辅助系统", key: "safetyEquipmentLaneKeepAssist" },
			{ name: "道路交通标志识别", key: "safetyEquipmentTrafficSignRecognition" },
			{ name: "主动刹车/主动安全系统", key: "safetyEquipmentActiveSafetySys" },
			{ name: "夜视系统", key: "safetyEquipmentNightVisionSys" },
			{ name: "疲劳驾驶提示", key: "safetyEquipmentFatigueDrivingTips" }
		]
	},{
		name: "辅助/操控配置",
		keys: [
			{ name: "前/后驻车雷达", key: "auxiliaryConfParkingRadar" },
			{ name: "驾驶辅助影像", key: "auxiliaryConfDrivingAssistanceImage" },
			{ name: "倒车车侧预警系统", key: "auxiliaryConfReverseSideWarnSys" },
			{ name: "巡航系统", key: "auxiliaryConfCruiseSys" },
			{ name: "驾驶模式切换", key: "auxiliaryConfDrivingModeSwitching" },
			{ name: "自动泊车入位", key: "auxiliaryConfAutomaticParking" },
			{ name: "发动机启停技术", key: "auxiliaryConfEngineStartStopTech" },
			{ name: "自动驾驶技术", key: "auxiliaryConfAutopilotTech" },
			{ name: "自动驻车", key: "auxiliaryConfAutomaticParking" },
			{ name: "上坡辅助", key: "auxiliaryConfUphillAssist" },
			{ name: "陡坡缓降", key: "auxiliaryConfSteepSlope" },
			{ name: "可变悬架功能", key: "auxiliaryConfVariableSuspension" },
			{ name: "空气悬架", key: "auxiliaryConfAirSuspension" },
			{ name: "电磁感应悬架", key: "auxiliaryConfElectromagneticInductionSuspension" },
			{ name: "可变转向比", key: "auxiliaryConfVariableSteeringRatio" },
			{ name: "中央差速器锁止功能", key: "auxiliaryConfCentralDifferentialLock" },
			{ name: "整体主动转向系统", key: "auxiliaryConfOverallActiveSteering" },
			{ name: "限滑差速器/差速锁", key: "auxiliaryConfLimitedSlip" },
			{ name: "涉水感应系统", key: "auxiliaryConfWaterSensingSys" }
		]
	},{
		name: "外部/防盗配置",
		keys: [
			{ name: "天窗类型", key: "antiTheftSunroofType" },
			{ name: "运动外观套件", key: "antiTheftSportsLookKit" },
			{ name: "轮圈材质", key: "antiTheftWheelMaterial" },
			{ name: "电动吸合车门", key: "antiTheftElectricSuctionDoor" },
			{ name: "侧滑门形式", key: "antiTheftSideDoorForm" },
			{ name: "电动后备厢", key: "antiTheftElectricTrunk" },
			{ name: "感应后备厢", key: "antiTheftInductionTrunk" },
			{ name: "电动后备厢位置记忆", key: "antiTheftInductionTrunkPositionMemory" },
			{ name: "尾门玻璃独立开启", key: "antiTheftTailgateGlassOpen" },
			{ name: "车顶行李架", key: "antiTheftRoofRack" },
			{ name: "发动机电子防盗", key: "antiTheftEngine" },
			{ name: "车内中控锁", key: "antiTheftCentralLock" },
			{ name: "钥匙类型", key: "antiTheftKeyType" },
			{ name: "无钥匙启动系统", key: "antiTheftKeylessStartSys" },
			{ name: "无钥匙进入功能", key: "antiTheftKeylessEntry" },
			{ name: "主动闭合式进气格栅", key: "antiTheftIntakeGrille" },
			{ name: "远程启动功能", key: "antiTheftRemoteStart" },
			{ name: "车侧脚踏板", key: "antiTheftSidePedal" }
		]
	},{
		name: "内部配置",
		keys: [
			{ name: "方向盘材质", key: "innerSteeringWheelMaterial" },
			{ name: "方向盘位置调节", key: "innerSteeringWheelPosition" },
			{ name: "多功能方向盘", key: "innerMultifunctionSteeringWheel" },
			{ name: "方向盘换挡", key: "innerSteeringWheelShift" },
			{ name: "方向盘加热", key: "innerSteeringWheelHeating" },
			{ name: "方向盘记忆", key: "innerSteeringWheelMemory" },
			{ name: "行车电脑显示屏幕", key: "innerDrivingComputerDisplayScreen" },
			{ name: "全液晶仪表盘", key: "innerFullLCDInstrumentPanel" },
			{ name: "液晶仪表尺寸", key: "innerLCDMeterSize" },
			{ name: "HUD抬头数字显示", key: "innerHUD" },
			{ name: "内置行车记录仪", key: "innerBuiltInDrivingRecorder" },
			{ name: "主动降噪", key: "innerActiveNoiseReduction" },
			{ name: "手机无线充电功能", key: "innerWirelessCharging" },
			{ name: "电动可调踏板", key: "innerElectricAdjustablePedal" }
		]
	},{
		name: "座椅配置",
		keys: [
			{ name: "座椅材质", key: "seatMaterial" },
			{ name: "运动风格座椅", key: "seatSporty" },
			{ name: "主座椅调节方式", key: "seatMainSeatAdjustment" },
			{ name: "副座椅调节方式", key: "seatSubSeatAdjustment" },
			{ name: "主/副驾驶电动调节", key: "seatDrivingElectricAdjustment" },
			{ name: "前排座椅功能", key: "seatFrontSeatFunction" },
			{ name: "电动座椅记忆功能", key: "seatElectricSeatMemory" },
			{ name: "副驾驶位后排可调节按钮", key: "seatRearSeatAdjustableBtn" },
			{ name: "第二排座椅调节", key: "seatSecondRowSeatAdjustment" },
			{ name: "后排座椅电动调节", key: "seatRearSeatElectricAdjustment" },
			{ name: "后排座椅功能", key: "seatRearSeatFunction" },
			{ name: "后排小桌板", key: "seatRearTable" },
			{ name: "第二排独立座椅", key: "seatIndependentSeats" },
			{ name: "座椅布局", key: "seatLayout" },
			{ name: "后排座椅放倒形式", key: "seatRearSeatDown" },
			{ name: "后排座椅电动放倒", key: "seatRearSeatElectricDown" },
			{ name: "前/后中央扶手", key: "seatCentralArmrest" },
			{ name: "后排杯架", key: "seatRearCupHolder" },
			{ name: "加热/制冷杯架", key: "seatHeatingCoolingCupHolder" }
		]
	},{
		name: "多媒体配置",
		keys: [
			{ name: "中控彩色液晶屏幕", key: "multimediaCentralLCDScreen" },
			{ name: "GPS导航系统", key: "multimediaGPS" },
			{ name: "导航路况信息显示", key: "multimediaNavigationTrafficInfo" },
			{ name: "道路救援呼叫", key: "multimediaRoadRescueCall" },
			{ name: "中控液晶屏分屏显示", key: "multimediaCentralLCDScreenDisplay" },
			{ name: "蓝牙/车载电话", key: "multimediaBluetoothCarPhone" },
			{ name: "手机互联/映射", key: "multimediaMobileInterconnection" },
			{ name: "语音识别控制系统", key: "multimediaSpeechRecognition" },
			{ name: "手势控制", key: "multimediaGestureControl" },
			{ name: "车联网", key: "multimediaCarNetworking" },
			{ name: "车载电视", key: "multimediaCarTV" },
			{ name: "后排液晶屏幕", key: "multimediaRearLCDScreen" },
			{ name: "后排控制多媒体", key: "multimediaRearControlMultimedia" },
			{ name: "外接音源接口类型", key: "multimediaExternalAudioInterfaceType" },
			{ name: "USB/Type-C接口数量", key: "multimediaUSBNum" },
			{ name: "车载CD/DVD", key: "multimediaCarCD" },
			{ name: "220V/230V电源", key: "multimediaPowerSupply" },
			{ name: "行李厢12V电源接口", key: "multimedia12VPowerInterface" },
			{ name: "扬声器品牌名称", key: "multimediaSpeakerBrand" },
			{ name: "扬声器数量", key: "multimediaSpeakerNum" }
		]
	},{
		name: "灯光配置",
		keys: [
			{ name: "近光灯光源", key: "lightLowBeamSource" },
			{ name: "远光灯光源", key: "lightHighBeamSource" },
			{ name: "灯光特色功能", key: "lightHighBeamFunction" },
			{ name: "LED日间行车灯", key: "lightLED" },
			{ name: "自适应远近灯", key: "lightAdaptive" },
			{ name: "自动头灯", key: "lightAutomaticHead" },
			{ name: "转向辅助灯", key: "lightSteeringAuxiliary" },
			{ name: "转向头灯", key: "lightSteeringHead" },
			{ name: "车前雾灯", key: "lightFrontFog" },
			{ name: "前大灯雨雾模式", key: "lightRainFogMode" },
			{ name: "大灯高度可调", key: "lightHeightAdjustable" },
			{ name: "大灯清洗装置", key: "lightCleaningDevice" },
			{ name: "大灯延时关闭", key: "lightDelayOff" },
			{ name: "触摸式阅读灯", key: "lightTouchReading" },
			{ name: "车内环境氛围灯", key: "lightInteriorEnvironmentAtmosphere" }
		]
	},{
		name: "玻璃/后视镜",
		keys: [
			{ name: "前/后电动车窗", key: "glassElectricWindow" },
			{ name: "车窗一键升降功能", key: "glassWindowLifting" },
			{ name: "车窗防夹手功能", key: "glassWindowAntiPinch" },
			{ name: "防紫外线玻璃", key: "glassUVProtection" },
			{ name: "多层隔音玻璃", key: "glassMultiLayerAcoustic" },
			{ name: "外后视镜功能", key: "glassExteriorMirror" },
			{ name: "内后视镜功能", key: "glassInteriorMirror" },
			{ name: "后风挡遮阳帘", key: "glassRearWindshieldSunshade" },
			{ name: "后排侧窗遮阳帘", key: "glassRearSideWindshieldSunshade" },
			{ name: "后排侧隐私玻璃", key: "glassRearSidePrivacy" },
			{ name: "车内化妆镜", key: "glassInteriorMirror" },
			{ name: "后雨刷", key: "glassRearWiper" },
			{ name: "感应雨刷功能", key: "glassInductionWiper" },
			{ name: "可加热喷水嘴", key: "glassHeatableWaterSpout" }
		]
	},{
		name: "空调/冰箱",
		keys: [
			{ name: "空调温度控制方式", key: "airConditioningTemperatureControl" },
			{ name: "后排独立空调", key: "airConditioningRearIndependent" },
			{ name: "后座出风口", key: "airConditioningRearSeatOutlet" },
			{ name: "温度分区控制", key: "airConditioningTemperatureZoneControl" },
			{ name: "车载空气净化器", key: "airConditioningCarAirPurifier" },
			{ name: "车内PM2.5过滤器", key: "airConditioningPMFilter" },
			{ name: "负离子发生器", key: "airConditioningNegativeIonGenerator" },
			{ name: "车内香氛装置", key: "airConditioningInteriorFragranceDevice" },
			{ name: "车载冰箱", key: "airConditioningCarRefrigerator" }
		]
	}
]

module.exports =  fieldMaps
