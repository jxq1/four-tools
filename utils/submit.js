import {cytaster,imaginary_point,phaseList} from './const.js'
// 判断虚点和常用星体是否填写
// export const xingtiOrXuDian = (err) => {
// 	for(var i=0; i<err.length; i++){
// 		if(err[i].key !== "star" && err[i].key !== "imag_point"){
// 			return err[i].errorMessage
// 		}else{
// 			if(err[i].key === "star"){
// 				for(var j=0;j<err.length;j++){
// 					if(err[j].key == "imag_point"){
// 						return "星体或虚点没有选择"
// 					}
// 				}
// 			}
// 		}
// 	}
// }
// 判断虚点和常用星体是否填写
export const xingtiOrXuDian = (formData) =>{
	if(formData.star.length==0 && formData.imag_point.length==0){
		// 常用星体和虚点同时为空，报错
		return 0;
	}else{
		return 1;
	}
}
 // 连接计算点
 export const concatPoint = (dots) =>{
	 let du = String(dots.du);
	 let fen = String(dots.fen);
	 let miao = String(dots.miao);
	 du = du.length !== 1 ? du : '0'+du;
	 fen = fen.length !==1 ? fen : '0'+fen;
	 miao = miao.length !==1 ? miao : '0'+miao;
	 return String(du).concat("-").concat(fen).concat("-").concat(miao); 
 }
 
 // 连接常用星体的函数
 export const concatStar = (star) =>{
	 // console.log(star);
	 let com_star = "";
	 for(let i = 0 ; i < star.length;i++ ){
		 com_star = com_star.concat(starMap(cytaster[star[i]].text));
		 if(i!=(star.length-1) && cytaster[star[i]].text!="全选"){
			com_star = com_star.concat(",")
		 }
	 }
	 // let com_star = []
	 // for(let i = 0 ; i < star.length;i++ ){
		// com_star.push(String(cytaster[star[i]].text))
	 // }
	 return com_star;
 }
 
 // 连接虚点的函数
 export const concatVirtualPoint = (point) =>{
 	 // console.log(star);
 	 let vir_point = "";
 	 for(let i = 0 ; i < point.length;i++ ){
 		 vir_point = vir_point.concat(virtualMap(imaginary_point[point[i]].text));
 		 if(i!=(point.length-1) && imaginary_point[point[i]].text!="全选" ){
 			vir_point = vir_point.concat(",")
 		 }
 	 }
 	 return vir_point;
 }
 
 // 连接相位的函数
 export const concatPhase = (mode,phase)=>{
	 let phase_position = "";
	 
	 for(let i = 0 ; i < phase.length; i++){
		 // if()
		 // phase_position = phase_position.concat(mode).concat("-f").concat(phase[i].pro).concat("-").concat(phase[i].data).concat("-a").concat(phase[i].later);
		phase_position = phase_position.concat(String("f").concat(phase[i].pro).concat("-").concat(phase[i].data).concat("-a").concat(phase[i].later));
		if(i!=(phase.length-1)){
			phase_position = phase_position.concat(",");
		}
	 }
	 
	 return phase_position;
 }
 
 // 星座中文和英文的一一映射
function constellationMap(name){
	 switch(name){
		case "白羊座":
			name = "aries"
			break;
		case "金牛座":
			name = "taurus"
			break;
		case "双子座":
			name = "gemini"
			break;
		case "巨蟹座":
			name = "cancer"
			break;
		case "狮子座":
			name = "leo"
			break;
		case "处女座":
			name = "virgo"
			break;
		case "天秤座":
			name = "libra"
			break;
		case "天蝎座":
			name = "scorpio"
			break;
		case "射手座":
			name = "sagittarius"
			break;
		case "摩羯座":
			name = "capricorn"
			break;
		case "水瓶座":
			name = "aquarius"
			break;
		case "双鱼座":
			name = "pisces"
			break;
		default:
			break;
	 }
	 return name;
 }
 
 // 连接上升点的函数,e1为传过来的星座，e2为传过来的度数
 export const raisPoint = (e1,dots) => {
	 let du = String(dots.du);
	 let fen = String(dots.fen);
	 let miao = String(dots.miao);
	 du = du.length !== 1 ? du : '0'+du;
	 fen = fen.length !==1 ? fen : '0'+fen;
	 miao = miao.length !==1 ? miao : '0'+miao;
	 return String(constellationMap(e1)).concat("_").concat(du).concat("-").concat(fen).concat("-").concat(miao); 
 }
 
 // 常用星体中文和英文的一一映射
 function starMap(name){
	 switch(name){
	 		case "太阳":
	 			name = "sun"
	 			break;
	 		case "月亮":
	 			name = "moon"
	 			break;
	 		case "水星":
	 			name = "mercury"
	 			break;
	 		case "金星":
	 			name = "venus"
	 			break;
	 		case "火星":
	 			name = "mars"
	 			break;
	 		case "木星":
	 			name = "jupiter"
	 			break;
	 		case "土星":
	 			name = "saturn"
	 			break;
	 		case "天王星":
	 			name = "uranus"
	 			break;
	 		case "海王星":
	 			name = "neptune"
	 			break;
	 		case "冥王星":
	 			name = "pluto"
	 			break;
	 		case "凯龙星":
	 			name = "chiron"
	 			break;
			case "全选":
				name = ""
				break;
	 		default:
	 			break;
	 }
	 return name;
 }
 
 // 常用虚点中文和英文的一一映射
 function virtualMap(name){
 	 switch(name){
 	 		case "南交点":
 	 			name = "north_intersection"
 	 			break;
 	 		case "北交点":
 	 			name = "south_intersection"
 	 			break;
 	 		case "莉莉丝":
 	 			name = "lilith"
 	 			break;
			case "全选":
				name = ""
				break;
 	 		default:
 	 			break;
 	 }
 	 return name;
 }
 
 