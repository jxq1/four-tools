// const BASE_URL = 'http://mini-tools.bingqiyi.com'
const BASE_URL  = 'http://test-minitools-api.bingqiyi.com'
// const BASE_URL  = 'http://10.17.2.149:9010/'
export const myRequest = (options) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url:BASE_URL+options.url,
			// url:'/api'+options.url,
			// url:options.url,
			method:options.method || 'GET',
			data:options.data || {},
			timeout: 3600000, //超时时间为1个小时
			success:(res)=>{
				console.log(res)
				if(res.data.msg!=="success"){
					return uni.showToast({
						title:'获取数据失败'
					})
				}
				resolve(res)
				// if (res){
				// 	if ((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode === 304) {
				// 		if (res.data) {
				// 			resolve(res.data);
				// 		}
				// 	} else if (res.statusCode === 500) {
				// 		uni.showToast({
				// 			title: '系统繁忙，请稍后重试',
				// 			duration: 2000,
				// 			icon: 'none'
				// 		})
				// 		// return;
				// 		resolve(res.statusCode);
				// 	} else if (res.statusCode === 401 || res.statusCode === 404) {
						
				// 		resolve(res.statusCode);
				// 	} else {
				// 		if (res.data && res.data.msg) {
				// 			uni.showToast({
				// 				title: res.data.msg,
				// 				duration: 2000,
				// 				icon: 'none'
				// 			})
				// 		}
				// 		return;
				// 	}
				// }
			},
			fail:(err)=>{
				console.log("err"+err)
				uni.showToast({
					title:'请求接口失败'
				})
				// uni.hideLoading();
				reject(err)
			},
			 complete: (complete) => {  
			    console.log(complete.statusCode)
				  if(complete.statusCode!=200){
					  reject(complete);
				  }
			}
		})
	})
}