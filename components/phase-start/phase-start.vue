<template>
	<view class="phase-start-content">
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
									class="inp"
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
				<uni-forms-item label="常用星体" name="star">
					<uni-data-checkbox multiple v-model="formData.star" :localdata="cytaster" @change="change(1,$event)"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="虚点" name="imag_point">
					<uni-data-checkbox multiple v-model="formData.imag_point" :localdata="imaginary_point" @change="change(2,$event)"></uni-data-checkbox>
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
								
								/> -->
								<date-time-picker class="data-time-start" 
								:startYear='1770' :endYear='2049' :datestring="formData.datetimestart"
								type='datetime-all' placeholder="请选择开始日期时间"  @change='dateTimeChangeStart'>
									
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
									
									/> -->
									<date-time-picker class="data-time-end"
									:startYear='1770' :endYear='2049' :datestring="formData.datetimeend"
									type='datetime-all' placeholder="请选择结束日期时间"  @change='dateTimeChangeEnd'>
									</date-time-picker>
								</uni-forms-item>
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
			<uni-table emptyText="暂无更多数据" class="file-table" :style="{height:tableHeight+'px' }">
				<!-- 表头行 -->
				<uni-thead>
					<uni-tr>
						<uni-th align="left" width="50" left="0" zindex="20" >序号</uni-th>
					    <uni-th align="left" width="85" left="50" zindex="10" >上升点</uni-th>
					    <uni-th align="left" width="100" left="135" zindex="9">起始时间</uni-th>
					    <uni-th align="left" width="100" left="235" zindex="8">终止时间</uni-th>
						<uni-th align="left" width="80" left="335" zindex="7" boxShadow="2px 0 5px #8888884a">相位容许度设置</uni-th>
						<uni-th align="left" width="80" color="#931A00">星体1</uni-th>
						<uni-th align="left" width="165" sortable @sort-change="sortTime('astro1_front_time',$event)" color="#931A00">前至时间</uni-th>
						<uni-th align="left" width="105" sortable @sort-change="sortSeat('astro1_front_seat',$event)" color="#931A00">前至落座</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro1_front_house',$event)" color="#931A00">前至落宫</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro1_front_element',$event)" color="#931A00">前至元素</uni-th>
						<uni-th align="left" width="165" sortable @sort-change="sortTime('astro1_accurate_time',$event)" color="#789300">精准时间</uni-th>
						<uni-th align="left" width="105" sortable @sort-change="sortSeat('astro1_accurate_seat',$event)" color="#789300">精准落座</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro1_accurate_house',$event)" color="#789300">精准落宫</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro1_accurate_element',$event)" color="#789300">精准元素</uni-th>
						<uni-th align="left" width="165" sortable @sort-change="sortTime('astro1_after_time',$event)">后出时间</uni-th>
						<uni-th align="left" width="105" sortable @sort-change="sortSeat('astro1_after_seat',$event)">后出落座</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro1_after_house',$event)">后出落宫</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro1_after_element',$event)">后出元素</uni-th>
						<uni-th align="left" width="80" color="#931A00">星体2</uni-th>
						<uni-th align="left" width="165" sortable @sort-change="sortTime('astro2_front_time',$event)" color="#931A00">前至时间</uni-th>
						<uni-th align="left" width="105" sortable @sort-change="sortSeat('astro2_front_seat',$event)" color="#931A00">前至落座</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro2_front_house',$event)" color="#931A00">前至落宫</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro2_front_element',$event)" color="#931A00">前至元素</uni-th>
						<uni-th align="left" width="165" sortable @sort-change="sortTime('astro2_accurate_time',$event)" color="#789300">精准时间</uni-th>
						<uni-th align="left" width="105" sortable @sort-change="sortSeat('astro2_accurate_seat',$event)" color="#789300">精准落座</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro2_accurate_house',$event)" color="#789300">精准落宫</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro2_accurate_element',$event)" color="#789300">精准元素</uni-th>
						<uni-th align="left" width="165" sortable @sort-change="sortTime('astro2_after_time',$event)">后出时间</uni-th>
						<uni-th align="left" width="105" sortable @sort-change="sortSeat('astro2_after_seat',$event)">后出落座</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro2_after_house',$event)">后出落宫</uni-th>
						<uni-th align="left" width="90" sortable @sort-change="sortSeat('astro2_after_element',$event)">后出元素</uni-th>
					</uni-tr>
				</uni-thead>
				<uni-tbody v-if="isTableData">
					<uni-tr v-for="(item,index) in tableData" :key="item.id" >
						<uni-td width="50" left="0" zindex="9" background="#ffffff"position="sticky">{{item.index}}</uni-td>
						<uni-td width="85" left="50" background="#ffffff" zindex="8" position="sticky"><img :src="item.raising_point.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item.raising_point.degree}}</uni-td>
						<uni-td width="100" left="135" background="#ffffff" zindex="7" position="sticky">{{item.start_time}}</uni-td>
						<uni-td width="100" left="235" background="#ffffff" zindex="6" position="sticky">{{item.end_time}}</uni-td>
						<uni-td width="80" left="335" background="#ffffff" zindex="5" position="sticky" boxShadow="2px 0 5px #8888884a" >{{item.phase_allow}}</uni-td>
						<uni-td width="80"  verticalAlign="baseline"><img :src="item.astro1.img" style='vertical-align:middle' class="xinzuo-img" />{{item.astro1.name}}</uni-td>
						<uni-td width="165" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_front_time" :key="index" >
								{{item1}}
							</view>
						</uni-td>
						<uni-td width="105" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_front_seat" :key="index" >
								<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_front_house" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_front_element" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="165" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_accurate_time" :key="index" >
								{{item1}}
							</view>
						</uni-td>
						<uni-td width="105" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_accurate_seat" :key="index" >
								<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_accurate_house" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_accurate_element" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="165" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_after_time" :key="index" >
								{{item1}}
							</view>
						</uni-td>
						<uni-td width="105" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_after_seat" :key="index" >
								<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_after_house" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro1_after_element" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="80"  verticalAlign="baseline"><img :src="item.astro2.img" class="xinzuo-img" style='vertical-align:middle' />{{item.astro2.name}}</uni-td>
						<uni-td width="165" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_front_time" :key="index" >
								{{item1}}
							</view>
						</uni-td>
						<uni-td width="105" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_front_seat" :key="index" >
								<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_front_house" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_front_element" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="165" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_accurate_time" :key="index" >
								{{item1}}
							</view>
						</uni-td>
						<uni-td width="105" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_accurate_seat" :key="index" >
								<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_accurate_house" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_accurate_element" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="165" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_after_time" :key="index" >
								{{item1}}
							</view>
						</uni-td>
						<uni-td width="105" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_after_seat" :key="index" >
								<img :src="item1.astroImg" style='vertical-align:middle' class="xinzuo-img" />{{item1.degree}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_after_house" :key="index" >
								{{item1.name}}
							</view>
						</uni-td>
						<uni-td width="90" verticalAlign="baseline">
							<view class="" v-for="(item1,index) in item.astro2_after_element" :key="index" >
								{{item1.name}}
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
			<phase-explain></phase-explain>
		</view>
	</view>
</template>

<script>
	import {phasedata} from '../../utils/table.js'
	import {constellationList,cytaster,imaginary_point,phaseList} from '../../utils/const.js'
	import easySelect from "@/components/easy-select/easy-select.vue"
	import phaseCheckBox from "../../components/phase-checkbox/phase-checkbox.vue"
	import phaseExplain from "../../components/phase-explain/phase-explain.vue"
	import {raisPoint,concatStar,concatVirtualPoint,concatPhase,xingtiOrXuDian} from "../../utils/submit.js"
	import {constellationMapImg,xingXingMapImg,splitConDegree,splitDegree,splitConDegreeStar,xingXingYingwMapImg,starYingwMap,transformPhase,downloadFile} from "../../utils/responses.js"
	import DateTimePicker from '@/components/jc-dateTimePicker/jc-dateTimePicker.vue';
	import {isEndDyStart,isTimeSection} from '../../utils/form.js'
	import {constellationSort,compareAsc,compareDes,compareIndex,compareTimeAsc,compareTimeDes,elementSort,houseSort} from '../../utils/sort.js'
	export default{
		data(){
			return{
				formData:{
					constellationData:"白羊座",
					dots:{du:'',fen:'0',miao:'0'},
					star:[],
					imag_point:[],
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
				phasedata,
				constellationList,
				cytaster,
				imaginary_point,
				phaseList,
				mode_range:[{"value":0,"text":"容许模式"},{"value":1,"text":"精准模式"}],
				phaseCheckedData:[],
				selectedYear:[false,false,false],
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
			phaseCheckBox,
			phaseExplain,
			DateTimePicker
		},
		watch:{
			tableData(newval){
				if(!newval.length){
					this.isTableData = false;
				}else{
					let sunHeight = 0;
					if(newval.length<9){
						sunHeight = 83*newval.length+65;
					}else{
						sunHeight = 730
					}
					this.tableHeight = sunHeight;
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
			dateTimeChangeStart(value) {
				this.formData.datetimestart = value;
			},
			dateTimeChangeEnd(value){
				this.formData.datetimeend = value;
			},
			// 排序
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
			sortTime(name,e){
				console.log("排序",e)
				if(e.order=="descending"){
					// 下降排序
					this.tableData.sort(compareTimeDes(name));
				}else if(e.order=="ascending"){
					// 上升排序
					this.tableData.sort(compareTimeAsc(name));
				}else{
					// 无排序，按序号排序
					this.tableData.sort(compareIndex("index"))
				}
			},
			submit(){
				console.log("点击提交表单了")
				this.$refs.form.validate().then(res=>{
				    console.log('表单数据信息：', res);
					
					// console.log(this.tableData)
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
					this.subDisabled = true
					uni.showLoading({
					    title: '数据加载中'
					});
					// this.tableData = this.phasedata;
					let rais_point = raisPoint(this.formData.constellationData,this.formData.dots);
					let com_star = concatStar(this.formData.star);
					let vir_point = concatVirtualPoint(this.formData.imag_point);
					let phase_position=concatPhase(this.formData.mode,this.phaseCheckedData)
					let options = {
						"raising_point":rais_point,
						"common_astro":com_star,
						"virtual_point":vir_point,
						"house":Number(this.formData.houseSystem),
						"phase_model":this.formData.mode,
						"phase_position":phase_position,
						"start_time":this.formData.datetimestart,
						"end_time":this.formData.datetimeend
					}
					this.tableData = []
					this.download_option = options;
					console.log(options)
					this.$myRequest({
						url:'/phase_start/v1_0_0/data',
						method:'POST',
						data:options
					}).then(res => {
						// 获取后端传来的数据
						let resData = res.data.data
						console.log("状态"+res.statusCode)
						if(res.statusCode!=200){
							this.subDisabled = false
							return
						}
						if(resData.length!=0){
							// this.download_url = resData[0].download_url
						}else{
							uni.showToast({
								title:'未查找到相关数据'
							})
						}
						
						uni.hideLoading();
						console.log("接受的数据"+resData);
						// 取出每条数据并映射
						this.tableData = [];
						// for(let i=0; i<resData.length; i++){
						// 	let resItem = {};
						// 	// 上升点
						// 	resItem.index = i+1;
						// 	resItem.raising_point = {}
						// 	if(resData[i].raising_point==""){
						// 		resItem.raising_point.astroImg = "";
						// 		resItem.raising_point.degree = "无"
						// 	}else{
						// 		// console.log(resData[i].raising_point)
						// 		let arr = splitConDegree(resData[i].raising_point)
						// 		resItem.raising_point.astroImg = constellationMapImg(this.formData.constellationData);
						// 		// console.log(arr)
						// 		let degArr = splitDegree(arr[1]);
						// 		resItem.raising_point.degree =degArr[0].concat('°').concat(degArr[1]).concat('′').concat(degArr[2]).concat('″');
						// 	}
						// 	// 起始时间
						// 	resItem.start_time = resData[i].start_time=="" ? "无":resData[i].start_time;
						// 	// 结束时间
						// 	resItem.end_time = resData[i].end_time=="" ? "无":resData[i].end_time;
						// 	// 相位容许度
						// 	resItem.phase_allow = resData[i].phase_allow=="" ? "无":transformPhase(resData[i].phase_allow);
						// 	// 星体1
						// 	resItem.astro1 = {}
						// 	resItem.astro1.img = xingXingMapImg(resData[i].astro1);
						// 	resItem.astro1.name = resData[i].astro1==""? "无":resData[i].astro1;
						// 	// 前出时间
						// 	resItem.astro1_front_time = resData[i].astro1_front_time=="" ? "无":resData[i].astro1_front_time;
						// 	// 前出落座
						// 	resItem.astro1_front_seat = {}
						// 	if(resData[i].astro1_front_seat==""){
						// 		resItem.astro1_front_seat.astroImg = "";
						// 		resItem.astro1_front_seat.degree = "无"
						// 		resItem.astro1_front_seat.index = 13
						// 	}else{
						// 		let arr = splitConDegreeStar(resData[i].astro1_front_seat)
						// 		resItem.astro1_front_seat.astroImg = constellationMapImg(arr[0]);
						// 		resItem.astro1_front_seat.degree = arr[1];
						// 		resItem.astro1_front_seat.index = constellationSort(arr[0])
						// 	}
						// 	// 前出落宫
						// 	resItem.astro1_front_house={}
						// 	resItem.astro1_front_house.name = resData[i].astro1_front_house=="" ? "无":resData[i].astro1_front_house;
						// 	resItem.astro1_front_house.index = houseSort(resData[i].astro1_front_house)
						// 	// 前出元素
						// 	resItem.astro1_front_element = {}
						// 	resItem.astro1_front_element.name = resData[i].astro1_front_element=="" ? "无":resData[i].astro1_front_element;
						// 	resItem.astro1_front_element.index = elementSort(resData[i].astro1_front_element)
						// 	// 精准时间
						// 	resItem.astro1_accurate_time = resData[i].astro1_accurate_time=="" ? "无":resData[i].astro1_accurate_time;
						// 	// 精准落座
						// 	resItem.astro1_accurate_seat = {}
						// 	if(resData[i].astro1_accurate_seat==""){
						// 		resItem.astro1_accurate_seat.astroImg = "";
						// 		resItem.astro1_accurate_seat.degree = "无"
						// 		resItem.astro1_accurate_seat.index = 13
						// 	}else{
						// 		let arr = splitConDegreeStar(resData[i].astro1_accurate_seat)
						// 		resItem.astro1_accurate_seat.astroImg = constellationMapImg(arr[0]);
						// 		resItem.astro1_accurate_seat.degree = arr[1];
						// 		resItem.astro1_accurate_seat.index = constellationSort(arr[0])
						// 	}
						// 	// 精准落宫
						// 	resItem.astro1_accurate_house = {}
						// 	resItem.astro1_accurate_house.name = resData[i].astro1_accurate_house=="" ? "无":resData[i].astro1_accurate_house;
						// 	resItem.astro1_accurate_house.index = houseSort(resData[i].astro1_accurate_house)
						// 	// 精准元素
						// 	resItem.astro1_accurate_element = {}
						// 	resItem.astro1_accurate_element.name = resData[i].astro1_accurate_element=="" ? "无":resData[i].astro1_accurate_element;
						// 	resItem.astro1_accurate_element.index = elementSort(resData[i].astro1_accurate_element)
						// 	// 后至时间
						// 	resItem.astro1_after_time= resData[i].astro1_after_time=="" ? "无":resData[i].astro1_after_time;
						// 	// 后至落座
						// 	resItem.astro1_after_seat = {}
						// 	if(resData[i].astro1_after_seat==""){
						// 		resItem.astro1_after_seat.index = 13
						// 		resItem.astro1_after_seat.astro = ""
						// 		resItem.astro1_after_seat.astroImg = "";
						// 		resItem.astro1_after_seat.degree = "无"
						// 	}else{
						// 		let arr = splitConDegreeStar(resData[i].astro1_after_seat)
						// 		resItem.astro1_after_seat.index = constellationSort(arr[0])
						// 		resItem.astro1_after_seat.astro = arr[0]
						// 		resItem.astro1_after_seat.astroImg = constellationMapImg(arr[0]);
						// 		resItem.astro1_after_seat.degree = arr[1];
						// 	}
						// 	// 后至落宫
						// 	resItem.astro1_after_house = {}
						// 	resItem.astro1_after_house.name = resData[i].astro1_after_house=="" ? "无":resData[i].astro1_after_house;
						// 	resItem.astro1_after_house.index = houseSort(resData[i].astro1_after_house)
						// 	// 后至元素
						// 	resItem.astro1_after_element = {}
						// 	resItem.astro1_after_element.name = resData[i].astro1_after_element=="" ? "无":resData[i].astro1_after_element;
						// 	resItem.astro1_after_element.index = elementSort(resData[i].astro1_after_element)
						// 	// 星体2
						// 	resItem.astro2 = {}
						// 	resItem.astro2.img = xingXingMapImg(resData[i].astro2);
						// 	resItem.astro2.name = resData[i].astro2==""? "无":resData[i].astro2;
						// 	// 前出时间
						// 	resItem.astro2_front_time = resData[i].astro2_front_time=="" ? "无":resData[i].astro2_front_time;
						// 	// 前出落座
						// 	resItem.astro2_front_seat = {}
						// 	if(resData[i].astro2_front_seat==""){
						// 		resItem.astro2_front_seat.astroImg = "";
						// 		resItem.astro2_front_seat.degree = "无"
						// 		resItem.astro1_front_seat.index = 13
						// 	}else{
						// 		let arr = splitConDegreeStar(resData[i].astro2_front_seat)
						// 		resItem.astro2_front_seat.astroImg = constellationMapImg(arr[0]);
						// 		resItem.astro2_front_seat.degree = arr[1];
						// 		resItem.astro1_front_seat.index = constellationSort(arr[0])
						// 	}
						// 	// 前出落宫
						// 	resItem.astro2_front_house = {}
						// 	resItem.astro2_front_house.name = resData[i].astro2_front_house=="" ? "无":resData[i].astro2_front_house;
						// 	resItem.astro2_front_house.index = houseSort(resData[i].astro2_front_house)
						// 	// 前出元素
						// 	resItem.astro2_front_element = {}
						// 	resItem.astro2_front_element.name = resData[i].astro2_front_element=="" ? "无":resData[i].astro2_front_element;
						// 	resItem.astro2_front_element.index = elementSort(resData[i].astro2_front_element)
						// 	// 精准时间
						// 	resItem.astro2_accurate_time = resData[i].astro2_accurate_time=="" ? "无":resData[i].astro2_accurate_time;
						// 	// 精准落座
						// 	resItem.astro2_accurate_seat = {}
						// 	if(resData[i].astro2_accurate_seat==""){
						// 		resItem.astro2_accurate_seat.astroImg = "";
						// 		resItem.astro2_accurate_seat.degree = "无"
						// 		resItem.astro2_accurate_seat.index = 13
						// 	}else{
						// 		let arr = splitConDegreeStar(resData[i].astro2_accurate_seat)
						// 		resItem.astro2_accurate_seat.astroImg = constellationMapImg(arr[0]);
						// 		resItem.astro2_accurate_seat.degree = arr[1];
						// 		resItem.astro2_accurate_seat.index = constellationSort(arr[0])
						// 	}
						// 	// 精准落宫
						// 	resItem.astro2_accurate_house = {}
						// 	resItem.astro2_accurate_house.name = resData[i].astro2_accurate_house=="" ? "无":resData[i].astro2_accurate_house;
						// 	resItem.astro2_accurate_house.index = houseSort(resData[i].astro2_accurate_house)
						// 	// 精准元素
						// 	resItem.astro2_accurate_element = {}
						// 	resItem.astro2_accurate_element.name = resData[i].astro2_accurate_element=="" ? "无":resData[i].astro2_accurate_element;
						// 	resItem.astro2_accurate_element .index = elementSort(resData[i].astro2_accurate_element)
						// 	// 后至时间
						// 	resItem.astro2_after_time= resData[i].astro2_after_time=="" ? "无":resData[i].astro2_after_time;
						// 	// 后至落座
						// 	resItem.astro2_after_seat = {}
						// 	if(resData[i].astro2_after_seat==""){
						// 		resItem.astro2_after_seat.astroImg = "";
						// 		resItem.astro2_after_seat.degree = "无"
						// 		resItem.astro2_after_seat.index =13
						// 	}else{
						// 		let arr = splitConDegreeStar(resData[i].astro2_after_seat)
						// 		resItem.astro2_after_seat.astroImg = constellationMapImg(arr[0]);
						// 		resItem.astro2_after_seat.degree = arr[1];
						// 		resItem.astro2_after_seat.index =  constellationSort(arr[0])
						// 	}
						// 	// 后至落宫
						// 	resItem.astro2_after_house = {}
						// 	resItem.astro2_after_house.name = resData[i].astro2_after_house=="" ? "无":resData[i].astro2_after_house;
						// 	resItem.astro2_after_house.index = houseSort(resData[i].astro2_after_house)
						// 	// 后至元素
						// 	resItem.astro2_after_element = {}
						// 	resItem.astro2_after_element.name = resData[i].astro2_after_element=="" ? "无":resData[i].astro2_after_element;
						// 	resItem.astro2_after_element.index = elementSort(resData[i].astro2_after_element)
						// 	this.tableData.push(resItem);
						// }
						
						for(let i=0; i<resData.length; i++){
							let resItem = {};
							// 上升点
							resItem.index = i+1;
							resItem.raising_point = {}
							resItem.raising_point.astroImg = constellationMapImg(this.formData.constellationData);
							resItem.raising_point.degree =String(this.formData.dots.du).concat('°').concat(String(this.formData.dots.fen)).concat('′').concat(String(this.formData.dots.miao)).concat('″');
							// 起始时间
							resItem.start_time = this.formData.datetimestart;
							// 结束时间
							resItem.end_time = this.formData.datetimeend;
							// 相位容许度
							resItem.phase_allow = resData[i].phase_allow=="" ? "无":transformPhase(resData[i].phase_allow);
							// 星体1
							resItem.astro1 = {}
							resItem.astro1.img = xingXingMapImg(resData[i].astro1);
							resItem.astro1.name = resData[i].astro1==""? "无":resData[i].astro1;
							
							// 前出时间
							resItem.astro1_front_time = []
							if("astro1_front_time" in resData[i]){
								resItem.astro1_front_time = resData[i].astro1_front_time;
							}else{
								resItem.astro1_front_time[0] = "无"
							}
							
							// 前出落座
							resItem.astro1_front_seat = []
							if("astro1_front_seat" in resData[i]){
								for(let j=0; j<resData[i].astro1_front_seat.length; j++){
									resItem.astro1_front_seat[j]= {};
									let arr = splitConDegreeStar(resData[i].astro1_front_seat[j])
									resItem.astro1_front_seat[j].astroImg = constellationMapImg(arr[0]);
									resItem.astro1_front_seat[j].degree = arr[1];
									resItem.astro1_front_seat[j].index = constellationSort(arr[0])
								}
							}else{
								resItem.astro1_front_seat[0] = {}
								resItem.astro1_front_seat[0].astroImg = "";
								resItem.astro1_front_seat[0].degree= "无"
								resItem.astro1_front_seat[0].index = 13
							}
							
							// 前出落宫
							resItem.astro1_front_house = []
							if("astro1_front_house" in resData[i]){
								for(let j=0; j<resData[i].astro1_front_house.length; j++){
									resItem.astro1_front_house[j]= {};
									resItem.astro1_front_house[j].name = resData[i].astro1_front_house[j];
									resItem.astro1_front_house[j].index = houseSort(resData[i].astro1_front_house[j])
								}
							}else{
								resItem.astro1_front_house[0] = {}
								resItem.astro1_front_house[0].name= "无"
								resItem.astro1_front_house[0].index = houseSort(resItem.astro1_front_house[0].name)
							}

							// 前出元素
							resItem.astro1_front_element = []
							if("astro1_front_element" in resData[i]){
								for(let j=0; j<resData[i].astro1_front_element.length; j++){
									resItem.astro1_front_element[j]= {};
									resItem.astro1_front_element[j].name = resData[i].astro1_front_element[j];
									resItem.astro1_front_element[j].index = elementSort(resData[i].astro1_front_element[j])
								}
							}else{
								resItem.astro1_front_element[0] = {}
								resItem.astro1_front_element[0].name= "无"
								resItem.astro1_front_element[0].index = elementSort("无")
							}
							
							// 精准时间
							resItem.astro1_accurate_time = []
							if("astro1_accurate_time" in resData[i]){
								resItem.astro1_accurate_time = resData[i].astro1_accurate_time;
							}else{
								resItem.astro1_accurate_time[0] = "无"
							}
		
							// 精准落座
							resItem.astro1_accurate_seat = []
							if("astro1_accurate_seat" in resData[i]){
								for(let j=0; j<resData[i].astro1_accurate_seat.length; j++){
									resItem.astro1_accurate_seat[j]= {};
									let arr = splitConDegreeStar(resData[i].astro1_accurate_seat[j])
									resItem.astro1_accurate_seat[j].astroImg = constellationMapImg(arr[0]);
									resItem.astro1_accurate_seat[j].degree = arr[1];
									resItem.astro1_accurate_seat[j].index = constellationSort(arr[0])
								}
							}else{
								resItem.astro1_accurate_seat[0] = {}
								resItem.astro1_accurate_seat[0].astroImg = "";
								resItem.astro1_accurate_seat[0].degree= "无"
								resItem.astro1_accurate_seat[0].index = 13
							}
							
							// 精准落宫
							resItem.astro1_accurate_house = []
							if("astro1_accurate_house" in resData[i]){
								for(let j=0; j<resData[i].astro1_accurate_house.length; j++){
									resItem.astro1_accurate_house[j]= {};
									resItem.astro1_accurate_house[j].name = resData[i].astro1_accurate_house[j];
									resItem.astro1_accurate_house[j].index = houseSort(resData[i].astro1_accurate_house[j])
								}
							}else{
								resItem.astro1_accurate_house[0] = {}
								resItem.astro1_accurate_house[0].name= "无"
								resItem.astro1_accurate_house[0].index = houseSort(resItem.astro1_accurate_house[0].name)
							}
							
							// 精准元素
							resItem.astro1_accurate_element = []
							if("astro1_accurate_element" in resData[i]){
								for(let j=0; j<resData[i].astro1_accurate_element.length; j++){
									resItem.astro1_accurate_element[j]= {};
									resItem.astro1_accurate_element[j].name = resData[i].astro1_accurate_element[j];
									resItem.astro1_accurate_element[j].index = elementSort(resData[i].astro1_accurate_element[j])
								}
							}else{
								resItem.astro1_accurate_element[0] = {}
								resItem.astro1_accurate_element[0].name= "无"
								resItem.astro1_accurate_element[0].index = elementSort("无")
							}
							
							// 后至时间
							resItem.astro1_after_time = []
							if("astro1_after_time" in resData[i]){
								resItem.astro1_after_time = resData[i].astro1_after_time;
							}else{
								resItem.astro1_after_time[0] = "无"
							}
							
							// 后至落座
							resItem.astro1_after_seat = []
							if("astro1_after_seat" in resData[i]){
								for(let j=0; j<resData[i].astro1_after_seat.length; j++){
									resItem.astro1_after_seat[j]= {};
									let arr = splitConDegreeStar(resData[i].astro1_after_seat[j])
									resItem.astro1_after_seat[j].astroImg = constellationMapImg(arr[0]);
									resItem.astro1_after_seat[j].degree = arr[1];
									resItem.astro1_after_seat[j].index = constellationSort(arr[0])
								}
							}else{
								resItem.astro1_after_seat[0] = {}
								resItem.astro1_after_seat[0].astroImg = "";
								resItem.astro1_after_seat[0].degree= "无"
								resItem.astro1_after_seat[0].index = 13
							}
							
							// 后至落宫
							resItem.astro1_after_house = []
							if("astro1_after_house" in resData[i]){
								for(let j=0; j<resData[i].astro1_after_house.length; j++){
									resItem.astro1_after_house[j]= {};
									resItem.astro1_after_house[j].name = resData[i].astro1_after_house[j];
									resItem.astro1_after_house[j].index = houseSort(resData[i].astro1_after_house[j])
								}
							}else{
								resItem.astro1_after_house[0] = {}
								resItem.astro1_after_house[0].name= "无"
								resItem.astro1_after_house[0].index = houseSort(resItem.astro1_after_house[0].name)
							}
							
							// 后至元素
							resItem.astro1_after_element = []
							if("astro1_after_element" in resData[i]){
								for(let j=0; j<resData[i].astro1_after_element.length; j++){
									resItem.astro1_after_element[j]= {};
									resItem.astro1_after_element[j].name = resData[i].astro1_after_element[j];
									resItem.astro1_after_element[j].index = elementSort(resData[i].astro1_after_element[j])
								}
							}else{
								resItem.astro1_after_element[0] = {}
								resItem.astro1_after_element[0].name= "无"
								resItem.astro1_after_element[0].index = elementSort("无")
							}
							// 星体2
							resItem.astro2 = {}
							resItem.astro2.img = xingXingMapImg(resData[i].astro2);
							resItem.astro2.name = resData[i].astro2==""? "无":resData[i].astro2;
							
							// 前出时间
							resItem.astro2_front_time = []
							if("astro2_front_time" in resData[i]){
								resItem.astro2_front_time = resData[i].astro2_front_time;
							}else{
								resItem.astro2_front_time[0] = "无"
							}
							
							// 前出落座
							resItem.astro2_front_seat = []
							if("astro2_front_seat" in resData[i]){
								for(let j=0; j<resData[i].astro2_front_seat.length; j++){
									resItem.astro2_front_seat[j]= {};
									let arr = splitConDegreeStar(resData[i].astro2_front_seat[j])
									resItem.astro2_front_seat[j].astroImg = constellationMapImg(arr[0]);
									resItem.astro2_front_seat[j].degree = arr[1];
									resItem.astro2_front_seat[j].index = constellationSort(arr[0])
								}
							}else{
								resItem.astro2_front_seat[0] = {}
								resItem.astro2_front_seat[0].astroImg = "";
								resItem.astro2_front_seat[0].degree= "无"
								resItem.astro2_front_seat[0].index = 13
							}
							
							// 前出落宫
							resItem.astro2_front_house = []
							if("astro2_front_house" in resData[i]){
								for(let j=0; j<resData[i].astro2_front_house.length; j++){
									resItem.astro2_front_house[j]= {};
									resItem.astro2_front_house[j].name = resData[i].astro2_front_house[j];
									resItem.astro2_front_house[j].index = houseSort(resData[i].astro2_front_house[j])
								}
							}else{
								resItem.astro2_front_house[0] = {}
								resItem.astro2_front_house[0].name= "无"
								resItem.astro2_front_house[0].index = houseSort(resItem.astro2_front_house[0].name)
							}
							
							// 前出元素
							resItem.astro2_front_element = []
							if("astro2_front_element" in resData[i]){
								for(let j=0; j<resData[i].astro2_front_element.length; j++){
									resItem.astro2_front_element[j]= {};
									resItem.astro2_front_element[j].name = resData[i].astro2_front_element[j];
									resItem.astro2_front_element[j].index = elementSort(resData[i].astro2_front_element[j])
								}
							}else{
								resItem.astro2_front_element[0] = {}
								resItem.astro2_front_element[0].name= "无"
								resItem.astro2_front_element[0].index = elementSort("无")
							}
							
							// 精准时间
							resItem.astro2_accurate_time = []
							if("astro2_accurate_time" in resData[i]){
								resItem.astro2_accurate_time = resData[i].astro2_accurate_time;
							}else{
								resItem.astro2_accurate_time[0] = "无"
							}
									
							// 精准落座
							resItem.astro2_accurate_seat = []
							if("astro2_accurate_seat" in resData[i]){
								for(let j=0; j<resData[i].astro2_accurate_seat.length; j++){
									resItem.astro2_accurate_seat[j]= {};
									let arr = splitConDegreeStar(resData[i].astro2_accurate_seat[j])
									resItem.astro2_accurate_seat[j].astroImg = constellationMapImg(arr[0]);
									resItem.astro2_accurate_seat[j].degree = arr[1];
									resItem.astro2_accurate_seat[j].index = constellationSort(arr[0])
								}
							}else{
								resItem.astro2_accurate_seat[0] = {}
								resItem.astro2_accurate_seat[0].astroImg = "";
								resItem.astro2_accurate_seat[0].degree= "无"
								resItem.astro2_accurate_seat[0].index = 13
							}
							
							// 精准落宫
							resItem.astro2_accurate_house = []
							if("astro2_accurate_house" in resData[i]){
								for(let j=0; j<resData[i].astro2_accurate_house.length; j++){
									resItem.astro2_accurate_house[j]= {};
									resItem.astro2_accurate_house[j].name = resData[i].astro2_accurate_house[j];
									resItem.astro2_accurate_house[j].index = houseSort(resData[i].astro2_accurate_house[j])
								}
							}else{
								resItem.astro2_accurate_house[0] = {}
								resItem.astro2_accurate_house[0].name= "无"
								resItem.astro2_accurate_house[0].index = houseSort(resItem.astro2_accurate_house[0].name)
							}
							
							// 精准元素
							resItem.astro2_accurate_element = []
							if("astro2_accurate_element" in resData[i]){
								for(let j=0; j<resData[i].astro2_accurate_element.length; j++){
									resItem.astro2_accurate_element[j]= {};
									resItem.astro2_accurate_element[j].name = resData[i].astro2_accurate_element[j];
									resItem.astro2_accurate_element[j].index = elementSort(resData[i].astro2_accurate_element[j])
								}
							}else{
								resItem.astro2_accurate_element[0] = {}
								resItem.astro2_accurate_element[0].name= "无"
								resItem.astro2_accurate_element[0].index = elementSort("无")
							}
							
							// 后至时间
							resItem.astro2_after_time = []
							if("astro2_after_time" in resData[i]){
								resItem.astro2_after_time = resData[i].astro2_after_time;
							}else{
								resItem.astro2_after_time[0] = "无"
							}
							
							// 后至落座
							resItem.astro2_after_seat = []
							if("astro2_after_seat" in resData[i]){
								for(let j=0; j<resData[i].astro2_after_seat.length; j++){
									resItem.astro2_after_seat[j]= {};
									let arr = splitConDegreeStar(resData[i].astro2_after_seat[j])
									resItem.astro2_after_seat[j].astroImg = constellationMapImg(arr[0]);
									resItem.astro2_after_seat[j].degree = arr[1];
									resItem.astro2_after_seat[j].index = constellationSort(arr[0])
								}
							}else{
								resItem.astro2_after_seat[0] = {}
								resItem.astro2_after_seat[0].astroImg = "";
								resItem.astro2_after_seat[0].degree= "无"
								resItem.astro2_after_seat[0].index = 13
							}
							
							// 后至落宫
							resItem.astro2_after_house = []
							if("astro2_after_house" in resData[i]){
								for(let j=0; j<resData[i].astro2_after_house.length; j++){
									resItem.astro2_after_house[j]= {};
									resItem.astro2_after_house[j].name = resData[i].astro2_after_house[j];
									resItem.astro2_after_house[j].index = houseSort(resData[i].astro2_after_house[j])
								}
							}else{
								resItem.astro2_after_house[0] = {}
								resItem.astro2_after_house[0].name= "无"
								resItem.astro2_after_house[0].index = houseSort(resItem.astro2_after_house[0].name)
							}
							
							// 后至元素
							resItem.astro2_after_element = []
							if("astro2_after_element" in resData[i]){
								for(let j=0; j<resData[i].astro2_after_element.length; j++){
									resItem.astro2_after_element[j]= {};
									resItem.astro2_after_element[j].name = resData[i].astro2_after_element[j];
									resItem.astro2_after_element[j].index = elementSort(resData[i].astro2_after_element[j])
								}
							}else{
								resItem.astro2_after_element[0] = {}
								resItem.astro2_after_element[0].name= "无"
								resItem.astro2_after_element[0].index =elementSort("无")
							}
							this.tableData.push(resItem);
						}
						this.subDisabled = false
					}).catch(err =>{
						console.log('接口失败：', err);
						uni.showToast({
							title:'接口数据错误'
						})
						uni.hideLoading();
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
				downloadFile(this,'/phase_start/v1_0_0/download')
			}
		}
	}
</script>

<style lang="scss">
	.phase-start-content{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.require-form{
		// width: 100%;
		// height: 650px;
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
				text-align: left;
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
		// width: 100%;
		border-radius: 8px;
		// width: 1850px;
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
	.inp:focus {
	    border-style:solid;  
	    border-color: #03a9f4;  
	    box-shadow: 0 0 15px #03a9f4; 
	}
	.form-button-no-jinyong:hover{
		background: #6682BE;
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
