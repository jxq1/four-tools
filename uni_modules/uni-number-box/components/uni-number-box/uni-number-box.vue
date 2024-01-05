<template>
	<view class="uni-numbox">
		<view @click="_calcValue('minus')" class="uni-numbox__minus uni-cursor-point">
			<text class="iconfont icon-jianhao uni-numbox--text" :class="{ 'uni-numbox--disabled': inputValue <= min || disabled }"></text>
		</view>
		<view class="uni-number_zj">
			<input type="text" disabled v-model="zhif" class="uni-numbox_pro">
			<input :disabled="disabled" @focus="_onFocus" @blur="_onBlur" class="uni-numbox__value" type="number" v-model="inputValue"/>
			<view class="uni-numbox_r">
				<view class="uni-numbox_ds">°</view>
				
			</view>
			<!-- <input type="text" disabled placeholder="o" class="uni-numbox_r"> -->
		</view>
		<view @click="_calcValue('plus')" class="uni-numbox__plus uni-cursor-point">
			<text class="iconfont icon-jiahao1 uni-numbox--text" :class="{ 'uni-numbox--disabled': inputValue >= max || disabled }"></text>
		</view>
	</view>
</template>
<script>
	/**
	 * NumberBox 数字输入框
	 * @description 带加减按钮的数字输入框
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=31
	 * @property {Number} value 输入框当前值
	 * @property {Number} min 最小值
	 * @property {Number} max 最大值
	 * @property {Number} step 每次点击改变的间隔大小
	 * @property {Boolean} disabled = [true|false] 是否为禁用状态
	 * @event {Function} change 输入框值改变时触发的事件，参数为输入框当前的 value
	 */

	export default {
		name: "UniNumberBox",
		emits:['change','input','update:modelValue','blur','focus'],
		props: {
			value: {
				type: [Number, String],
				default: 1
			},
			modelValue:{
				type: [Number, String],
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			},
			// mode:{
			// 	// type:Number,
			// 	default:0
			// },
			inputZhif:{
				type:String,
				default:''
			}
			
		},
		data() {
			return {
				inputValue:0,
				zhif:''
			};
		},
		watch: {
			value(val) {
				this.inputValue = +val;
			},
			modelValue(val){
				this.inputValue = +val;
			}
			,
			inputValue(val){
				// console.log('number框发生了改变')
				// // 向父元素传递当前值和状态
				// this.$emit("get-number",val,this.inputZhif)
				this._getDecimalScale()
			}
		},
		created() {
			if(this.value === 1){
				this.inputValue = +this.modelValue;
			}
			if(this.modelValue === 1){
				this.inputValue = +this.value;
			}
			this.zhif = this.inputZhif
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					return;
				}
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let step = this.step * scale;
				if (type === "minus") {
					value -= step;
					if (value < (this.min * scale)) {
						return;
					}
					if (value > (this.max * scale)) {
						value = this.max * scale
					}
				}

				if (type === "plus") {
					value += step;
					if (value > (this.max * scale)) {
						return;
					}
					if (value < (this.min * scale)) {
						value = this.min * scale
					}
				}

				this.inputValue = (value / scale).toFixed(String(scale).length - 1);
				// let input = document.querySelectAll('.uni-numbox__value')
				// input.style.width = (input.style.width+1)*15+'px'
				this.$emit("change", +this.inputValue);
				// TODO vue2 兼容
				this.$emit("input", +this.inputValue);
				// TODO vue3 兼容
				this.$emit("update:modelValue", +this.inputValue);
			},
			_getDecimalScale() {

				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, String(this.step).split(".")[1].length);
				}
				return scale;
			},
			_onBlur(event) {
				this.$emit('blur', event)
				let value = event.detail.value;
				if (!value) {
					// this.inputValue = 0;
					return;
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min;
				}
				const scale = this._getDecimalScale();
				this.inputValue = value.toFixed(String(scale).length - 1);
				// let input = document.querySelectAll('.uni-numbox__value')
				// input.style.width = (input.style.width+1)*15+'px'
				this.$emit("change", +this.inputValue);
				this.$emit("input", +this.inputValue);
			},
			_onFocus(event) {
				this.$emit('focus', event)
			}
		}
	};
</script>
<style lang="scss" scoped>
	$box-height: 32px;
	$boxl-height: 32px;
	$boxl-width: 32px;
	/* #ifdef APP-NVUE */
	$box-line-height: 32px;
	/* #endif */
	$box-line-height: 26px;
	$box-width: 32px;

	.uni-numbox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		height: $box-height;
		line-height: $box-height;
		width: 136px;
		align-items: center;
		// justify-content: space-between;
	}

	.uni-cursor-point {
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		// border-radius:50%;
		font-size: 12px;
		// border-style: solid;
		// border-color: #000000;
	}
	
	.uni-number_zj{
		display: flex;
		width: 72px;
		border-width: 1rpx;
		// font-family:"Times New Roman";
		.uni-numbox_pro{
			background-color: $uni-bg-color;
			width: 15px;
			height: $box-height;
			text-align: center;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 22px;
			border-width: 1rpx;
			border-style: solid;
			border-color: $uni-border-color;
			// border-width: 0;
			// border-left-width: 0;
			border-right-width: 0;
			padding-left: 6px;
		}
		.uni-numbox__value {
			background-color: $uni-bg-color;
			// width: 35px;
			flex:1;
			height: $box-height;
			// text-align: center;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 22px;
			border-width: 1rpx;
			border-style: solid;
			border-color: $uni-border-color;
			border-left-width: 0;
			border-right-width: 0;
			// border-width: 0;
		}
		.uni-numbox_r{
			background-color: $uni-bg-color;
			width: 10px;
			// flex:1;
			height: $box-height;
			text-align: left;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 22px;
			border-style: solid;
			border-color: $uni-border-color;
			border-width: 1rpx;
			position: relative;
			border-left-width: 0;
			// border-right-width: 0;
			.uni-numbox_ds{
				width: 3px;
				height: 3px;
				// border-radius:50%;
				// font-size: 12px;
				border-style: solid;
				border-color: #000000;
				border-width: 0px;
				position: absolute;
				top: -1px;
				left: 1px;
			}
			padding-right: 6px;
		}
	}


	.uni-numbox__minus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: $boxl-width;
		height: $box-height;
		// line-height: $box-line-height;
		// text-align: center;
		font-size: 15px;
		color: $uni-text-color;
		background-color: $uni-bg-color-grey;
		border-width: 1rpx;
		border-style: solid;
		border-color: $uni-border-color;
		border-top-left-radius: $uni-border-radius-base;
		border-bottom-left-radius: $uni-border-radius-base;
		border-right-width: 0;
	}

	.uni-numbox__plus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: $boxl-width;
		height: $box-height;
		border-width: 1rpx;
		border-style: solid;
		border-color: $uni-border-color;
		border-top-right-radius: $uni-border-radius-base;
		border-bottom-right-radius: $uni-border-radius-base;
		background-color: $uni-bg-color-grey;
		border-left-width: 0;
	}

	.uni-numbox--text {
		font-size: 15px;
		color: $uni-text-color;
	}

	.uni-numbox--disabled {
		color: $uni-text-color-disable;
		/* #ifdef H5 */
		cursor: not-allowed;
		/* #endif */
	}
</style>
