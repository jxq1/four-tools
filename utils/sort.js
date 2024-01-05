// 升序排序
export const compareAsc= (p,q) => { //这是比较函数
    return function(m,n){
        var a = m[p][q];
        var b = n[p][q];
        return a - b; //升序
    }
}
// 降序排序
export const compareDes= (p,q) => { //这是比较函数
    return function(m,n){
        var a = m[p][q];
        var b = n[p][q];
        return b - a; //降序
    }
}
// 无排序，便是按序号排序
export const compareIndex= (index) => { //这是比较函数
    return function(m,n){
        var a = m[index];
        var b = n[index];
        return a - b; //升序
    }
}
// 时间升序排序
export const compareTimeAsc= (p) => { //这是比较函数
    return function(m,n){
        var a = m[p];
		var b = n[p];
		if(a=="无"){
			a = new Date('2049/12/31 12:12:12');
		}
        if(b=="无"){
			// let d = "2022/12/12 59:59:59"
			b = new Date('2049/12/31 12:12:12');
		}
		// let c =Date.parse(a) - Date.parse(b)
		return Date.parse(a) - Date.parse(b); //升序
    }
}
// 时间降序排序
export const compareTimeDes= (p) => { //这是比较函数
    return function(m,n){
        var a = m[p];
        var b = n[p];
		if(a=="无"){
			a = new Date('2049/12/31 12:12:12');
		}
		if(b=="无"){
			b = new Date('2049/12/31 12:12:12');
		}
		return Date.parse(b) - Date.parse(a); //降序
	}
}
// 星座排序
export const constellationSort=(name) => {
	let res;
	switch(name){
			case "白羊座":
				res = 1;
				break;
			case "金牛座":
				res = 2;
				break;
			case "双子座":
				res = 3;
				break;
			case "巨蟹座":
				res = 4;
				break;
			case "狮子座":
				res = 5;
				break;
			case "处女座":
				res = 6;
				break;
			case "天秤座":
				res = 7;
				break;
			case "天蝎座":
				res = 8;
				break;
			case "射手座":
				res = 9;
				break;
			case "摩羯座":
				res = 10;
				break;
			case "水瓶座":
				res = 11;
				break;
			case "双鱼座":
				res = 12;
				break;
			default:
				res = 13;
				break;
	}
	return res;
}

// 星体排序
export const starSort=(name) => {
	let res;
	switch(name){
			case "水星":
				res = 1;
				break;
			case "金星":
				res = 2;
				break;
			case "太阳":
				res = 3;
				break;
			case "火星":
				res = 4;
				break;
			case "木星":
				res = 5;
				break;
			case "土星":
				res = 6;
				break;
			case "天王星":
				res = 7;
				break;
			case "海王星":
				res = 8;
				break;
			case "冥王星":
				res = 9;
				break;
			default:
				res = 10;
				break;
	}
	return res;
}

// 宫位排序
export const houseSort=(name) => {
	let res;
	switch(name){
			case "1宫":
				res = 1;
				break;
			case "2宫":
				res = 2;
				break;
			case "3宫":
				res = 3;
				break;
			case "4宫":
				res = 4;
				break;
			case "5宫":
				res = 5;
				break;
			case "6宫":
				res = 6;
				break;
			case "7宫":
				res = 7;
				break;
			case "8宫":
				res = 8;
				break;
			case "9宫":
				res = 9;
				break;
			case "10宫":
				res = 10;
				break;
			case "11宫":
				res = 11;
				break;
			case "12宫":
				res = 12;
				break;
			default:
				res = 13;
				break;
	}
	return res;
}

// 元素排序
export const elementSort=(name) => {
	let res;
	switch(name){
			case "火":
				res = 1;
				break;
			case "土":
				res = 2;
				break;
			case "风":
				res = 3;
				break;
			case "水":
				res = 4;
				break;
			default:
				res = 5;
				break;
	}
	return res;
}
