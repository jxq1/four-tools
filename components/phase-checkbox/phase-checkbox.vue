<template>
	<view class="checkbox__phase">
		<view class="checkbox__all">
			<checkbox-group name="phase" class="checkbox__phase_All" @change="phaseAllChoose">
				<label class="checkbox__item" :class="[phaseAllChecked ? 'is-checked':'']">
					<!-- <checkbox class="check-box" style="transform:scale(0.62)" :value="allChecked" :checked="phaseAllChecked ? true : false"/> -->
					<checkbox class="hidden" hidden :value="allChecked" :checked="phaseAllChecked ? true : false"/>
					<view class="checkbox__inner">
						<view class="checkbox__inner-icon"></view>
					</view>
					<text>全选</text>
				</label>
			</checkbox-group>
		</view>
		<view class="">
			<checkbox-group name="phase" @change="changeCheckbox" class="checkobx__list">
				<label v-for="(item,index) in phaseList" :key=item.id class="checkbox__item" :class="[phaseChecked.includes(String(item.id)) ? 'is-checked':'']">	
					<!-- <checkbox class="check-box" color="#002F93" style="transform:scale(0.6)" :value="String(item.id)" :checked="phaseChecked.includes(String(item.id))"/> -->
					<checkbox class="hidden" hidden :value="String(item.id)" :checked="phaseChecked.includes(String(item.id))"/>
					<view class="checkbox__inner">
						<view class="checkbox__inner-icon"></view>
					</view>
					<view class="" @click.stop.prevent="nolink">
						<phase-box @get-number-data="getNumData" :phaseData="item.data" :mode = "mode"></phase-box>
					</view>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	import {phaseList,jzPhaseList} from '../../utils/const.js'
	export default{
		emits:["get-phase-checked"],
		props:["mode"],
		data(){
			return{
				allChecked:"all",
				// 全选框判断
				phaseAllChecked:false,
				// 相位集合
				phaseList,
				jzPhaseList,
				// phaseAllList:[],
				// 复选框选中集合
				phaseChecked:[],
				phaseLastChecked:[],
				// 所有信息
				phaseAllData:[],
				// 选中的详细信息
				phaseSelectedData:[]
			}
		},
		created() {
			 // this.phaseAllData = this.phaseList
			 for(var i=0;i<this.phaseList.length;i++){
			 	this.phaseAllData.push(this.phaseList[i]);
			 }
		},
		watch:{
			mode(newval){
				// 取消全选
				this.phaseAllChecked = false;
				this.phaseChecked=[];
				// 清除掉选择的数据
				this.phaseSelectedData = [];
				this.phaseLastChecked = [];
				this.phaseAllData = [];
				if(newval==1){
					// 如果选择为精准模式，则要选择的数据内容会发生改变
					for(var i=0;i<this.jzPhaseList.length;i++){
						this.phaseAllData.push(this.jzPhaseList[i]);
					}
					console.log("精准模式下的所有数据",this.phaseAllData);
				}else{
					for(var i=0;i<this.phaseList.length;i++){
						this.phaseAllData.push(this.phaseList[i]);
					}
				}
			}
		},
		methods:{
			// 相位全选复选框后触发事件
			phaseAllChoose(e){
				// console.log("点击全选后",e)
				// console.log("所以信息0",this.phaseList)
				let chooseItem = e.detail.value;
				if(chooseItem[0] === "all"){
					// 全选
					this.phaseAllChecked = true;
					for(let item of this.phaseList){
						let itemVal = String(item.id);
						if(!this.phaseChecked.includes(itemVal)){
							this.phaseChecked.push(itemVal)
						}
					}
					// 所有数据选择上
					this.phaseSelectedData = this.phaseAllData
					// console.log("全选：",this.phaseChecked)
					console.log("全选：",this.phaseSelectedData)
				}else{
					// 取消全选
					this.phaseAllChecked = false;
					this.phaseChecked=[]
					// 清除掉选择的数据
					this.phaseSelectedData = []
				}
				this.phaseLastChecked = this.phaseChecked;
				this.$emit("get-phase-checked",this.phaseChecked,this.phaseSelectedData)
				// console.log("所以信息1",this.phaseList)
			},
			// 相位复选框点击后触发的事件
			changeCheckbox(e){
				// console.log("所以信息2",this.phaseList)
				console.log(e)
				this.phaseChecked = e.detail.value;
				console.log("选择：",this.phaseChecked)
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if(this.phaseChecked.length > 0 && this.phaseChecked.length == this.phaseList.length){
					this.phaseAllChecked = true
					this.phaseSelectedData = this.phaseAllData
				}else{
					this.phaseAllChecked =false
					// console.log("所以信息4",this.phaseList)
					if((this.phaseChecked.length+1) ==this.phaseLastChecked.length){
						// 去掉勾选的
						console.log("删除勾选的");
						let tempData = [];
						let curLength =this.phaseSelectedData.length
						// console.log("所以信息5",this.phaseList)
						for (let i = 0; i < curLength; i++) {
							let currentData = this.phaseSelectedData.pop();
							// console.log("当前数据",currentData)
							// 查找是否要删除弹出的数据
							let findData = this.phaseChecked.indexOf(String(currentData.id));
							// console.log("是否放回",findData)
							// 不是要放回去
							if(findData !==-1){
								tempData.push(currentData)
							}
							// console.log("所以信息6",this.phaseList)
						}
						this.phaseSelectedData = tempData;
						// console.log("所以信息3",this.phaseList)
					}
					else{
						// 添加勾选的
						// for(var i=0;i<this.phaseAllData.length;i++){
						// 	// console.log("结尾"+this.phaseChecked[this.phaseChecked.length-1],this.phaseAllData[i].id)
						// 	if(this.phaseChecked[this.phaseChecked.length-1]==this.phaseAllData[i].id){
						// 		// console.log("123",this.phaseChecked[this.phaseChecked.length-1])
								
						// 		this.phaseSelectedData.push(this.phaseAllData[i])
						// 		break;
						// 	}
						// }
						console.log("添加勾选的");
						for(var i=0;i<this.phaseChecked.length;i++){
							
							let findData = this.phaseLastChecked.indexOf(this.phaseChecked[i]);
							console.log(this.phaseChecked+"find"+findData);
							if(findData == -1){
								// 找到要添加的数据了
								let curindex = parseInt(this.phaseChecked[i])
								this.phaseSelectedData.push(this.phaseAllData[curindex-1])
								break;
							}
						}
					}
				}
				// console.log("选择：",this.phaseChecked)
				// console.log("选择的数据",this.phaseSelectedData)
				this.phaseLastChecked = this.phaseChecked;
				this.$emit("get-phase-checked",e.detail.value,this.phaseSelectedData)
				// console.log("所以信息",this.phaseList)
			},
			getNumData(e1,e2,e3){
				console.log("phase-box传来的数据"+e1+e2+e3)
				for(var i=0;i<this.phaseAllData.length;i++){
					if(e2===this.phaseAllData[i].data){
						this.phaseAllData[i].pro = parseFloat(String(e1)).toFixed(1);
						this.phaseAllData[i].later = parseFloat(String(e3)).toFixed(1);
						console.log("123abc"+this.phaseAllData[i].pro+this.phaseAllData[i].later)
					}
				}
				 console.log("alldata",this.phaseAllData)
			},
			// 阻止向上传播
			nolink(){
				console.log("点击了文字")
			}
		}
	}
</script>

<style lang="scss">
	$checked-color: #002F93;
	$border-color: #999999;
	// .check-box:hover{
	// 	border:1px solid #002F93 !important;
	// 	outline:none;
	// }
	.checkbox__phase{
		display: flex;
		margin-bottom: 8px;
		.checkbox__all{
			font-size: 8px;
			.checkbox__phase_All{
				display: flex;
				align-items: center;
			}
			text{
				width: 28px;
				height: 20px;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}
			padding-right: 18px;
		}
		.checkobx__list{
			display: flex;
			flex-wrap: wrap;
			.checkbox__item{
				display: flex;
			}
			// padding-left: 26px;
		}
	}
	// .check-box{
		
	// }
	checkbox::after{
		background-color: #002F93;
	}
	.checkbox__item{
		display: flex;
		align-items: center;
		position: relative;
		height: 48px;
		// margin-bottom: 8px;
		.hidden {
			position: absolute;
			opacity: 0;
		}
		// 多选样式
		.checkbox__inner {
			/* #ifndef APP-NVUE */
			flex-shrink: 0;
			box-sizing: border-box;
			/* #endif */
			position: relative;
			width: 16px;
			height: 16px;
			border: 1px solid $border-color;
			border-radius: 2px;
			background-color: #fff;
			z-index: 1;
			margin-right: 10px;
			.checkbox__inner-icon {
				position: absolute;
				/* #ifdef APP-NVUE */
				top: 2px;
				/* #endif */
				/* #ifndef APP-NVUE */
				top: 1px;
				/* #endif */
				left: 5px;
				height: 8px;
				width: 4px;
				background: #002F93;
				border-right-width: 1px;
				border-right-color: #fff;
				border-right-style: solid;
				border-bottom-width:1px ;
				border-bottom-color: #fff;
				border-bottom-style: solid;
				opacity: 0;
				transform-origin: center;
				transform: rotate(40deg);
			}
		}
	}
	
	.checkbox__item{
		&.is-checked{
			.checkbox__inner {
				border-color: $checked-color;
				background-color: $checked-color;
				.checkbox__inner-icon {
					opacity: 1;
					transform: rotate(45deg);
				}
			}
		}
	}
	.checkbox__inner:hover{
		border:1px solid #002F93 !important;
		outline:none;
	}
	.radio__inner:hover{
		border:1px solid #002F93 !important;
		outline:none;
	}
	
</style>
