<template>
	<!-- #ifdef H5 -->
	<td class="uni-table-td" :rowspan="rowspan" :colspan="colspan" :class="{'table--border':border}" 
	:style="{width:width + 'px','text-align':align,'vertical-align':verticalAlign,'border-right':borderRight,left:left+'px',background:background,'z-index':zindex,position:position,'box-shadow':boxShadow}">
		
		<slot></slot>
	</td>
	<!-- 'word-WRAP':'break-word', -->
	<!-- #endif -->
	<!-- #ifndef H5 -->
	<!-- :class="{'table--border':border}"  -->
	<view class="uni-table-td" :class="{'table--border':border}" :style="{width:width + 'px','text-align':align}">
		<slot></slot>
	</view>
	<!-- #endif -->
	
</template>

<script>
	/**
	 * Td 单元格
	 * @description 表格中的标准单元格组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=3270
	 * @property {Number} 	align = [left|center|right]	单元格对齐方式
	 */
	export default {
		name: 'uniTd',
		options: {
			virtualHost: true
		},
		props: {
			width: {
				type: [String, Number],
				default: ''
			},
			align: {
				type: String,
				default: 'left'
			},
			rowspan: {
				type: [Number,String],
				default: 1
			},
			colspan: {
					type: [Number,String],
				default: 1
			},
			borderRight:{
				type:String,
				default:""
			},
			// 左边固定多少
			left:{
				type:[String, Number],
				default:''
			},
			background: {
				type:String,
				default:""
			},
			zindex:{
				type:[String, Number],
				default:''
			},
			position:{
				type:String,
				default:""
			},
			boxShadow:{
				type:String,
				default:""
			},
			verticalAlign:{
				type:String,
				default:"middle"
			}
		},
		data() {
			return {
				border: false
			};
		},
		created() {
			this.root = this.getTable()
			this.border = this.root.border
		},
		methods: {
			/**
			 * 获取父元素实例
			 */
			getTable() {
				let parent = this.$parent;
				let parentName = parent.$options.name;
				while (parentName !== 'uniTable') {
					parent = parent.$parent;
					if (!parent) return false;
					parentName = parent.$options.name;
				}
				return parent;
			},
		}
	}
</script>

<style lang="scss">
	$border-color:#EBEEF5;

	.uni-table-td {
		display: table-cell;
		padding: 8px 10px;
		font-size: 14px;
		border-bottom: 1px $border-color solid;
		font-weight: 400;
		color: #606266;
		line-height: 22px;
		box-sizing: border-box;
		// word-WRAP:break-word;
		
	}
	// .uni-table-td:first-child{
	// 	position:sticky;
	// 	left:0; /* 首行永远固定在左侧 */
	// 	z-index:1;
	// 	background: #FFFFFF;
	// 	// background-color:lightpink;
	// }
	.table--border {
		border-right: 1px $border-color solid;
	}
</style>
