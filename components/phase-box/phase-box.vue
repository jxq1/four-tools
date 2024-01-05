<template>
	<view class="phase-box">
		<uni-number-box v-show="mode==0" :step="0.1" :min="0" :max="10.0" v-model="phase_cur_rx1" :inputZhif="inputPro" mode="mode"/>
		<uni-number-box-no v-show="mode==1" :step="0.1" :min="0" :max="10.0" v-model="phase_cur_jz" :inputZhif="inputPro" mode="mode"/>
		<view class="phase-box-text">
			<text>{{phaseData}}</text>
		</view>
		<uni-number-box v-show="mode==0" :step="0.1" :min="0" :max="10.0" v-model="phase_cur_rx2" :inputZhif="inputLater" :mode="mode"/>
		<uni-number-box-no v-show="mode==1" :step="0.1" :min="0" :max="10.0" v-model="phase_cur_jz" :inputZhif="inputLater" :mode="mode"/>
	</view>
</template>

<script>
	import uniNumberBoxNo from "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box-no.vue"
	export default {
		data(){
			return{
				// phaseData:"合相",
				inputPro:"前",
				inputLater:"后",
				phase_cur_rx1:5.2,
				phase_cur_rx2:5.2,
				phase_cur_jz:5.0,
				phase_data:{}
			}
		},
		props:["phaseData","mode"],
		components:{
			uniNumberBoxNo
		},
		created(){
			this.phase_data.pro = 5.2;
			this.phase_data.name = this.phaseData;
			this.phase_data.Later = 5.2;
			// this.$emit("get-number-data",this.phase_cur_rx1,this.phaseData,this.phase_cur_rx2)
		},
		watch:{
			mode:function(newval){
				console.log("mode发生改变",newval)
			},
			phase_cur_rx1:function(newval){
				console.log("前发生改变",newval)
				this.phase_data.pro = newval;
				console.log(this.phase_data)
				this.$emit("get-number-data",newval,this.phaseData,this.phase_cur_rx2)
			},
			phase_cur_rx2:function(newval){
				console.log("后发生改变",newval)
				this.phase_data.Later = newval;
				console.log(this.phase_data)
				this.$emit("get-number-data",this.phase_cur_rx1,this.phaseData,newval)
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.phase-box{
		width: 348px;
		display: flex;
		// justify-content: center;
		font-size: 8px;
		.phase-box-text{
			width: 42px;
			height: 22px;
			font-size: 14px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			text-align: center;
			color: #333333;
			line-height: 22px;
			padding-left: 5px;
			padding-right: 5px;
			padding-top: 5px;
			// padding-top: 8px;
		}
		padding-right: 0px;
		// padding-bottom: 16px;
	}
</style>
