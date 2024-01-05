<template>
	<view class="uni-date">
		<view class="uni-date-editor" @click="open">
			<slot>
				<view class="uni-date-editor--x" :class="{'uni-date-editor--x__disabled': disabled,
		'uni-date-x--border': border}">
					<view class="uni-date-x uni-date-single">
						<view class="uni-date__icon-logo">
							<image class="uni-date-editor--logo" src="./Shape.png" mode=""></image>
						</view>
						<input class="uni-date__x-input" type="text" v-model="datestring"
							:placeholder="placeholder" :disabled="true" />
					</view>
					<view v-show="clearIcon && !disabled && datestring"
						class="uni-date__icon-clear" @click.stop="clear">
						<uni-icons type="clear" color="#e1e1e1" size="14"></uni-icons>
					</view>
				</view>
			</slot>
		</view>
		<view class="date-time-picker" v-if="visible">
			<view class="date-time-mask" @click.stop="hide"></view>
			<view class="date-time">
				<view class="date-time-container" @click.stop="handleEvent" :class="{slideInUp: visible}">
					
					<picker-view class="picker-view" :indicator-style="indicatorStyleString" :value="dateTime" @change="dateTimePickerChange">
						<picker-view-column data-id='year' v-if='isShowYear' class="picker-view-column">
							<view class="item item_year" :class="[dateTime[0]==index ? 'select-item':'']" v-for="(item,index) in years" :key="index">{{item}}年</view>
						</picker-view-column>
						<picker-view-column data-id='month' v-if='isShowMonth'>
							<view class="item" :class="[dateTime[1]==index ? 'select-item item_month':'']" v-for="(item,index) in months" :key="index">{{item}}月</view>
						</picker-view-column>
						<picker-view-column data-id='day' v-if='isShowDay'>
							<view class="item item_day" :class="[dateTime[2]==index ? 'select-item':'']" v-for="(item,index) in days" :key="index">{{item}}日</view>
						</picker-view-column>
						<picker-view-column data-id='hour' v-if='isShowHour'>
							<view class="item item_hour" :class="[dateTime[3]==index ? 'select-item':'']" v-for="(item,index) in hours" :key="index">{{item}}时</view>
						</picker-view-column>
						<picker-view-column data-id='minute' v-if='isShowMinute'>
							<view class="item item_minute" :class="[dateTime[4]==index ? 'select-item':'']" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
						</picker-view-column>
						<picker-view-column data-id='second' v-if='isShowSecond' class="picker-view-column">
							<view class="item item_second" :class="[dateTime[5]==index ? 'select-item':'']" v-for="(item,index) in seconds" :key="index">{{item}}秒</view>
						</picker-view-column>
					</picker-view>
					
					<view class="time-picker-tool" v-if='isShowToolBar'>
						<view :class="[confirmButtonClass]" @click.stop="confirm">
							{{confirmButtonText}}
						</view>
						<view :class="[cancelButtonClass]" @click.stop="cancel">
							{{cancelButtonText}}
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
	
</template>

<script>
	import {
		getOneMonthDays,
		getTimeArray,
		addZero,
		getIndexOfArray
	} from './uitls/util.js'
	export default {
		name: 'jcDateTimePicker',
		props: {
			startYear: {
				type: Number,
				default: 1900
			},
			endYear: {
				type: Number,
				default: new Date().getFullYear()
			},
			isShowToolBar: {
				type: Boolean,
				default: true
			},
			cancelButtonText: {
				type: String,
				default: '取消'
			},
			cancelButtonClass: {
				type: String,
				default: 'cancel-btn'
			},
			toolBarTitle: {
				type: String,
				default: ''
			},
			toolBarTitleClass: {
				type: String,
				default: 'tool-title'
			},
			confirmButtonText: {
				type: String,
				default: '确定'
			},
			confirmButtonClass: {
				type: String,
				default: 'confirm-btn'
			},
			// 时间数据
			datestring: {
				type: String,
				default: ''
			},
			type: {
				/**
				 * date 年月日
				 * year-month 年月
				 * year 年
				 * datetime 年月日 时分
				 * datetime-all 年月日 时分秒
				 * time 时分秒
				 * hour-minute 时分
				 */
				type: String,
				default: 'date'
			},
			// 设置选择器中间选中框的样式
			indicatorStyle: {
				type: Object,
				default: null
			},
			border: {
				type: [Boolean],
				default: true
			},
			disabled: {
				type: [Boolean],
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			clearIcon: {
				type: [Boolean],
				default: true
			},
			value: {
				type: [String, Number, Array, Date],
				default: ''
			}
		},
		data() {
			return {
				visible: false,
				dateTime: [],
				days: [],
				indicatorStyleString: '',
				singleVal: ''
			}
		},
		watch: {
			indicatorStyle(val){
				this.getIndicatorStyle();
			},
			type() {
				this.initDateTime()
			},
			datestring(){
				this.initDateTime()
			},
			value(newval){
				this.singleVal = newval;
			}
		},
		computed: {
			years() {
				return this.initTimeData(this.endYear, this.startYear);
			},
			isShowYear() {
				return this.type !== 'time' && this.type !== 'hour-minute';
			},
			months() {
				return this.initTimeData(12, 1);
			},
			isShowMonth() {
				return this.type !== 'year' && this.type !== 'time' && this.type !== 'hour-minute';
			},
			isShowDay() {
				return this.type === 'date' || this.type === 'datetime' || this.type === 'datetime-all';
			},
			hours() {
				return this.initTimeData(23, 0);
			},
			isShowHour() {
				return this.type !== 'date' && this.type !== 'year-month' && this.type !== 'year';
			},
			minutes() {
				return this.initTimeData(59, 0);
			},
			isShowMinute() {
				return this.type !== 'date' && this.type !== 'year-month' && this.type !== 'year';
			},
			seconds() {
				return this.initTimeData(59, 0);
			},
			isShowSecond() {
				return this.type === 'datetime-all' || this.type === 'time';
			}
		},
		methods: {
			getIndicatorStyle(){
				if(this.indicatorStyle){
					for(let key in this.indicatorStyle){
						this.indicatorStyleString += `${key}:${this.indicatorStyle[key]};`
					}
				}
			},
			handleEvent() {
				return;
			},
			cancel() {
				this.hide();
			},
			confirm() {
				this.formatDate();
				this.hide();
			},
			open() {
				this.visible = true;
			},
			hide() {
				this.visible = false;
			},
			initDateTime() {
				let value;
				if (this.datestring.length > 0) {
					if (this.type === 'year') {
						value = new Date(this.datestring, 0);
					} else if (this.type === 'time' || this.type === 'hour-minute') {
						let date = new Date();
						let ary = this.datestring.split(':');
						ary.forEach((item, index) => {
							if (index == 0) {
								date.setHours(item)
							} else if (index == 1) {
								date.setMinutes(item)
							} else if (index == 2) {
								date.setSeconds(item)
							}
						})
						value = date;
					} else {
						value = new Date(this.datestring.replace(/-/g, '/'));
					}

				} else {
					value = new Date();
				}
				let len, timeArray, index;
				let array = getTimeArray(value);
				let [year, month, day, hour, minute, second] = array;
				this.days = this.initTimeData(getOneMonthDays(year, month-1), 1);
				let names = ['year', 'month', 'day', 'hour', 'minute', 'second'];
				switch (this.type) {
					case "date":
						len = 3;
						break;
					case "year-month":
						len = 2;
						break;
					case "year":
						len = 1;
						break;
					case "datetime":
						len = 5;
						break;
					case "datetime-all":
						len = 6;
						break;
					case "time":
						len = 3;
						break;
					case "hour-minute":
						len = 2;
						break;
				}
				timeArray = new Array(len).fill(0);
				if (this.type === 'time' || this.type === 'hour-minute') {
					names = names.slice(3);
					array = array.slice(3);
				}
				timeArray = timeArray.map((item, index) => {
					const name = names[index];
					return getIndexOfArray(array[index], this[name + 's'])
				})
				this.dateTime = timeArray;
				// console.log("索引",timeArray)
			},
			initTimeData(end, start) {
				let timeArray = [];
				while (start <= end) {
					timeArray.push(start);
					start++;
				}
				return timeArray;
			},
			formatDate() {
				let names = ['year', 'month', 'day', 'hour', 'minute', 'second'];
				let dateString, formatDateArray = [];
				if (this.type === 'date' || this.type === 'year-month' || this.type === 'year') {
					formatDateArray = this.dateTime.map((item, index) => {
						return this[names[index] + 's'][item] < 10 ? addZero(this[names[index] + 's'][item]) : this[names[index] + 's'][item];
					})
					dateString = formatDateArray.join('-');
				} else if (this.type === 'time' || this.type === 'hour-minute') {
					names = names.splice(3);
					formatDateArray = this.dateTime.map((item, index) => {
						return this[names[index] + 's'][item] < 10 ? addZero(this[names[index] + 's'][item]) : this[names[index] + 's'][item];
					})
					dateString = formatDateArray.join(':');
				} else {
					let name1 = names.splice(0, 3);
					formatDateArray = this.dateTime.map((item, index) => {
						if (index > 2) {
							return this[names[index - 3] + 's'][item] < 10 ? addZero(this[names[index - 3] + 's'][item]) : this[names[index - 3] + 's'][item];
						} else {
							return this[name1[index] + 's'][item] < 10 ? addZero(this[name1[index] + 's'][item]) : this[name1[index] + 's'][item];
						}
					})
					dateString = formatDateArray.splice(0, 3).join('-') + ' ' + formatDateArray.join(':');
				}
				this.singleVal = dateString;
				this.$emit('change', dateString)
			},
			dateTimePickerChange(e) {
				// console.log(e)
				let columns = e.target.value;
				// console.log("datetime",this.dateTime)
				// console.log("columns"+columns)
				// this.currentColumn = e.target.value;
				if (this.type === 'date' || this.type === 'datetime' || this.type === 'datetime-all') {
					this.dateTime.splice(0, 1, columns[0]);
					if (columns[0] != this.dateTime[0]) {
						this.days = this.initTimeData(getOneMonthDays(this.years[this.dateTime[0]], this.months[this.dateTime[1]]), 1);
						if (this.dateTime[1] == 1) {
							if (this.dateTime[2] === this.days.length - 1) {
								if (getOneMonthDays(this.years[columns[0]], this.dateTime[1]) < getOneMonthDays(this.years[this.dateTime[0]],this.dateTime[1])) {
									this.dateTime.splice(2, 1, this.days.length - 1)
								}
							}
						}
					} else {
						this.dateTime.splice(1, 1, columns[1]);
						this.days = this.initTimeData(getOneMonthDays(this.years[this.dateTime[0]], this.dateTime[1]), 1);
						if (columns[1] != this.dateTime[1]) {
							if (this.dateTime[1] == 1) {
								if (this.dateTime[2] === this.days.length - 1) {
									if (getOneMonthDays(this.years[columns[0]], this.dateTime[1]) < getOneMonthDays(this.years[this.dateTime[0]],
											this.dateTime[1])) {
										this.dateTime.splice(2, 1, this.days.length - 1)
									}
								}
							} else {
								if (this.dateTime[2] > this.days.length - 1) {
									this.dateTime.splice(2, 1, this.days.length - 1)
								} else {
									this.dateTime.splice(2, 1, columns[2])
								}
							}
						} else {
							this.dateTime.splice(2, 1, columns[2])
						}
					}
					if (columns.length > 2) {
						columns.splice(3).forEach((column, index) => {
							this.dateTime.splice(index + 3, 1, column);
						})
					}
				} else {
					columns.forEach((column, index) => {
						this.dateTime.splice(index, 1, column);
					})
				}
				if (!this.isShowToolBar) {
					this.formatDate();
				}
				// console.log('datetime2'+this.dateTime)
			},
			clear(needEmit = true) {
				
				this.singleVal = ''
				this.$emit('change', '')
			}
		},
		mounted() {
			this.getIndicatorStyle();
			this.initDateTime();
		}
	}
</script>

<style lang='scss' scoped>
	.uni-date-x {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* justify-content: center; */
		justify-content: space-between;
		padding: 0 10px;
		border-radius: 4px;
		background-color: #fff;
		color: #666;
		font-size: 14px;
		height: 32px;
	}
	
	.uni-date-editor--x:hover{
		border:1px solid #002F93 !important;
		outline:none;
	}
	.uni-date-x--border {
		box-sizing: border-box;
		border-radius: 4px;
		border: 1px solid #dddddd;
	}
	
	.uni-date-editor--x {
		position: relative;
	}
	
	.uni-date-editor--x .uni-date__icon-clear {
		position: absolute;
		top: 0;
		right: 0;
		display: inline-block;
		box-sizing: border-box;
		border: 6px solid transparent;
		margin-right: 6px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}
	
	.uni-date__x-input {
		padding: 0 8px;
		height: 40px;
		width: 100%;
		/* line-height: 40px; */
		line-height: 32px;
		font-size: 14px;
	}
	.uni-date-editor--x__disabled {
		opacity: 0.4;
		cursor: default;
	}
	.uni-date__icon-logo{
		/* padding: 0 8px; */
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
	.uni-date-editor--logo {
		/* position: absolute;
		top: 8px;
		right: 0;
		left: 0;
		bottom: 0; */
		width: 16px;
		height: 16px;
		text-align: center;
		margin-top:-5px ;
		vertical-align: middle;
	}
	.date-time-picker {
		
		.date-time-mask {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba($color: #000000, $alpha: .3);
			z-index: 998;
		}
		.date-time{
			position: relative;
		}
		.date-time-container {
			position: absolute;
			width: 459px;
			height: 296px;
			box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.12);
			border-radius: 6px;
			top: 5px;
			/* bottom: 100; */
			right: 0;
			left: -100px;
			background-color: #fff;
			z-index: 1000;
			display: flex;
			flex-direction: column;
			/* border-top-left-radius: 16rpx;
			border-top-right-radius: 16rpx; */

			.time-picker-tool {
				height: 100rpx;
				display: flex;
				align-items: center;
				font-size: 16px;
				box-sizing: border-box;
				border-bottom: 1rpx solid #E9E9E9;
				border-radius: 6px;
				.cancel-btn {
					width: 50%;
					height: 100%;
					top: 50%;
					text-align: center;
					line-height: 50px;
					box-sizing: border-box;
					color: #333;
					background: #FAFBFD;
					border-bottom-right-radius: 6px;
				}
				.confirm-btn {
					box-sizing: border-box;
					width: 50%;
					height: 100%;
					text-align: center;
					line-height: 50px;			
					background: #F0F3F9;
					border-bottom-left-radius: 6px;
					color: #002F93;
				}
			}

			.picker-view {
				width: 100%;
				flex: 1;
				.picker-view-column{
					border-radius: 6px;
				}
				.item {
					width: 48px;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					line-height: 40px;
					margin-left: 15px;
				}
				
				.select-item{
					width: 56px;	
					color: #002F93;
					font-size: 16px;
					/* line-height: 40px; */
					/* border-top:2px solid #99ACD4;
					border-bottom:2px solid #99ACD4; */
					z-index:0;
				}
			}
		}
		.slideInUp {
			animation: slideInUp 0.5s ease-in-out;
		}
	}
	.cancel-btn:hover,
	.confirm-btn:hover
	{
		background: #E5EAF4 !important;
		color: #002F93 !important;
	}
</style>
