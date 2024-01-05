<template>
	<view class="ecliptic-content">
		<view class="require-form">
			<uni-forms class="require-uni-form" :modelValue="formData" :rules="rules"  ref="form">
				<uni-forms-item>
					<view class="warm-prompt">
						<image src="../../static/warning-circle-fill.png" mode="" class="warm-prompt-pro"></image>
						<text>温馨提示：本工具计算时默认使用的经度是东经120°</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="常用星体" name="star">
					<uni-data-checkbox multiple v-model="formData.star" :localdata="cytaster" @change="change(1,$event)"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="虚点" name="imag_point">
					<uni-data-checkbox multiple v-model="formData.imag_point" :localdata="imaginary_point" @change="change(2,$event)"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="时间范围" name="datetimestart">
					<view class="datatimeOrButton">
						<view class="data-time">
							<view class="data-time-select">
								<!-- <uni-datetime-picker
								 class="data-time-start"
								v-model="formData.datetimestart"
								placeholder="请选择开始日期时间"
								type="datetime"
								start="1900-3-20 12:00:00"
								end="2022-6-20 20:00:00"
								@change="changeDate(0,$event)"
								/> -->
								<date-time-picker class="data-time-start"
								:startYear='1770' :endYear='2049' :datestring="formData.datetimestart"
								type='datetime-all' placeholder="请选择开始日期时间"  @change='changeDate(0,$event)'>
								</date-time-picker>
								<view class="data-time-center">
									<text></text>
								</view>
								
								<uni-forms-item name="datetimeend">
									<!-- <uni-datetime-picker
									 class="data-time-end"
									v-model="formData.datetimeend"
									placeholder="请选择结束日期时间"
									type="datetime"
									start="1900-3-20 12:00:00"
									end="2022-6-20 20:00:00"
									@change="changeDate(1,$event)"
									/> -->
									<date-time-picker class="data-time-end"
									:startYear='1770' :endYear='2049' :datestring="formData.datetimeend"
									type='datetime-all' placeholder="请选择结束日期时间"  @change='changeDate(1,$event)'>
									</date-time-picker>
								</uni-forms-item>
								
							</view>
							<view class="data-time-button" v-show="isShowSelected">
								<view :class="[selectedYear[0] ? 'button-selected-year' : 'button-year']" class="select-time"  @click="dataTimeClick(1)">1周</view>
								<view :class="[selectedYear[1] ? 'button-selected-year' : 'button-year']" class="select-time" size="mini" @click="dataTimeClick(2)">1月</view>
							</view>
						</view>
						<view class="">
							<button @click="submit" :disabled="subDisabled" class="uni-form-button" :class="[subDisabled ? 'form-button-jinyong':'form-button-no-jinyong']">确定</button>
						</view>
					</view>
				</uni-forms-item>
				<!-- 温馨提示 -->
				<uni-popup ref="popup" type="message">
					 <uni-popup-dialog type="error" mode="base" title="温馨提示" :content='popupContent' :duration="0" :before-close="true" @close="close" ></uni-popup-dialog>
				</uni-popup>
			</uni-forms>
		</view>
		<view class="file-list-container" :style="{height:centerHeight+'px' }">
			<uni-table stripe class="file-table" emptyText="暂无更多数据" :style="{height:tableHeight+'px' }" >
				<!-- 表头行 -->
				<uni-thead>
					<uni-tr>
						<uni-th align="left" width="50" >序号</uni-th>
					    <uni-th align="left" width="80">星体</uni-th>
					    <uni-th align="left" width="160">起始时间</uni-th>
					    <uni-th align="left" width="160">终止时间</uni-th>
						<uni-th align="left" width="110">起始星座度数</uni-th>
						<uni-th align="left" width="115">终止星座度数</uni-th>
						<uni-th align="left" width="158">始逆时间</uni-th>
						<uni-th align="left" width="110">始逆星座度数</uni-th>
						<uni-th align="left" width="158">始顺时间</uni-th>
						<uni-th align="left" width="110">始顺星座度数</uni-th>
						<uni-th align="left" width="280">诸星相时间位置</uni-th>
						<uni-th align="left" width="100">赤纬</uni-th>
						<uni-th align="left" width="100">黄纬</uni-th>
					</uni-tr>
				</uni-thead>
				<uni-tbody v-if="isTableData">
					<uni-tr v-for="(item,index) in tableData" :key="item.id" >
						<uni-td width="50">{{item.index}}</uni-td>
						<uni-td width="80"><img :src="item.star.img" style='vertical-align:middle' class="xinzuo-img" />{{item.star.name}}</uni-td>
						<uni-td width="160">{{item.start_time}}</uni-td>
						<uni-td width="160">{{item.end_time}}</uni-td>
						<uni-td width="110"><img :src="item.start_astro.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item.start_astro.degree}}</uni-td>
						<uni-td width="115"><img :src="item.end_astro.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item.end_astro.degree}}</uni-td>
						<uni-td width="158">
							<view class="" v-for="(item1,index) in item.start_return_time" :key="index" >
								{{item1}}
							</view>
						</uni-td>
						<uni-td width="110">
							<view class="" v-for="(item1,index) in item.start_return_data" :key="index" >
								<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
						<uni-td width="158">
							<view class="" v-for="(item1,index) in item.start_asc_time" :key="index" >
								{{item1}}
							</view>
						</uni-td>
						<uni-td width="110">
							<view class="" v-for="(item1,index) in item.start_asc_data" :key="index" >
								<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
						<uni-td width="280">
							<view class="" v-for="(item1,index) in item.relation_astro_time_position" :key="index" >
								{{item1.star_status}}{{item1.time}}<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
						<uni-td width="100">{{item.decl}}</uni-td>
						<uni-td width="100">{{item.lat}}</uni-td>
					</uni-tr>
				</uni-tbody>
			</uni-table>
			<view class="table-download" @click="downloadFile" v-if="isTableData">
				<button type="default">下载结果</button>
			</view>
		</view>
		<view class="explain">
			<ecliptic-explain></ecliptic-explain>
		</view>
	</view>
</template>

<script>
	import {cytaster,imaginary_point,phaseList} from '../../utils/const.js'
	import eclipticExplain from "../../components/ecliptic-explain/ecliptic-explain.vue"
	import {concatStar,concatVirtualPoint,xingtiOrXuDian} from "../../utils/submit.js"
	import {constellationMapImg,xingXingMapImg,downloadFile} from "../../utils/responses.js"
	import {datetimeAddOrSub,isEndDyStart,isTimeSection} from "../../utils/form.js"
	import DateTimePicker from '@/components/jc-dateTimePicker/jc-dateTimePicker.vue';
	export default {
		components:{
			eclipticExplain,
			DateTimePicker
		},
		data(){
			return {
				formData:{
					star:[],
					imag_point:[],
					datetimestart:"",
					datetimeend:""
				},
				cytaster,
				imaginary_point,
				selectedYear:[false,false],
				datetimeStartClick:false,
				datetimeEndClick:false,
				// 是否显示要选择的时间
				isShowSelected:true,
				popupContent:"",
				tableData:[],
				isTableData:false,
				tableHeight:464,
				centerHeight:464,
				subDisabled:false,
				download_url:'',
				download_option:{},
				rules:{
					// star:{
					// 	rules:[
					// 		{
					// 		required: true,
					// 		errorMessage: '您未选择常用星体',
					// 		}
					// 	],
					// 	label:'星体',
					// 	validateTrigger:'submit'
					// },
					// imag_point:{
					// 	rules:[
					// 		{
					// 		required: true,
					// 		errorMessage: '您未选择虚点',
					// 		}
					// 	],
					// 	label:'虚点',
					// 	validateTrigger:'submit'
					// },
					datetimestart:{
						rules:[
							{
							required: true,
							errorMessage: '您未选择起始时间!',
							}
						],
						label:'起始时间',
						validateTrigger:'submit'
					},
					datetimeend:{
						rules:[
							{
							required: true,
							errorMessage: '您未选择结束时间!',
							}
						],
						label:'结束时间',
						validateTrigger:'submit'
					},
				}
			}
		},
		watch:{
			tableData(newval){
				if(!newval.length){
					this.isTableData = false;
				}else{
					let sunHeight = 0;
					for(let i=0; i<newval.length;i++){
						const arr = [newval[i].start_return_time.length,newval[i].start_asc_time.length,newval[i].relation_astro_time_position.length];
						let len = Math.max(...arr)
						if(len==1 || len==0){
							sunHeight = sunHeight+39;
						}else{
							sunHeight = sunHeight + (len-1)*22 + 39;
						}
					}
					if(sunHeight<=800){
						sunHeight = sunHeight+46;
					}else{
						sunHeight = 846
					}
					this.tableHeight = sunHeight;
					this.centerHeight = this.tableHeight+80;
					this.isTableData = true;
				}
			}
		},
		methods:{
			change(type,e){
				console.log("type",type)
			    console.log('e:',e);
				console.log('e.value:',e.detail.value);
				console.log("虚点：",this.formData.imag_point)
				var selectAll = e.detail.value.some((value,index)=>{
					return value===0
				})
				if(type===1){
					if(selectAll && !this.selectStarAll){
						this.formData.star = [0,1,2,3,4,5,6,7,8,9,10,11]
						this.selectStarAll = true;
					}else if(this.selectStarAll && selectAll==false){
						this.formData.star = []
						this.selectStarAll = false
					}else if(selectAll && this.selectStarAll){
						this.formData.star = this.formData.star.filter((value,index)=>{
							return value!=0;
						})
						this.selectStarAll = false
					}else if(!this.selectStarAll && e.detail.value.length==11){
						this.formData.star = [0,1,2,3,4,5,6,7,8,9,10,11]
						this.selectStarAll = true;
					}
					console.log("星体选择：",this.formData.star)
				}else if(type===2){
					if(selectAll && !this.selectImagAll){
						this.formData.imag_point = [0,1,2,3]
						this.selectImagAll = true;
					}else if(this.selectImagAll && selectAll==false){
						this.formData.imag_point = []
						this.selectImagAll = false
					}else if(selectAll && this.selectImagAll){
						this.formData.imag_point = this.formData.imag_point.filter((value,index)=>{
							return value!=0;
						})
						this.selectImagAll = false
					}else if(!this.selectImagAll && e.detail.value.length==3){
						this.formData.imag_point = [0,1,2,3]
						this.selectImagAll = true;
					}
				}
				console.log("虚点2：",this.formData.imag_point)
			},
			// 点击加减年限后需处理的函数
			dataTimeClick(timeRange){
				var a = this.selectedYear
				this.selectedYear = [false,false];
				for(var i=0;i<2;i++){
					if(i!==(timeRange-1)){
						// this.selectedYear[i] = false
						a[i] = false;
					}
				}
				this.selectedYear = a;
				this.selectedYear[timeRange-1] = !this.selectedYear[timeRange-1];
				console.log(this.selectedYear)
				if(this.datetimeStartClick && this.datetimeEndClick==false){
					// 选择了起始时间并且结束时间没有选择，然后选择了需要加的时间
					let datatime = datetimeAddOrSub(this.formData.datetimestart,0,timeRange)
					this.formData.datetimeend = datatime.datetimeend
					this.datetimeEndClick = datatime.datetimeEndClick;
					this.isShowSelected = false;
				}else if(this.datetimeEndClick && this.datetimeStartClick==false){
					// 选择了结束时间并且起始时间没有选择，然后选择了时间范围
					let datatime = datetimeAddOrSub(this.formData.datetimeend,1,timeRange)
					this.formData.datetimestart = datatime.datetimestart
					this.datetimeStartClick = datatime.datetimeStartClick;
					this.isShowSelected = false;
				}
			},
			// 点击时间控件后需处理的函数
			changeDate(type,e){
				console.log("触发了时间",e)
				
				if(type==0){
					// 点击起始时间
					this.formData.datetimestart = e;
					if(e != ""){
						this.datetimeStartClick = true;
					}else{
						this.datetimeStartClick = false;
						this.isShowSelected = true;
						this.selectedYear = [false,false];
					}
				}else if(type==1){
					// 点击结束时间
					this.formData.datetimeend = e;
					if(e != ""){
						this.datetimeEndClick = true;
					}else{
						this.datetimeEndClick = false;
						this.isShowSelected = true;
						this.selectedYear = [false,false];
					}
				}
				if(this.datetimeStartClick && this.datetimeEndClick){
					this.isShowSelected = false;
				}
			},
			submit(){
				console.log("点击提交表单了")
				
				this.$refs.form.validate().then(res=>{
					
				    console.log('表单数据信息：', res);
					let jianc = xingtiOrXuDian(this.formData)
					if(jianc==0){
						this.popupContent = "常用星体和虚点不能同时为空!";
						this.$refs.popup.open('center')
						return 
					}
					if(isEndDyStart(this.formData.datetimestart,this.formData.datetimeend)==0){
						this.popupContent = "起始时间不能大于结束时间!";
						this.$refs.popup.open('center')
						return 
					}
					if(isTimeSection(this.formData.datetimestart,this.formData.datetimeend)==0){
						this.popupContent = "目前系统支持的时间范围在[1770,2049]年!";
						this.$refs.popup.open('center')
						return 
					}
					this.subDisabled = true;
					uni.showLoading({
					    title: '数据加载中'
					});
					let com_star = concatStar(this.formData.star);
					let vir_point = concatVirtualPoint(this.formData.imag_point);
					let options = {
						"common_astro":com_star,
						"virtual_point":vir_point,
						"start_time":this.formData.datetimestart,
						"end_time":this.formData.datetimeend
					}
					this.tableData = []
					this.download_option = options;
					console.log(options)
					// 向服务器提交数据
					this.$myRequest({
						// url:'/moon_chain/calculate/index',
						url:'/ecliptic_position/v1_0_0/data',
						method:'POST',
						data:options
					}).then(res =>{
						console.log(res)
						// 获取后端传来的数据
						let resData = res.data.data
						if(res.statusCode!=200){
							this.subDisabled = false
							return
						}
						if(JSON.stringify(resData)==="{}"){
							uni.showToast({
								title:'未查找到相关数据'
							})
						}
						uni.hideLoading();
						this.download_url = resData.download_url
						console.log(resData);
						// 取出每条数据并映射
						this.tableData = [];
						var eclipticRes = resData.ecliptic_position_result;
						if(eclipticRes.length==0){
							
						}else{
							for(let i=0 ; i < eclipticRes.length ; i++){
								let resItem = {};
								resItem.index = i+1;
								resItem.start_time = resData.start_time;
								resItem.end_time = resData.end_time;
								// 星体
								resItem.star = {}
								resItem.star.img = xingXingMapImg(eclipticRes[i].star);
								resItem.star.name = eclipticRes[i].star;
								// 起始星座度数
								resItem.start_astro = {};
								resItem.start_astro.astroImg = constellationMapImg(eclipticRes[i].start_astro.astro);
								resItem.start_astro.degree = eclipticRes[i].start_astro.degree=="" ? "无":eclipticRes[i].start_astro.degree;
								// 终止星座度数
								resItem.end_astro = {};
								resItem.end_astro.astroImg = constellationMapImg(eclipticRes[i].end_astro.astro);
								resItem.end_astro.degree = eclipticRes[i].end_astro.degree=="" ? "无":eclipticRes[i].end_astro.degree;
								resItem.start_return_time=[]
								resItem.start_return_data=[]
								if(eclipticRes[i].start_return.length==0){
									// 没有始逆数据
									resItem.start_return_time[0] = "无"
									resItem.start_return_data[0] = {}
									resItem.start_return_data[0].astroImg = ""
									resItem.start_return_data[0].degree = "无"
								}
								for(let j=0;j<eclipticRes[i].start_return.length;j++){
									// 始逆时间
									resItem.start_return_time[j] = eclipticRes[i].start_return[j].time;
									// 始逆星座度数
									resItem.start_return_data[j] = {}
									resItem.start_return_data[j].astroImg = constellationMapImg(eclipticRes[i].start_return[j].astro)
									resItem.start_return_data[j].degree = eclipticRes[i].start_return[j].degree==""? "无":eclipticRes[i].start_return[j].degree;
								}
								resItem.start_asc_time=[]
								resItem.start_asc_data=[]
								if(eclipticRes[i].start_asc.length==0){
									// 没有始顺数据
									resItem.start_asc_time[0] = "无"
									resItem.start_asc_data[0] = {}
									resItem.start_asc_data[0].astroImg = ""
									resItem.start_asc_data[0].degree = "无"
								}
								for(let j=0;j<eclipticRes[i].start_asc.length;j++){
									// 始顺时间
									resItem.start_asc_time[j] = eclipticRes[i].start_asc[j].time;
									// 始顺星座度数
									resItem.start_asc_data[j] = {}
									resItem.start_asc_data[j].astroImg = constellationMapImg(eclipticRes[i].start_asc[j].astro)
									resItem.start_asc_data[j].degree = eclipticRes[i].start_asc[j].degree==""? "无":eclipticRes[i].start_asc[j].degree;
								}
								// 诸星相时间位置
								resItem.relation_astro_time_position = []
								if(eclipticRes[i].relation_astro_time_position.length==0){
									// 没有星相时间位置
									resItem.relation_astro_time_position[0] = {}
									resItem.relation_astro_time_position[0].astroImg=""
									resItem.relation_astro_time_position[0].degree = "无"
									resItem.relation_astro_time_position[0].star_status = ""
									resItem.relation_astro_time_position[0].time = ""
								}else{
									for(let j=0;j<eclipticRes[i].relation_astro_time_position.length;j++){
										resItem.relation_astro_time_position[j] = {}
										resItem.relation_astro_time_position[j].astroImg=constellationMapImg(eclipticRes[i].relation_astro_time_position[j].astro);
										resItem.relation_astro_time_position[j].degree = eclipticRes[i].relation_astro_time_position[j].degree;
										resItem.relation_astro_time_position[j].star_status = eclipticRes[i].relation_astro_time_position[j].star_status;
										resItem.relation_astro_time_position[j].time = eclipticRes[i].relation_astro_time_position[j].time;
									}
								}
								//赤纬
								resItem.decl = eclipticRes[i].decl=="" ? "无":eclipticRes[i].decl
								// 黄纬
								resItem.lat = eclipticRes[i].lat=="" ? "无":eclipticRes[i].lat
								this.tableData.push(resItem);
							}
						}
						// uni.hideLoading();
						this.subDisabled = false;
					}).catch(err =>{
						console.log('接口失败：', err);
						uni.hideLoading();
						this.subDisabled = false
					})
					
				    }).catch(err =>{
					console.log('表单错误信息：', err);
					this.popupContent = err[0].errorMessage;
					this.$refs.popup.open('center')
				   
					console.log("pop",this.popupContent)
				})
			},
			// 关闭弹出框
			close(){
				this.$refs.popup.close()
			},
			// 下载表格
			downloadFile(){
				
				downloadFile(this,'/ecliptic_position/v1_0_0/download')
			}
		}
	}
</script>

<style lang="scss">
	.ecliptic-content{
		width: 100%;
		height: 100%;
		// margin: 0;
		display: flex;
		flex-direction: column;
	}
	.require-form{
		// width: 100%;
		// height: 250px;
		background: #FFFFFF;
		border-radius: 8px;
		// border-left: 24px;
		// position: absolute;
		top:4px;
		margin: 8px;
		flex: 1;
	}
	.require-uni-form{
		padding-left: 24px;
		padding-bottom: 12px;
	}
	.warm-prompt{
		width: 376px;
		height: 40px;
		background: #E5EAF4;
		border-radius: 4px;
		// padding-top: 24px;
		margin-top: 24px;
		margin-left: 8px;
		display: flex;
		.warm-prompt-pro{
			width: 14px;
			height: 14px;
			padding-left: 17px;
			padding-top: 13px;
			padding-right: 4px;
		}
		text{
			width: 332px;
			height: 22px;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #012F92;
			line-height: 22px;
			padding-top: 10px;
		}
	}
	.datatimeOrButton{
		// position: relative;
		display: flex;
		width: 925px;
		justify-content: space-between;
	}
	
	.data-time{
		height: 32px;
		display: flex;
		margin-bottom: 8px;
		.data-time-button{
			width: 100px;
			display: flex;
			justify-content: space-between;
			padding-top: 5px;
			.button-year{
				width: 40px;
				height: 22px;
				background: #F5F5F5;
				border-radius: 4px;
				border: 1px solid #DDDDDD;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 20px;
				text-align: center;
			}
			.button-selected-year{
				width: 40px;
				height: 22px;
				background: #CCD5E9;
				border-radius: 4px;
				border: 1px solid #002F93;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #002F93;
				line-height: 20px;
				text-align: center;
			}
		}
		.data-time-select{
			width: 624px;
			display: flex;
			justify-content: space-between;
			.data-time-start{
				width: 240px;
			}
			.data-time-center{
				width: 100px;
				padding-top: 7px;
				// padding-left: 22px;
				text{
					display: inline-block;
					width: 96px;
					height: 2px;
					// border: 1px solid #DDDDDD;
					background: #DDDDDD;
				}
			}
			.data-time-end{
				width: 240px;
				padding-right: 16px;
			}
		}
	}
	.uni-form-button{
		width: 160px;
		height: 32px;
		// background: #002F93;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		// line-height: 20px;
	}
	.form-button-jinyong{
		background: #CCD5E9 !important;
	}
	.form-button-no-jinyong{
		background: #002F93;
	}
	.file-list-container{
		background: #FFFFFF;
		margin-left: 8px;
		margin-right: 8px;
		position: relative;
		height: 500px;
		border-radius: 8px;
		// flex: 1;
	}
	.file-table{
		// width: 100%;
		border-radius: 8px;
		// height: 85%;
	}
	.table-download{
		width: 160px;
		height: 32px;
		background: #002F93;
		position: absolute;
		left: 50%;
		margin-left: -80px;
		margin-top: 24px;
		button{
			width: 56px;
			height: 22px;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			background: #002F93;
			line-height: 22px;
			padding-top: 5px;
		}
		border-radius: 5px;
	}
	.table-download:hover{
		background: #6682BE;
		button{
			background: #6682BE;
		}
	}
	.form-button-no-jinyong:hover{
		background: #6682BE;
	}
	.select-time:hover{
		border:1px solid #002F93 !important;
	}
	.explain{
		height: 100%;
		flex:1;
		flex-grow:1;
		flex-shrink:1;
		background: #FFFFFF;
		margin: 8px;
		border-radius: 8px;
	}
</style>
