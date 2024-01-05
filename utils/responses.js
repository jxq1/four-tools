// 星座与图片地址的映射
export const constellationMapImg = (name) => {
	let conImg = "";
	switch(name){
			case "白羊座":
				conImg = "../../../../static/xinzuo/白羊.png"
				break;
			case "金牛座":
				conImg = "../../../../static/xinzuo/金牛.png"
				break;
			case "双子座":
				conImg = "../../../../static/xinzuo/双子.png"
				break;
			case "巨蟹座":
				conImg = "../../../../static/xinzuo/巨蟹.png"
				break;
			case "狮子座":
				conImg = "../../../../static/xinzuo/狮子.png"
				break;
			case "处女座":
				conImg = "../../../../static/xinzuo/处女.png"
				break;
			case "天秤座":
				conImg = "../../../../static/xinzuo/天秤.png"
				break;
			case "天蝎座":
				conImg = "../../../../static/xinzuo/天蝎.png"
				break;
			case "射手座":
				conImg = "../../../../static/xinzuo/射手.png"
				break;
			case "摩羯座":
				conImg = "../../../../static/xinzuo/摩羯.png"
				break;
			case "水瓶座":
				conImg = "../../../../static/xinzuo/水瓶.png"
				break;
			case "双鱼座":
				conImg = "../../../../static/xinzuo/双鱼.png"
				break;
			default:
				conImg = ""
				break;
	}
	return conImg;
}
// 常用星体中文和英文的一一映射
 export const starYingwMap = (name)=>{
	 switch(name){
	 		case "sun":
	 			name = "太阳"
	 			break;
	 		case "moon":
	 			name = "月亮"
	 			break;
	 		case "mercury":
	 			name = "水星"
	 			break;
	 		case "venus":
	 			name = "金星"
	 			break;
	 		case "mars":
	 			name = "火星"
	 			break;
	 		case "jupiter":
	 			name = "木星"
	 			break;
	 		case "saturn":
	 			name = "土星"
	 			break;
	 		case "uranus":
	 			name = "天王星"
	 			break;
	 		case "neptune":
	 			name = "海王星"
	 			break;
	 		case "pluto":
	 			name = "冥王星"
	 			break;
	 		case "chiron":
	 			name = "凯龙星"
	 			break;
			case "north_intersection":
				name = "南交点"
				break;
			case "south_intersection":
				name = "北交点"
				break;
			case "lilith":
				name = "莉莉丝"
				break;
			case "全选":
				name = ""
				break;
	 		default:
	 			break;
	 }
	 return name;
 }

// 行星与图片地址的映射
export const xingXingMapImg = (name) => {
	let conImg = "";
	switch(name){
			case "北交点":
				conImg = "../../../../static/xingxing/北交.png"
				break;
			case "海王星":
				conImg = "../../../../static/xingxing/海王星.png"
				break;
			case "火星":
				conImg = "../../../../static/xingxing/火星.png"
				break;
			case "金星":
				conImg = "../../../../static/xingxing/金星.png"
				break;
			case "凯龙星":
				conImg = "../../../../static/xingxing/凯龙星.png"
				break;
			case "莉莉丝":
				conImg = "../../../../static/xingxing/莉莉丝.png"
				break;
			case "冥王星":
				conImg = "../../../../static/xingxing/冥王星.png"
				break;
			case "木星":
				conImg = "../../../../static/xingxing/木星.png"
				break;
			case "南交点":
				conImg = "../../../../static/xingxing/南交.png"
				break;
			case "上升":
				conImg = "../../../../static/xingxing/上升.png"
				break;
			case "水星":
				conImg = "../../../../static/xingxing/水星.png"
				break;
			case "太阳":
				conImg = "../../../../static/xingxing/太阳.png"
				break;
			case "天底":
				conImg = "../../../../static/xingxing/天底.png"
				break;
			case "天顶":
				conImg = "../../../../static/xingxing/天顶.png"
				break;
			case "天王星":
				conImg = "../../../../static/xingxing/天王星.png"
				break;
			case "土星":
				conImg = "../../../../static/xingxing/土星.png"
				break;
			case "下降":
				conImg = "../../../../static/xingxing/下降.png"
				break;
			case "月亮":
				conImg = "../../../../static/xingxing/月亮.png"
				break;
			case "真实北交点":
				conImg = "../../../../static/xingxing/真实北交.png"
				break;
			default:
				conImg = ""
				break;
	}
	return conImg;
}
// 行星与图片地址的映射
export const xingXingYingwMapImg = (name) => {
	let conImg = "";
	switch(name){
			case "south_intersection":
				conImg = "../../../../static/xingxing/北交.png"
				break;
			case "neptune":
				conImg = "../../../../static/xingxing/海王星.png"
				break;
			case "mars":
				conImg = "../../../../static/xingxing/火星.png"
				break;
			case "venus":
				conImg = "../../../../static/xingxing/金星.png"
				break;
			case "chiron":
				conImg = "../../../../static/xingxing/凯龙星.png"
				break;
			case "lilith":
				conImg = "../../../../static/xingxing/莉莉丝.png"
				break;
			case "pluto":
				conImg = "../../../../static/xingxing/冥王星.png"
				break;
			case "jupiter":
				conImg = "../../../../static/xingxing/木星.png"
				break;
			case "north_intersection":
				conImg = "../../../../static/xingxing/南交.png"
				break;
			case "mercury":
				conImg = "../../../../static/xingxing/水星.png"
				break;
			case "sun":
				conImg = "../../../../static/xingxing/太阳.png"
				break;
			case "uranus":
				conImg = "../../../../static/xingxing/天王星.png"
				break;
			case "saturn":
				conImg = "../../../../static/xingxing/土星.png"
				break;
			case "moon":
				conImg = "../../../../static/xingxing/月亮.png"
				break;
			default:
				conImg = ""
				break;
	}
	return conImg;
}
// 分割星座和度数1
export const splitConDegree = (str) =>{
	return str.split("_");
}

// 分割星座和度数1
export const splitConDegreeStar = (str) =>{
	return str.split(" ");
}

// 分割度数
export const splitDegree = (str) =>{
	return str.split("-");
}

export const transformPhase = (str) => {
	let arr = str.split("-");
	let arr0 = arr[0].slice(1);
	let arr2 = arr[2].slice(1);
	let res = arr[1].concat(',前').concat(arr0).concat('°,后').concat(arr2).concat('°')
	// console.log(res)
	return res
}
// 下载表格
export const downloadFile= (curThis,url) =>{
	if(curThis.download_url==""){
		curThis.$myRequest({
			// url:'/moon_chain/calculate/index',
			url:url,
			method:'POST',
			data:curThis.download_option
		}).then(res => {
			console.log(res)
			if(res.data.data =='数据库查询为空'){
				uni.showToast({
					title:'数据无法下载'
				})
			}else{
				window.open(res.data.data.download_url)
			}
		})
	}else{
		if(res.data.data =='数据库查询为空'){
			uni.showToast({
				title:'数据无法下载'
			})
		}else{
			window.open(curThis.download_url)
		}
	}
	
}

export const moonPhaseMapImg = (name) => {
	let conImg = "";
	switch(name){
			case "满月":
				conImg = "../../../../static/yuexiang/满月.png"
				break;
			case "日食":
				conImg = "../../../../static/yuexiang/日食.png"
				break;
			case "月食":
				conImg = "../../../../static/yuexiang/月食.png"
				break;
			case "上弦月":
				conImg = "../../../../static/yuexiang/上弦月.png"
				break;
			case "下弦月":
				conImg = "../../../../static/yuexiang/下弦月.png"
				break;
			case "新月":
				conImg = "../../../../static/yuexiang/新月.png"
				break;
			case "半影月食":
				conImg = "../../../../static/yuexiang/半影月食.png"
				break;
			case "非中心日食":
				conImg = "../../../../static/yuexiang/非中心日食.png"
				break;
			case "日食环食":
				conImg = "../../../../static/yuexiang/日环食.png"
				break;
			case "日食偏食":
				conImg = "../../../../static/yuexiang/日偏食.png"
				break;
			case "日食全食":
				conImg = "../../../../static/yuexiang/日全食.png"
				break;
			case "月食偏食":
				conImg = "../../../../static/yuexiang/月偏食.png"
				break;
			case "月食全食":
				conImg = "../../../../static/yuexiang/月全食.png"
				break;
			default:
				conImg = ""
				break;
	}
	return conImg;
}