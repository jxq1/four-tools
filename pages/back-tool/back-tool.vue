<template>
	<view>
		<view class="require-form">
			<uni-forms :modelValue="formData" :rules="rules"  ref="form">
				<uni-forms-item label="计算点" name="dots" class="jiSuanDian">
					<view class="dots-input">
						<view class="dots-input-l">
							<uni-easyinput
							:clearable="false"
							v-model="formData.dots"
							type="number"
							class="dots-du"
							>
							</uni-easyinput>
							<text>度</text>
							<uni-easyinput
							:clearable="false"
							v-model="formData.dots"
							type="number"
							class="dots-fen"
							>
							</uni-easyinput>
							<text>分</text>
							<uni-easyinput
							:clearable="false"
							v-model="formData.dots"
							type="number"
							class="dots-miao"
							>
							</uni-easyinput>
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
				<!-- <uni-forms-item label="   " name="phase">
					<uni-data-checkbox multiple v-model="formData.phaseData" :localdata="phaseList" @change="changeMode"></uni-data-checkbox>
					<phase-box :phaseData="phaseList[1].text"></phase-box>
				</uni-forms-item> -->
				<uni-forms-item label="   " name="phaseData" class="">
					<phase-check-box @get-phase-checked="getPhaseChecked" :mode = "formData.mode"></phase-check-box>
					<!-- <phase-check-box @get-phase-checked="getPhaseChecked"></phase-check-box> -->
				</uni-forms-item>
				<uni-forms-item label="时间范围" name="data_range">
					<view class="data-time">
						<view class="data-time-button">
							<button type="default" size="mini" @click="dataTimeClick(1)">10年</button>
							<button type="default" size="mini" @click="dataTimeClick(2)">20年</button>
							<button type="default" size="mini" @click="dataTimeClick(3)">30年</button>
						</view>
						<view class="data-time-select">
							<uni-datetime-picker
							 class="data-time-start"
							v-model="formData.datetimestart"
							type="datetime"
							start="1900-3-20 12:00:00"
							end="2022-6-20 20:00:00"
							/>
							<text class="data-time-center">----</text>
							<uni-datetime-picker
							 class="data-time-end"
							v-model="formData.datetimeend"
							type="datetime"
							start="1900-3-20 12:00:00"
							end="2022-6-20 20:00:00"
							/>
							<button @click="submit" class="uni-form-button">确定</button>
						</view>
					</view>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="file-list-container">
			<uni-table border stripe emptyText="暂无更多数据" >
				<!-- 表头行 -->
				<uni-tr>
				    <uni-th align="center" width="40px">计算点</uni-th>
				    <uni-th align="center">运算相位</uni-th>
				    <uni-th align="center">前容许度</uni-th>
					<uni-th align="center">目标星体</uni-th>
					<uni-th align="center">后容许度</uni-th>
					<uni-th align="center">目标星体前出</uni-th>
					<uni-th align="center">目标星体后至</uni-th>
					<uni-th align="center">起始时间</uni-th>
					<uni-th align="center">终止时间</uni-th>
					<uni-th align="center">前出时间</uni-th>
					<uni-th align="center">后至时间</uni-th>
					<uni-th align="center">太阳所起星座及黄道度数</uni-th>
					<uni-th align="center">太阳所至星座及黄道度数</uni-th>
				</uni-tr>
			</uni-table>
		</view>
		<view class="explain">
			
		</view>
	</view>
</template>

<script>
	import {cytaster,imaginary_point,phaseList} from '../../utils/const.js'
	import phaseBox from "../../components/phase-box/phase-box.vue"
	import phaseCheckBox from "../../components/phase-checkbox/phase-checkbox.vue"
	export default {
		data() {
			return {
				formData:{
					dots:1,
					star:[1,2],
					imag_point:[1,2],
					mode:0,
					phaseChecked:[],
					datetimestart:"1970-01-01 00:00:00",
					datetimeend:"1999-12-31 23:59:00"
				},
				cytaster,
				imaginary_point,
				selectStarAll:false,
				selectImagAll:false,
				mode_range:[{"value":0,"text":"容许模式"},{"value":1,"text":"精准模式"}],
				proOrLater:"前",
				phase_cur:5.2,
				phaseList,
				rules:{
					
				},
			}
		},
		components:{
			phaseBox,
			phaseCheckBox
		},
		watch:{
			"formData.mode":function(newVal){
				console.log("模式发生了改变",newVal)
			}
		},
		methods: {
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
						this.formData.imag_point = [0,1,2,3,4,5,6,7]
						this.selectImagAll = true;
					}else if(this.selectImagAll && selectAll==false){
						this.formData.imag_point = []
						this.selectImagAll = false
					}else if(selectAll && this.selectImagAll){
						this.formData.imag_point = this.formData.imag_point.filter((value,index)=>{
							return value!=0;
						})
						this.selectImagAll = false
					}else if(!this.selectImagAll && e.detail.value.length==7){
						this.formData.imag_point = [0,1,2,3,4,5,6,7]
						this.selectImagAll = true;
					}
				}
				console.log("虚点2：",this.formData.imag_point)
			},
			changeMode(e){
				console.log("点击了模式",e)
				this.formData.mode = e.detail.value;
			},
			getPhaseChecked(e){
				console.log("e",e)
				this.formData.phaseChecked = e;
				console.log("formdata",this.formData.phaseChecked)
			},
			dataTimeClick(){
				
			}
		}
	}
</script>

<style lang="scss">
	.jiSuanDian{
		margin-bottom: 5px;
	}
	.dots-input{
		width: 100%;
		height: 32px;
		display: flex;
		.dots-input-l{
			width: 165px;
			display: flex;
			.dots-du{
				width: 40px;
			}
			.dots-fen{
				width: 40px;
			}
			.dots-miao{
				width: 40px;
			}
			text{
				width: 15px;
				// height: 100%;
				line-height: 40px;
				text-align: center;
				vertical-align: middle;
			}
		}
		.dots-input-r{
			flex:1;
			font-size: 4px;
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
	.data-time{
		.data-time-button{
			// width: 120px;
			
		}
		.data-time-select{
			width: 450px;
			display: flex;
		}
	}
	
	.uni-form-button{
		width: 80px;
	}
	
</style>
