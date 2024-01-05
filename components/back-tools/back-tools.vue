<template>
	<view class="main-right">
		<view class="require-form">
			<uni-forms class="require-uni-form" :modelValue="formData" :rules="rules"  ref="form">
				<uni-forms-item>
					<view class="warm-prompt">
						<image src="../../static/warning-circle-fill.png" mode="" class="warm-prompt-pro"></image>
						<text>温馨提示：本工具计算时默认使用的经度是东经120°</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="计算点" class="dots-content">
					<view class="dots-input" @keyup="numberToString">
						<view class="dots-input-l">
							<uni-forms-item name="du" class="dots-du">
								<uni-easyinput
								:clearable="false"
								v-model="formData.dots.du"
								type="number"
								>
								</uni-easyinput>
							</uni-forms-item>
							
							<text>度</text>
							<uni-forms-item name="fen" class="dots-fen">
								<uni-easyinput
								:clearable="false"
								v-model="formData.dots.fen"
								type="number"
								>
								</uni-easyinput>
							</uni-forms-item>
							<text>分</text>
							<uni-forms-item name="miao" class="dots-miao">
								<uni-easyinput
								:clearable="false"
								v-model="formData.dots.miao"
								type="number"
								>
								</uni-easyinput>
							</uni-forms-item>
							<text>秒</text>
						</view>
						<view class="dots-input-r">
							<text>（度数范围0~359，分数范围0~59，秒数范围0~59）</text>
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item label="常用星体" name="star">
					<!-- <uni-data-checkbox multiple v-model="formData.star" @change="change"></uni-data-checkbox> -->
					<uni-data-checkbox multiple v-model="formData.star" :localdata="cytaster" @change="change(1,$event)"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="虚点" name="imag_point">
					<uni-data-checkbox multiple v-model="formData.imag_point" :localdata="imaginary_point" @change="change(2,$event)"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="相位" name="mode">
					<uni-data-checkbox v-model="formData.mode" :localdata="mode_range" @change="changeMode"></uni-data-checkbox>
				</uni-forms-item>
				
				<uni-forms-item label="   " name="phaseChecked" class="">
					<phase-check-box @click="binddata('phaseChecked',formData.phaseChecked)" @get-phase-checked="getPhaseChecked" :mode = "formData.mode"></phase-check-box>
					<!-- <phase-check-box @get-phase-checked="getPhaseChecked"></phase-check-box> -->
				</uni-forms-item>
				<uni-forms-item label="时间范围" name="datetimestart" >
					<view class="datatimeOrButton">
						<view class="data-time">
							<view class="data-time-select">
								<date-time-picker class="data-time-start"
								:startYear='1770' :endYear='2049' :datestring="formData.datetimestart"
								type='datetime-all' placeholder="请选择开始日期时间"  @change='changeDate(0,$event)' :indicatorStyle="{width:'0'}">
								</date-time-picker>
								<view class="data-time-center">
									<text></text>
								</view>
								
								<uni-forms-item name="datetimeend">
									<date-time-picker class="data-time-end"
									:startYear='1770' :endYear='2049' :datestring="formData.datetimeend"
									type='datetime-all' placeholder="请选择结束日期时间"  @change='changeDate(1,$event)' >
									</date-time-picker>
								</uni-forms-item>
								
							</view>
							<view class="data-time-button" v-show="isShowSelected">
								<view :class="[selectedYear[0] ? 'button-selected-year' : 'button-year']" class="select-time"  @click="dataTimeClick(1)">10年</view>
								<view :class="[selectedYear[1] ? 'button-selected-year' : 'button-year']" class="select-time" size="mini" @click="dataTimeClick(2)">20年</view>
								<view :class="[selectedYear[2] ? 'button-selected-year' : 'button-year']" class="select-time" size="mini" @click="dataTimeClick(3)">30年</view>
							</view>
						</view>
						<view class="forms-button">
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
			<uni-table stripe emptyText="暂无更多数据" class="file-table" :style="{height:tableHeight+'px' }">
				<!-- 表头行 -->
				<uni-thead>
					<uni-tr>
						<uni-th align="left" width="50" >序号</uni-th>
					    <uni-th align="left" width="120" >计算点</uni-th>
					    <uni-th align="left" width="100">运算相位</uni-th>
					    <uni-th align="left" width="80">前容许度</uni-th>
						<uni-th align="left" width="80">目标星体</uni-th>
						<uni-th align="left" width="80">后容许度</uni-th>
						<uni-th align="left" width="120">目标星体前至</uni-th>
						<uni-th align="left" width="120">目标星体后出</uni-th>
						<uni-th align="left" width="170">起始时间</uni-th>
						<uni-th align="left" width="170">终止时间</uni-th>
						<uni-th align="left" width="170">前至时间</uni-th>
						<uni-th align="left" width="170">后出时间</uni-th>
						<uni-th align="left" colspan="1" width="120">太阳所起星座及黄道度数</uni-th>
						<!-- <uni-th align="left" colspan="1" width="120" sortable @sort-change="sortSunStart">太阳所起星座及黄道度数</uni-th> -->
						<uni-th align="left" colspan="1" width="120">太阳所至星座及黄道度数</uni-th>
					</uni-tr>
				</uni-thead>
				<uni-tbody v-if="isTableData">
					<uni-tr v-for="(item,index) in tableData" :key="item.id" >
						<uni-td width="50">{{item.index}}</uni-td>
						<uni-td width="120">{{item.computer_point}}</uni-td>
						<uni-td width="100">{{item.computer_phase}}</uni-td>
						<uni-td width="80">{{item.pre_tolerance}}</uni-td>
						<uni-td width="80"><img :src="item.target_star.img" style='vertical-align:middle' class="xinzuo-img" />{{item.target_star.name}}</uni-td>
						<uni-td width="80">{{item.after_tolerance}}</uni-td>
						<uni-td width="120">{{item.target_star_front}}</uni-td>
						<uni-td width="120">{{item.targer_star_after}}</uni-td>
						<uni-td width="170">{{item.start_time}}</uni-td>
						<uni-td width="170">{{item.end_time}}</uni-td>
						<uni-td width="170">
							<view class="" v-for="(item1,index) in item.front_time" :key="index" >
								{{item1}}
							</view>
						</uni-td>
						<uni-td width="170">
							<view class="" v-for="(item1,index) in item.after_time" :key="index" >
								{{item1}}
							</view>
						</uni-td>
						<uni-td width="120">
							<view v-for="(item1,index) in item.sun_start_ecliptic_degree" :key="index" >
								<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
						<uni-td width="120">
							<view v-for="(item1,index) in item.sun_end_ecliptic_degree" :key="index">
								<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
					</uni-tr>
				</uni-tbody>
			</uni-table>
			<view class="table-download" @click="downloadFile" v-if="isTableData">
				<button type="default">下载结果</button>
			</view>
		</view>
		<view class="explain">
			<explain-text></explain-text>
		</view>
	</view>
</template>

<script>
	import {cytaster,imaginary_point,phaseList} from '../../utils/const.js'
	import {backData} from '../../utils/table.js'
	import {isEndDyStart,isTimeSection} from '../../utils/form.js'
	import {constellationSort,compareAsc,compareDes} from '../../utils/sort.js'
	import phaseBox from "../../components/phase-box/phase-box.vue"
	import phaseCheckBox from "../../components/phase-checkbox/phase-checkbox.vue"
	import explainText from "../../components/explain-text/explain-text.vue"
	import {concatPoint,concatStar,concatVirtualPoint,concatPhase,xingtiOrXuDian} from "../../utils/submit.js"
	import {constellationMapImg,xingXingMapImg,splitConDegree,downloadFile} from "../../utils/responses.js"
	import DateTimePicker from '@/components/jc-dateTimePicker/jc-dateTimePicker.vue';
	export default {
		data() {
			return {
				formData:{
					dots:{du:'',fen:'0',miao:'0'},
					star:[],
					imag_point:[],
					mode:0,
					phaseChecked:[],
					datetimestart:"",
					datetimeend:""
				},
				tableData:[],
				isTableData:false,
				listHeight:483,
				tableHeight:483,
				centerHeight:483,
				backData,
				cytaster,
				imaginary_point,
				selectStarAll:false,
				selectImagAll:false,
				mode_range:[{"value":0,"text":"容许模式"},{"value":1,"text":"精准模式"}],
				proOrLater:"前",
				phase_cur:5.2,
				phaseList,
				selectedYear:[false,false,false],
				datetimeStartClick:false,
				datetimeEndClick:false,
				// 是否显示要选择的时间
				isShowSelected:true,
				popupContent:"",
				phaseCheckedData:[],
				subDisabled:false,
				download_url:'',
				download_option:{},
				// com_star:[],
				rules:{
					du:{
						rules:[
							{
							required: true,
							errorMessage: '请填写计算点度数!',
							// trigger:'submit'
							},
							{
								minimum:0,
								maximum:359,
								errorMessage:'请输入{label}范围在{minimum}到{maximum}!'
							}
						],
						label:'度数',
						validateTrigger:'submit'
					},
					fen:{
						rules:[
							{
							required: true,
							errorMessage: '请填写计算点分数!',
							},
							{
								minimum:0,
								maximum:59,
								errorMessage:'请输入{label}范围在{minimum}到{maximum}!'
							}
						],
						label:'分数',
						validateTrigger:'submit'
					},
					miao:{
						rules:[
							{
							required: true,
							errorMessage: '请填写计算点秒数!',
							},
							{
								minimum:0,
								maximum:59,
								errorMessage:'请输入{label}范围在{minimum}到{maximum}!'
							}
						],
						label:'秒数',
						validateTrigger:'submit'
					},
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
					phaseChecked:{
						rules:[
							{
							required: true,
							errorMessage: '您未选择相位!',
							}
						],
						label:'相位',
						validateTrigger:'submit'
					},
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
				},
			}
		},
		components:{
			phaseBox,
			phaseCheckBox,
			explainText,
			DateTimePicker
		},
		watch:{
			"formData.mode":function(newVal){
				console.log("模式发生了改变",newVal)
				// 模式发生了改变选择的数据也会改变，所有首先得清空，
				this.phaseCheckedData = [];
				this.formData.phaseChecked = [];
			},
			// 设置表格的高度
			tableData(newval){
				if(!newval.length){
					this.isTableData = false;
				}else{
					let sunHeight = 0;
					for(let i=0; i<newval.length;i++){
						const arr = [newval[i].front_time.length,newval[i].after_time.length,newval[i].sun_start_ecliptic_degree.length,newval[i].sun_end_ecliptic_degree.length];
						let len = Math.max(...arr)
						if(len==1 || len==0){
							sunHeight = sunHeight+39;
						}else{
							sunHeight = sunHeight + (len-1)*22 + 39;
						}
					}
					
					if(sunHeight<=800){
						sunHeight = sunHeight+65;
					}else{
						sunHeight = 865
					}
					this.tableHeight = sunHeight;
					this.centerHeight = this.tableHeight+80;
					this.isTableData = true;
				}
			}
		},
		methods: {
			numberToString(){
				this.formData.dots.du=parseInt(this.formData.dots.du)
				this.formData.dots.fen=parseInt(this.formData.dots.fen)
				this.formData.dots.miao=parseInt(this.formData.dots.miao)
				console.log("dots",this.formData.dots)
			},
			change(type,e){
				console.log("type",type)
			    console.log('e:',e);
				console.log('e.value:',e.detail.value);
				console.log("虚点：",this.formData.imag_point)
				var selectAll = e.detail.value.some((value,index)=>{
					return value===0
				})
				if(type===1){
					// 把选择的数据存着
					// this.com_star = e.detail.data;
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
			changeMode(e){
				console.log("点击了模式",e)
				this.formData.mode = e.detail.value;
			},
			getPhaseChecked(e1,e2){
				console.log("e1",e1)
				this.formData.phaseChecked = e1;
				console.log("formdata",this.formData.phaseChecked)
				this.phaseCheckedData = e2;
				console.log("e2",this.phaseCheckedData);
			},
			
			// 点击加减年限后需处理的函数
			dataTimeClick(timeRange){
				var a = this.selectedYear
				this.selectedYear = [false,false,false];
				for(var i=0;i<3;i++){
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
					this.datetimeAddOrSub(this.formData.datetimestart,0,timeRange)
					this.isShowSelected = false;
				}else if(this.datetimeEndClick && this.datetimeStartClick==false){
					// 选择了结束时间并且起始时间没有选择，然后选择了时间范围
					this.datetimeAddOrSub(this.formData.datetimeend,1,timeRange)
					this.isShowSelected = false;
				}
			},
			// 加减时间函数
			datetimeAddOrSub(datatime,type,timeRange){
				var timestr = datatime.slice(0,10)
				var timeyear = parseInt(datatime.slice(0,4))
				var timenext = datatime.slice(4)
				console.log("datetimestart",datatime)
				console.log("str"+timestr+timeyear)
				if(type==0){
					timeyear = timeyear + 10*timeRange;
					timeyear = String(timeyear);
					this.formData.datetimeend = timeyear.concat(timenext)
					this.datetimeEndClick = true;
					// this.datetimeStartClick = false;
				}else if(type == 1){
					timeyear = timeyear - 10*timeRange;
					timeyear = String(timeyear);
					this.formData.datetimestart = timeyear.concat(timenext)
					this.datetimeStartClick = true;
					// this.datetimeEndClick = false;
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
						this.selectedYear = [false,false,false];
					}
				}else if(type==1){
					// 点击结束时间
					this.formData.datetimeend = e;
					if(e != ""){
						this.datetimeEndClick = true;
					}else{
						this.datetimeEndClick = false;
						this.isShowSelected = true;
						this.selectedYear = [false,false,false];
					}
				}
				if(this.datetimeStartClick && this.datetimeEndClick){
					this.isShowSelected = false;
				}
			},
			// 太阳所起位置排序
			sortSunStart(e){
				console.log("排序",e)
				if(e.order=="descending"){
					// 下降排序
					this.tableData.sort(compareDes("sun_start_ecliptic_degree","index"));
				}else if(e.order=="ascending"){
					// 上升排序
					this.tableData.sort(compareAsc("sun_start_ecliptic_degree","index"));
				}else{
					
				}
			},
			submit(){
				console.log("点击提交表单了")
				
				this.$refs.form.validate().then(res=>{
					
				    console.log('表单数据信息：', res);
					// this.tableData = this.backData;
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
					let com_point = concatPoint(this.formData.dots)
					let com_star = concatStar(this.formData.star);
					let vir_point = concatVirtualPoint(this.formData.imag_point);
					let phase_position=concatPhase(this.formData.mode,this.phaseCheckedData)
					let options = {
						"computer_point":com_point,
						"common_star":com_star,
						"virtual_point":vir_point,
						"phase_model":this.formData.mode,
						"phase_position":phase_position,
						"start_time":this.formData.datetimestart,
						"end_time":this.formData.datetimeend
					}
					console.log(options)
					this.tableData = []
					this.download_option = options;
					this.$myRequest({
						// url:'/astral_reverser/calculate/data',
						url:'/backstep_tool/v1_0_0/data',
						method:'POST',
						data:options
					}).then(res =>{
						// 获取后端传来的数据
						let resData = res.data.data
						console.log("状态",res.data.statusCode)
						if(res.statusCode!=200){
							this.subDisabled = false
							return
						}
						console.log(resData);
						if(resData.length!=0){
							this.download_url = resData[0].download_url
						}else{
							uni.showToast({
								title:'未查找到相关数据'
							})
						}
						uni.hideLoading();
						// 取出每条数据并映射
						this.tableData = [];
						for(let i=0; i<resData.length; i++){
							let resItem = {};
							resItem.index = i+1;
							// 计算点
							resItem.computer_point = resData[i].computer_point==""? "无":resData[i].computer_point;
							// 运算相位
							resItem.computer_phase = resData[i].computer_phase==""? "无":resData[i].computer_phase;
							// 前容许度
							resItem.pre_tolerance = resData[i].pre_tolerance==""? "无":resData[i].pre_tolerance;
							// 目标星体
							resItem.target_star = {}
							resItem.target_star.img = xingXingMapImg(resData[i].target_star);
							resItem.target_star.name = resData[i].target_star==""? "无":resData[i].target_star;
							// 后容许度
							resItem.after_tolerance = resData[i].after_tolerance==""? "无":resData[i].after_tolerance;
							// 目标星体前出
							resItem.target_star_front = resData[i].target_star_front==""? "无":resData[i].target_star_front;
							// 目标星体后至
							resItem.targer_star_after = resData[i].targer_star_after==""? "无":resData[i].targer_star_after;
							// 起始时间
							resItem.start_time = resData[i].start_time==""? "无":resData[i].start_time;
							// 结束时间
							resItem.end_time = resData[i].end_time==""? "无":resData[i].end_time;
							// 前出时间
							resItem.front_time = [];
							if(resData[i].front_time.length==0){
								resItem.front_time[0] = "无"
							}else{
								for(let j=0; j<resData[i].front_time.length; j++){
									resItem.front_time[j] = resData[i].front_time[j]
								}
							}
							// 后至时间
							resItem.after_time = [];
							if(resData[i].after_time.length==0){
								resItem.after_time[0] = "无"
							}else{
								for(let j=0; j<resData[i].after_time.length; j++){
									resItem.after_time[j] = resData[i].after_time[j]
								}
							}
							// 太阳所起星座及黄道位置
							resItem.sun_start_ecliptic_degree = []
							if(resData[i].sun_start_ecliptic_degree.length==0){
								resItem.sun_start_ecliptic_degree[0] = {}
								resItem.sun_start_ecliptic_degree[0].astro = ""
								resItem.sun_start_ecliptic_degree[0].astroImg = ""
								resItem.sun_start_ecliptic_degree[0].degree = "无"
							}else{
								for(let j=0; j<resData[i].sun_start_ecliptic_degree.length;j++){
									resItem.sun_start_ecliptic_degree[j] = {}
									let arr = splitConDegree(resData[i].sun_start_ecliptic_degree[j])
									resItem.sun_start_ecliptic_degree[j].astro = arr[0]
									resItem.sun_start_ecliptic_degree[j].astroImg = constellationMapImg(arr[0])
									resItem.sun_start_ecliptic_degree[j].degree = arr[1]
								}
							}
							
							// 太阳所至星座及黄道位置
							resItem.sun_end_ecliptic_degree = []
							if(resData[i].sun_end_ecliptic_degree.length==0){
								resItem.sun_end_ecliptic_degree[0] = {}
								resItem.sun_end_ecliptic_degree[0].astro = ""
								resItem.sun_end_ecliptic_degree[0].astroImg = ""
								resItem.sun_end_ecliptic_degree[0].degree = "无"
							}else{
								for(let j=0; j<resData[i].sun_end_ecliptic_degree.length;j++){
									resItem.sun_end_ecliptic_degree[j] = {}
									let arr = splitConDegree(resData[i].sun_end_ecliptic_degree[j])
									resItem.sun_end_ecliptic_degree[j].astro = arr[0]
									resItem.sun_end_ecliptic_degree[j].astroImg = constellationMapImg(arr[0])
									resItem.sun_end_ecliptic_degree[j].degree = arr[1]
								}
							}
							this.tableData.push(resItem);
						}
						 this.subDisabled = false;
					}).catch(err =>{
						console.log('接口失败：', err);
						uni.hideLoading();
						this.subDisabled = false
					})
					
				    }).catch(err =>{
					this.popupContent = err[0].errorMessage;
					// this.popupContent = xingtiOrXuDian(err)
					this.$refs.popup.open('center')
				    console.log('表单错误信息：', err);
					console.log("pop",this.popupContent)
				})
			},
			
			// 关闭弹出框
			close(){
				this.$refs.popup.close()
			},
			downloadFile(){
				console.log("点击下载结果")
				downloadFile(this,'/backstep_tool/v1_0_0/download')
			}
		}
	}
</script>

<style lang="scss">
	.main-right{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		// background: #F2F4F9;
		// position: relative;
	}
	
	.require-form{
		// width: 100%;
		// height: 610px;
		background: #FFFFFF;
		
		// border-left: 24px;
		// position: absolute;
		top:4px;
		margin: 8px;
		border-radius: 8px;
		// margin-right: 0;
		flex: 1;
		// overflow-x: auto;
	}
	.require-uni-form{
		background: #FFFFFF;
		padding-left: 24px;
		padding-bottom: 12px;
		border-radius: 8px;
		// width: 1687px;
		// height: 576px;
	}
	.warm-prompt{
		width: 376px;
		height: 40px;
		background: #E5EAF4;
		border-radius: 4px;
		// padding-top: 24px;
		margin-top: 24px;
		margin-left: 8px;
		margin-bottom: 8px;
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
	.dots-content{
		// padding-top: 24px;
	}
	.dots-input{
		width: 100%;
		height: 32px;
		display: flex;
		.dots-input-l{
			width: 300px;
			display: flex;
			
			.dots-du{
				width: 72px;
				text-align: center;
			}
			.dots-fen{
				width: 72px;
				text-align: center;
			}
			.dots-miao{
				width: 72px;
				text-align: center;
			}
			text{
				width: 16px;
				// height: 100%;
				line-height: 40px;
				text-align: center;
				vertical-align: middle;
				padding-left: 8px;
				padding-right: 8px;
			}
		}
		.dots-input-r{
			flex:1;
			width: 329px;
			height: 20px;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 20px;
			padding-top: 10px;
		}
		
		// text:nth-last-child(1){
		// 	// width: 235px;
		// 	flex: 1;
		// 	// height: 100%;
		// 	font-size: 4px;
		// }
	}
	.checkbox__phase{
		display: flex;
		.checkbox__all{
			font-size: 8px;
		}
		.checkobx__list{
			display: flex;
			flex-wrap: wrap;
			.checkbox__item{
				display: flex;
			}
		}
	}
	
	.datatimeOrButton{
		// position: relative;
		display: flex;
		width: 850px;
		justify-content: space-between;
	}
	
	.data-time{
		height: 32px;
		display: flex;
		margin-bottom: 8px;
		// align-items: center;
		.data-time-button{
			width: 152px;
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
				color: #DDDDDD;
				// padding-left: 22px;
				text{
					display: inline-block;
					width: 100px;
					height: 2px;
					background: #DDDDDD;
					// border: 1px solid #DDDDDD;
					color: #DDDDDD;
				}
			}
			.data-time-end{
				width: 240px;
				padding-left: 0;
				padding-right: 16px;
			}
		}
	}
	
	.uni-form-button{
		position: absolute;
		// right: 680px;
		width: 160px;
		height: 32px;
		// background: #002F93;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		// padding-top: 24px;
		// margin-top: -29px;
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
	}
	.file-table{
		// width: 1800px;
		// width: 100%;
		border-radius: 8px;
		// height: 410px;
		// height:100%;
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
