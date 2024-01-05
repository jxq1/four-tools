// 加减周或月时间函数
export const datetimeAddOrSub=(datatime,type,timeRange) => {
	let returntime={};
	var timestr = datatime.slice(0,10)
	var timeyear = parseInt(datatime.slice(0,4))
	var timemonth = parseInt(datatime.slice(5,7))
	var timeday = parseInt(datatime.slice(8,10))
	var timenext = datatime.slice(10)
	console.log("datetimestart",datatime)
	console.log("str"+timestr+timeyear)
	let days = getMonthDay(timeyear,timemonth)
	if(type==0){
		// 加时间
		if(timeRange==1){
			// 加周数
			// let days = this.getMonthDay(timeyear,timemonth)
			let tempday = timeday+7;
			if(days==30){
				if(tempday>30){
					// 如果加7天就到下月份
					tempday = tempday-30;
					timeday = tempday;
					timemonth = timemonth+1;
				}else{
					// 加7天还是在上月份
					timeday = tempday
				}
			}else if(days == 31){
				if(tempday>31){
					// 如果加7天就到下月份
					if(timemonth==12){
						// 如果在12月份，需要到下一年
						timeyear = timeyear + 1;
						timemonth = 1;
					}else{
						timemonth = timemonth+1;
					}
					tempday = tempday-31;
					timeday = tempday;
				}else{
					// 加7天还是在上月份
					timeday = tempday
				}
			}else if(days ==28){
				if(tempday>28){
					// 如果加7天就到下月份
					tempday = tempday-28;
					timeday = tempday;
					timemonth = timemonth+1;
				}else{
					// 加7天还是在上月份
					timeday = tempday
				}
			}else if(days == 29){
				if(tempday>29){
					// 如果加7天就到下月份
					tempday = tempday-29;
					timeday = tempday;
					timemonth = timemonth+1;
				}else{
					// 加7天还是在上月份
					timeday = tempday
				}
			}
		}else if(timeRange==2){
			// 加月份
			if(timemonth == 12){
				// 如果为12月份，年份要加一
				timeyear = timeyear + 1;
				timemonth = 1;
			}else{
				timemonth = timemonth +1;
			}
		}
		// timeyear = timeyear + 10*timeRange;
		
		timeyear = String(timeyear);
		if(timemonth<10){
			timemonth = String(0).concat(String(timemonth));
		}else{
			timemonth = String(timemonth);
		}
		if(timeday<10){
			timeday = String(0).concat(String(timeday));
		}else{
			timeday = String(timeday);
		}
		
		
		returntime.datetimeend = timeyear.concat("-").concat(timemonth).concat("-").concat(timeday).concat(timenext)
		// this.formData.datetimeend = timeyear.concat(timenext)
		returntime.datetimeEndClick = true;
		// this.datetimeStartClick = false;
	}else if(type == 1){
		// 减时间
		if(timeRange==1){
			// 减周数
			// let days;
			
			console.log("days"+timemonth+days)
			let tempday = timeday-7;
			console.log("tempday",tempday)
			if(tempday>0){
				// 减7天后还在这月份
				timeday = tempday;
			}else{
				// 减7天后在上月份了
				if(timemonth==1){
					days=getMonthDay(timeyear,12)
					timeyear = timeyear-1;
					timemonth = 12;
				}else{
					days=getMonthDay(timeyear,timemonth-1)
					timemonth = timemonth-1;
				}
				tempday = 7-timeday;
				console.log("需减时间"+tempday)
				if(days==31){
					timeday = 31-tempday;
				}else if(days==30){
					timeday = 30-tempday;
				}else if(days==29){
					timeday = 29-tempday;
				}else if(days==28){
					timeday = 28-tempday;
				}
			}
		}else if(timeRange==2){
			// 减月份
			if(timemonth == 1){
				// 如果为1月份，年份要减一，月份变为12
				timeyear = timeyear - 1;
				timemonth = 12;
			}else{
				timemonth = timemonth -1;
			}
		}
		// timeyear = timeyear - 10*timeRange;
		timeyear = String(timeyear);
		if(timemonth<10){
			timemonth = String(0).concat(String(timemonth));
		}else{
			timemonth = String(timemonth);
		}
		if(timeday<10){
			timeday = String(0).concat(String(timeday));
		}else{
			timeday = String(timeday);
		}
		returntime.datetimestart = timeyear.concat("-").concat(timemonth).concat("-").concat(timeday).concat(timenext)
		returntime.datetimeStartClick = true;
		// this.datetimeEndClick = false;
	}
	return returntime;
}
// 计算某年的某月有多少天
function getMonthDay (year,month){
	let days = [31,28,31,30,31,30,31,30,30,31,30,31] 
	  if ( (year % 4 ===0) && (year % 100 !==0 || year % 400 ===0) ) {
	        days[1] = 29
	  }
	  console.log("days1",days)
	　return days[month-1]  
}

// 判断结束时间是否大于起始时间
export const isEndDyStart = (startTime,endTime)=>{
	// var timestr = datatime.slice(0,10)
	var timeyear1 = parseInt(startTime.slice(0,4))
	var timeyear2 = parseInt(endTime.slice(0,4))
	var timemonth1 = parseInt(startTime.slice(5,7))
	var timemonth2 = parseInt(endTime.slice(5,7))
	var timeday1 = parseInt(startTime.slice(8,10))
	var timeday2 = parseInt(endTime.slice(8,10))
	var timeshi1 = parseInt(startTime.slice(11,13))
	var timeshi2 = parseInt(endTime.slice(11,13))
	var timefen1 = parseInt(startTime.slice(14,16))
	var timefen2 = parseInt(endTime.slice(14,16))
	var timemiao1 = parseInt(startTime.slice(17))
	var timemiao2 = parseInt(endTime.slice(17))
	if(timeyear1>timeyear2){
		// 结束年小于起始年
		return 0;
	}else if(timeyear1==timeyear2 && timemonth1>timemonth2){
		// 起始年等于结束年但结束月小于起始月
		return 0;
	}else if(timeyear1==timeyear2 && timemonth1==timemonth2 && timeday1>timeday2){
		// 起始年等于结束年,结束月等于起始月，但结束日小于起始日
		return 0;
	}else if(timeyear1==timeyear2 && timemonth1==timemonth2 && timeday1==timeday2 && timeshi1>timeshi2){
		return 0;
	}else if(timeyear1==timeyear2 && timemonth1==timemonth2 && timeday1==timeday2 && timeshi1==timeshi2 && timefen1>timefen2){
		return 0;
	}else if(timeyear1==timeyear2 && timemonth1==timemonth2 && timeday1==timeday2 && timeshi1==timeshi2 && timefen1==timefen2 && timemiao1>timemiao2){
		return 0;
	}else{
		return 1;
	}
	
}

// 判断起始时间和结束时间是否在[1770,2049]区间
export const isTimeSection = (startTime,endTime)=>{
	var timeyear1 = parseInt(startTime.slice(0,4))
	var timeyear2 = parseInt(endTime.slice(0,4))
	if(timeyear1<1770 || timeyear2>2049){
		return 0;
	}else{
		return 1;
	}
}