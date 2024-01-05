<template>
	<view class="moon-content">
		<view class="require-form">
			<uni-forms class="require-uni-form" :modelValue="formData" :rules="rules"  ref="form">
				<uni-forms-item>
					<view class="warm-prompt">
						<image src="../../static/warning-circle-fill.png" mode="" class="warm-prompt-pro"></image>
						<text>温馨提示：本工具计算时默认使用的经度是东经120°</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="上升点" class="rising-content">
					<view class="rising-main-content">
						<view class="constellation">
							<uni-forms-item name="constellationData" class="constellation-selected">
								<easy-select @selectOne="selectOne" size="mini" :value="formData.constellationData" :options="constellationList"></easy-select>
							</uni-forms-item>
						</view>
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
								（度数范围0~29，分数范围0~59，秒数范围0~59）
							</view>
						</view>
					</view>
					
				</uni-forms-item>
				<uni-forms-item label="宫位系统" name="houseSystem" class="houseSystem-content">
					<uni-data-checkbox v-model="formData.houseSystem" :localdata="houseSysData" @change="changehouse"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="相位" name="mode" class="mode-content">
					<uni-data-checkbox v-model="formData.mode" :localdata="mode_range" @change="changeMode"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="   " name="phaseChecked" class="">
					<phase-check-box @click="binddata('phaseChecked',formData.phaseChecked)" @get-phase-checked="getPhaseChecked" :mode = "formData.mode"></phase-check-box>
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
						<uni-th align="left" width="40" >序号</uni-th>
					    <uni-th align="left" width="99">起始时间</uni-th>
					    <uni-th align="left" width="99">终止时间</uni-th>
					    <uni-th align="left" width="80">上升点</uni-th>
						<uni-th align="left" width="100">相位容许度设置</uni-th>
						<uni-th align="left" width="80" sortable @sort-change="sortSeat('to_seat',$event)">入座</uni-th>
						<uni-th align="left" width="100" sortable @sort-change="sortTime">入座时间</uni-th>
						<uni-th align="left" width="82" sortable @sort-change="sortSeat('natural_start1',$event)">主宰星1</uni-th>
						<uni-th align="left" width="160">天象相位1</uni-th>
						<uni-th align="left" width="75" sortable @sort-change="sortSeat('astronomical_phase_house1',$event)">主宰星1落宫</uni-th>
						<uni-th align="left" width="115" sortable @sort-change="sortSeat('astronomical_phase_seat1',$event)">主宰星1落座</uni-th>
						<uni-th align="left" width="82" sortable @sort-change="sortSeat('natural_start2',$event)">主宰星2</uni-th>
						<uni-th align="left" width="160">天象相位2</uni-th>
						<uni-th align="left" width="75" sortable @sort-change="sortSeat('astronomical_phase_house2',$event)">主宰星2落宫</uni-th>
						<uni-th align="left" width="115" sortable @sort-change="sortSeat('astronomical_phase_seat2',$event)">主宰星2落座</uni-th>
						<uni-th align="left" width="227">月相</uni-th>
					</uni-tr>
				</uni-thead>
				<uni-tbody v-if="isTableData">
					<uni-tr v-for="(item,index) in tableData" :key="item.id" >
						<uni-td width="40">{{item.index}}</uni-td>
						<uni-td width="99">{{item.start_time}}</uni-td>
						<uni-td width="99">{{item.end_time}}</uni-td>
						<uni-td width="80"><img :src="item.raising_point.astro" style='vertical-align:middle' class="xinzuo-img" />{{item.raising_point.degree}}</uni-td>
						<uni-td width="100">{{item.phase_allow}}</uni-td>
						<uni-td width="80"><img :src="item.to_seat.img" style='vertical-align:middle' class="xinzuo-img" />{{item.to_seat.name}}</uni-td>
						<uni-td width="100">{{item.to_seat_time}}</uni-td>
						<uni-td width="80"><img :src="item.natural_start1.img" style='vertical-align:middle' class="xinzuo-img" />{{item.natural_start1.name}}</uni-td>
						<uni-td width="160">
							<view class="" v-for="(item1,index) in item.astronomical_phase1" :key="index" >
								<img :src="item1.starImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.star}}
								<view class="">
									{{item1.start_time}} 
								</view>
								<view class="">
									{{item1.end_time}} 
								</view>
								<!-- <img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}} -->
							</view>
						</uni-td>
						<uni-td width="65">{{item.astronomical_phase_house1.name}}</uni-td>
						<uni-td width="115"><img :src="item.astronomical_phase_seat1.astro" style='vertical-align:middle' class="xinzuo-img" />{{item.astronomical_phase_seat1.degree}}</uni-td>
						<uni-td width="80"><img :src="item.natural_start2.img" style='vertical-align:middle' class="xinzuo-img" />{{item.natural_start2.name}}</uni-td>
						<uni-td width="160">
							<view class="" v-for="(item1,index) in item.astronomical_phase2" :key="index" >
								<img :src="item1.starImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.star}}
								<!-- <img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}} -->
								<view class="">
									{{item1.start_time}} 
								</view>
								<view class="">
									{{item1.end_time}} 
								</view>
							</view>
						</uni-td>
						<uni-td width="65">{{item.astronomical_phase_house2.name}}</uni-td>
						<uni-td width="115"><img :src="item.astronomical_phase_seat2.astro" style='vertical-align:middle' class="xinzuo-img" />{{item.astronomical_phase_seat2.degree}}</uni-td>
						<uni-td width="227">
							<view class="" v-for="(item2,index) in item.moon_phase" :key="index" >
								{{item2.time}}{{item2.status}}<img :src="item2.statusImg" style='vertical-align:middle' class="xinzuo-img" />
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
			<moon-explain></moon-explain>
		</view>
	</view>
</template>

<script>
	import {moondata} from '../../utils/table.js'
	import {constellationList,phaseList} from '../../utils/const.js'
	import easySelect from "@/components/easy-select/easy-select.vue"
	import lauwenSelect from "@/components/lauwen-select/lauwenSelect.vue"
	import phaseCheckBox from "../../components/phase-checkbox/phase-checkbox.vue"
	import moonExplain from "../../components/moon-explain/moon-explain.vue"
	import {raisPoint,concatPhase} from "../../utils/submit.js"
	import {constellationMapImg,xingXingMapImg,downloadFile,moonPhaseMapImg} from "../../utils/responses.js"
	import {datetimeAddOrSub,isEndDyStart,isTimeSection} from "../../utils/form.js"
	import DateTimePicker from '@/components/jc-dateTimePicker/jc-dateTimePicker.vue';
	import {constellationSort,compareAsc,compareDes,compareIndex,compareTimeDes,compareTimeAsc,starSort,houseSort} from '../../utils/sort.js'
	export default {
		data(){
			return {
				formData:{
					constellationData:"白羊座",
					dots:{du:'',fen:'0',miao:'0'},
					houseSystem:0,
					mode:0,
					phaseChecked:[],
					datetimestart:"",
					datetimeend:""
				},
				tableData:[],
				isTableData:false,
				tableHeight:483,
				centerHeight:483,
				moondata,
				constellationList,
				phaseList,
				mode_range:[{"value":0,"text":"容许模式"},{"value":1,"text":"精准模式"}],
				phaseCheckedData:[],
				selectedYear:[false,false],
				datetimeStartClick:false,
				datetimeEndClick:false,
				// 是否显示要选择的时间
				isShowSelected:true,
				popupContent:"",
				subDisabled:false,
				houseSysData:[
					{"value":0,"text":'整宫制'},{"value":1,"text":'等宫制'}],
				download_url:'',
				download_option:{},
				rules:{
					constellationData:{
						rules:[
							{
							required: true,
							errorMessage: '请选择星座!',
							}
						],
						label:'星座',
						validateTrigger:'submit'
					},
					du:{
						rules:[
							{
							required: true,
							errorMessage: '请填写计算点度数!',
							// trigger:'submit'
							},
							{
								minimum:0,
								maximum:29,
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
					houseSystem:{
						rules:[
							{
							required: true,
							errorMessage: '请选择宫位系统!',
							}
						],
						label:'宫位系统',
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
				}
			}
		},
		components:{
			easySelect,
			lauwenSelect,
			phaseCheckBox,
			moonExplain,
			DateTimePicker
		},
		watch:{
			tableData(newval){
				if(!newval.length){
					this.isTableData = false;
				}else{
					let sunHeight = 0;
					if(newval[0].moon_phase.length==0 || newval[0].moon_phase.length==1){
						sunHeight = 61*newval.length+65;
					}else{
						sunHeight = ((newval[0].moon_phase.length-1)*22+39)*newval.length+65;
					}
					if(sunHeight>800){
						this.tableHeight = 800;
					}else{
						this.tableHeight = sunHeight;
					}
					// if(newval.length<=6){
					// 	this.tableHeight = 70*(newval.length+1);
					// }
					// else{
					// 	this.tableHeight = 500;
					// }
					this.centerHeight = this.tableHeight+80;
					this.isTableData = true;
				}
			}
		},
		methods:{
			numberToString(){
				this.formData.dots.du=parseInt(this.formData.dots.du)
				this.formData.dots.fen=parseInt(this.formData.dots.fen)
				this.formData.dots.miao=parseInt(this.formData.dots.miao)
				console.log("dots",this.formData.dots)
			},
			selectOne(e){
				console.log("获取了星座",e)
				this.formData.constellationData=e;
			},
			changehouse(e){
				console.log("点击了宫位系统",e)
				this.formData.houseSystem = e.detail.value;
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
				console.log("结束真假",this.datetimeEndClick)
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
			// 入座排序
			sortSeat(name,e){
				console.log("排序",e)
				if(e.order=="descending"){
					// 下降排序
					this.tableData.sort(compareDes(name,"index"));
				}else if(e.order=="ascending"){
					// 上升排序
					this.tableData.sort(compareAsc(name,"index"));
				}else{
					// 无排序，按序号排序
					this.tableData.sort(compareIndex("index"))
				}
			},
			// 时间排序
			sortTime(e){
				console.log("排序",e)
				if(e.order=="descending"){
					// 下降排序
					this.tableData.sort(compareTimeDes("to_seat_time"));
				}else if(e.order=="ascending"){
					// 上升排序
					this.tableData.sort(compareTimeAsc("to_seat_time"));
				}else{
					// 无排序，按序号排序
					this.tableData.sort(compareIndex("index"))
				}
			},
			submit(){
				console.log("点击提交表单了")
				
				this.$refs.form.validate().then(res=>{
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
				    console.log('表单数据信息：', res);
					this.subDisabled = true
					uni.showLoading({
					    title: '数据加载中'
					});
					// this.tableData = this.moondata;
					let rais_point = raisPoint(this.formData.constellationData,this.formData.dots);
					console.log(rais_point)
					let phase_position=concatPhase(this.formData.mode,this.phaseCheckedData)
					let options = {
						'raising_point':rais_point,
						'house':Number(this.formData.houseSystem),
						"phase_model":this.formData.mode,
						'phase_position':phase_position,
						'start_time':this.formData.datetimestart,
						'end_time':this.formData.datetimeend
					}
					this.tableData = []
					this.download_option = options;
					console.log(options)
					this.$myRequest({
						// url:'/moon_chain/calculate/index',
						// url:'/moon_chain/v1_0_0/data',
						url:'/moon_chain/v1_0_1/data',
						method:'POST',
						data:options
					}).then(res =>{
						// console.log("后端"+res);
						// 获取后端传来的数据
						let resData = res.data.data
						uni.hideLoading();
						if(res.statusCode!=200){
							this.subDisabled = false
							return
						}
						if(JSON.stringify(resData)==="{}"){
							uni.showToast({
								title:'未查找到相关数据'
							})
						}
						console.log(resData);
						// 取出每条数据并映射
						this.tableData = [];
						var natural = resData.natural_ruler_star_result;
						this.download_url = resData.download_url
						if(natural.length == 0){
							// 中间数据为空
							let resItem = {};
							resItem.start_time = resData.start_time;
							resItem.end_time = resData.end_time;
							// 上升点
							resItem.raising_point = resData.raising_point;
							resItem.raising_point.astro = constellationMapImg(resData.raising_point.astro);
							// 月相
							resItem.moon_phase = resData.moon_phase;
							for(let j=0; j< resItem.moon_phase.length; j++){
								resItem.moon_phase[j].statusImg = moonPhaseMapImg(resItem.moon_phase[j].status)
							}
							// 相位容许度
							resItem.phase_allow = "无";
							// 入座
							resItem.to_seat={};
							resItem.to_seat.index = 0;
							resItem.to_seat.img = "";
							resItem.to_seat.name = "无";
							// 入座时间
							resItem.to_seat_time = "无";
							// 主宰星1
							resItem.natural_start1 = {}
							resItem.natural_start1.img = "";
							resItem.natural_start1.name = "无";
							resItem.natural_start1.index = 10;
							// 天相相位1
							resItem.astronomical_phase1 = []
							resItem.astronomical_phase1[0] = {}
							resItem.astronomical_phase1[0].starImg = "";
							resItem.astronomical_phase1[0].star = "无";
							// resItem.astronomical_phase1[0].astroImg = ""
							// resItem.astronomical_phase1[0].degree = ""
							resItem.astronomical_phase1[0].start_time = ""
							resItem.astronomical_phase1[0].end_time = ""
							// 主宰星1落宫
							resItem.astronomical_phase_house1 = {}
							resItem.astronomical_phase_house1.name = "无";
							resItem.astronomical_phase_house1.index = 13
							// 主宰星1落座
							resItem.astronomical_phase_seat1 = {}
							resItem.astronomical_phase_seat1.astro = ""
							resItem.astronomical_phase_seat1.degree = "无"
							resItem.astronomical_phase_seat1.index = 13
							// 主宰星2
							resItem.natural_start2 = {}
							resItem.natural_start2.img = "";
							resItem.natural_start2.name = "无";
							resItem.natural_start2.index =10
							// 天相相位2
							resItem.astronomical_phase2 = []
							resItem.astronomical_phase2[0] = {}
							resItem.astronomical_phase2[0].starImg = "";
							resItem.astronomical_phase2[0].star = "无";
							// resItem.astronomical_phase2[0].astroImg = ""
							// resItem.astronomical_phase2[0].degree = ""
							resItem.astronomical_phase2[0].start_time = ""
							resItem.astronomical_phase2[0].end_time = ""
							// 主宰星2落宫
							resItem.astronomical_phase_house2 = {}
							resItem.astronomical_phase_house2.name = "无";
							resItem.astronomical_phase_house2.index = 13;
							// 主宰星2落座
							resItem.astronomical_phase_seat2 = {}
							resItem.astronomical_phase_seat2.astro = ""
							resItem.astronomical_phase_seat2.degree = "无"
							resItem.astronomical_phase_seat2.index = 13
							console.log(resItem);
							this.tableData.push(resItem);
						}else{
							for(let i=0 ; i < natural.length ; i++){
								let resItem = {};
								resItem.index = i+1;
								resItem.start_time = resData.start_time;
								resItem.end_time = resData.end_time;
								// 上升点
								
								resItem.raising_point = resData.raising_point;
								if(i==0){
									// 因为是浅赋值，所以第一次赋值后改变了星座地址后后面就不需要转换了
									resItem.raising_point.astro = constellationMapImg(resData.raising_point.astro);
								}
								
								// 月相
								resItem.moon_phase = resData.moon_phase;
								if(resItem.moon_phase.length==0){
									// 月相无数据
									resItem.moon_phase[0] = {}
									resItem.moon_phase[0].time = "无"
									resItem.moon_phase[0].statusImg = ""
								}else{
									if(i==0){
										for(let j=0; j< resItem.moon_phase.length; j++){
											resItem.moon_phase[j].statusImg = moonPhaseMapImg(resItem.moon_phase[j].status)
										}
									}
								}
								
								
								// 相位容许度
								resItem.phase_allow = natural[i].phase_allow;
								// 入座
								resItem.to_seat={};
								resItem.to_seat.img = constellationMapImg(natural[i].to_seat);
								resItem.to_seat.name = natural[i].to_seat;
								resItem.to_seat.index = constellationSort(natural[i].to_seat)
								// 入座时间
								resItem.to_seat_time = natural[i].to_seat_time==""? "无":natural[i].to_seat_time;
								// 主宰星1
								resItem.natural_start1 = {}
								resItem.natural_start1.img = xingXingMapImg(natural[i].natural_start1);
								resItem.natural_start1.name = natural[i].natural_start1=="" ? "无" : natural[i].natural_start1
								resItem.natural_start1.index = starSort(natural[i].natural_start1)
								// 天相相位1
								resItem.astronomical_phase1 = []
								if(natural[i].astronomical_phase1 == ""){
									// 如果天相相位为空,则相应值变为空
									resItem.astronomical_phase1[0] = {}
									resItem.astronomical_phase1[0].starImg = "";
									resItem.astronomical_phase1[0].star = "无";
									// resItem.astronomical_phase1[0].astroImg = ""
									// resItem.astronomical_phase1[0].degree = ""
									resItem.astronomical_phase1[0].start_time = ""
									resItem.astronomical_phase1[0].end_time = ""
								}else{
									// 不为空，但可能为多个
									resItem.astronomical_phase1 = natural[i].astronomical_phase1;
									for(let j=0; j<resItem.astronomical_phase1.length; j++){
										resItem.astronomical_phase1[j].starImg = xingXingMapImg(resItem.astronomical_phase1[j].star);
										// resItem.astronomical_phase1[j].astroImg = constellationMapImg(resItem.astronomical_phase1[j].astro);
									}
								}
								// 主宰星1落宫
								resItem.astronomical_phase_house1 = {}
								resItem.astronomical_phase_house1.name = natural[i].astronomical_phase_house1=="" ? "无":natural[i].astronomical_phase_house1;
								resItem.astronomical_phase_house1.index = houseSort(natural[i].astronomical_phase_house1)
								// 主宰星1落座
								
								if(JSON.stringify(natural[i].astronomical_phase_seat1) === "{}"){
									resItem.astronomical_phase_seat1 = {}
									resItem.astronomical_phase_seat1.astro = ""
									resItem.astronomical_phase_seat1.degree = "无"
									resItem.astronomical_phase_seat1.index =13
								}else{
									resItem.astronomical_phase_seat1 = natural[i].astronomical_phase_seat1
									resItem.astronomical_phase_seat1.index = constellationSort(natural[i].astronomical_phase_seat1.astro)
									resItem.astronomical_phase_seat1.astro = constellationMapImg(natural[i].astronomical_phase_seat1.astro);
									
								}
								// 主宰星2
								resItem.natural_start2 = {}
								resItem.natural_start2.img = xingXingMapImg(natural[i].natural_start2);
								resItem.natural_start2.name = natural[i].natural_start2=="" ? "无" : natural[i].natural_start2
								resItem.natural_start2.index= starSort(natural[i].natural_start2)
								
								// 天相相位2
								resItem.astronomical_phase2 = []
								if(natural[i].astronomical_phase2 == ""){
									// 如果天相相位为空,则相应值变为空
									resItem.astronomical_phase2[0] = {}
									resItem.astronomical_phase2[0].starImg = "";
									resItem.astronomical_phase2[0].star = "无";
									// resItem.astronomical_phase2[0].astroImg = ""
									// resItem.astronomical_phase2[0].degree = ""
									resItem.astronomical_phase2[0].start_time = ""
									resItem.astronomical_phase2[0].end_time = ""
								}else{
									// 不为空，但可能为多个
									resItem.astronomical_phase2 = natural[i].astronomical_phase2;
									for(let j=0; j<resItem.astronomical_phase2.length; j++){
										resItem.astronomical_phase2[j].starImg = xingXingMapImg(resItem.astronomical_phase2[j].star);
										// resItem.astronomical_phase2[j].astroImg = constellationMapImg(resItem.astronomical_phase2[j].astro);
									}
								}
								// 主宰星2落宫
								resItem.astronomical_phase_house2 = {}
								resItem.astronomical_phase_house2.name = natural[i].astronomical_phase_house2=="" ? "无":natural[i].astronomical_phase_house2;
								resItem.astronomical_phase_house2.index = houseSort(natural[i].astronomical_phase_house2)
								// 主宰星2落座
								resItem.astronomical_phase_seat2 = {}
								if(JSON.stringify(natural[i].astronomical_phase_seat2) === "{}"){
									resItem.astronomical_phase_seat2.astro = ""
									resItem.astronomical_phase_seat2.degree = "无"
									resItem.astronomical_phase_seat2.index=13
								}else{
									resItem.astronomical_phase_seat2 = natural[i].astronomical_phase_seat2
									resItem.astronomical_phase_seat2.index = constellationSort(natural[i].astronomical_phase_seat2.astro)
									resItem.astronomical_phase_seat2.astro = constellationMapImg(natural[i].astronomical_phase_seat2.astro);
								}
								console.log("i"+resItem)
								this.tableData.push(resItem);
							}
						}
						this.subDisabled = false
						console.log("显示"+this.tableData);
					}).catch(err =>{
						this.subDisabled = false
					})
					
				    }).catch(err =>{
					this.popupContent = err[0].errorMessage;
					this.$refs.popup.open('center')
				    console.log('表单错误信息：', err);
					console.log("pop",this.popupContent)
				})
			},
			// 关闭弹出框
			close(){
				this.$refs.popup.close()
			},
			// 下载表格
			downloadFile(){
			
				downloadFile(this,'/moon_chain/v1_0_0/download')
			}
		}
	}
</script>

<style lang="scss">
	.moon-content{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		// background: #F2F4F9;
		
	}
	.require-form{
		// width: 100%;
		// height: 535px;
		background: #FFFFFF;
		border-radius: 8px;
		// border-left: 24px;
		// position: absolute;
		top:4px;
		margin: 8px;
		flex: 1;
		flex-shrink:1;
		// overflow-x: auto;
		// white-space: nowrap; 
		// text-overflow: ellipsis;
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
	.rising-content{
		padding-bottom: 0px;
	}
	.rising-main-content{
		width: 779px;
		height: 32px;
		display: flex;
		padding-bottom: 0px;
		.constellation{
			width: 120px;
			height: 32px;
			background: #FFFFFF;
			border-radius: 4px;
			// border: 1px solid #DDDDDD;
			padding-right: 16px;
		}
		.dots-input{
			width: 100%;
			height: 32px;
			display: flex;
		}
		.dots-input-l{
			width: 312px;
			display: flex;
			.dots-du{
				width: 72px;
				height: 32px;
				text-align: center;
			}
			.dots-fen{
				width: 72px;
				height: 32px;
				text-align: center;
			}
			.dots-miao{
				width: 72px;
				height: 32px;
				text-align: center;
			}
			text{
				width: 16px;
				height: 32px;
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
			width: 330px;
			height: 20px;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 20px;
			padding-top: 10px;
		}
	}
	.houseSystem-content{
		height: 22px;
		padding-bottom: 16px;
	}
	.mode-content{
		height: 22px;
		padding-bottom: 20px;
	}
	.datatimeOrButton{
		// position: relative;
		display: flex;
		width: 1010px;
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
					background: #DDDDDD;
					width: 96px;
					height: 2px;
					// border: 1px solid #DDDDDD;
					
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
	}
	.file-table{
		width: 100%;
		border-radius: 8px;
		// height: 410px;
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
