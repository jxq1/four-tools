<template>
	<view class="content">
		<view class="content-header">
			<view>四大反推工具</view>
		</view>
		<view class="content-main">
			<view :class="[isCollapse ? 'nav-collapse':'nav']" class="nav-position">
				<view class="nav_item" >
					<view class="nav-item-one" v-for="(item,index) in tagList" :key = item.id @click="navClick(index)" >
						<view class="nav_item_content" :tip="item.name" :class="[!isCollapse ? 'nav-no-zhedie':'nav-zhedie']">
							<image :src="item.IconPath" v-if="selectedIcon[index]== false" mode="" class="nav_item_icon"></image>
							<image :src="item.selectedIconPath" v-if="selectedIcon[index]== true" mode="" class="nav_item_icon"></image>
							<view v-show="!isCollapse" :class="[selectedIcon[index] ? 'nav_item_text_true':'nav_item_text_false']" >
								{{item.name}}
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<!-- <view class="content-main-right" :style="{width:rightWidth+'px' }"> -->
			<view class="content-main-right">
				<back-tools v-if="selectedIcon[0]== true"></back-tools>
				<moon-chain v-if="selectedIcon[1]== true"></moon-chain>
				<ecliptic-place v-if="selectedIcon[2]== true"></ecliptic-place>
				<phase-start v-if="selectedIcon[3]== true"></phase-start>
			</view>
		</view>
		<view :class="[isCollapse ? 'collapse-content':'no-collapse-content']" @click="Collapse()">
			<image v-if="!isCollapse" src="../../static/折叠.png" mode="" class="collapse-img"></image>
			<image v-if="isCollapse" src="../../static/打开折叠.png" mode="" class="collapse-img"></image>
			<view v-show="!isCollapse" class="collapse-text">
				<text>折叠</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {tagList} from '../../utils/const.js'
	import backTools from "../../components/back-tools/back-tools.vue"
	import moonChain from "../../components/moon-chain/moon-chain.vue"
	import eclipticPlace from "../../components/ecliptic-place/ecliptic-place.vue"
	import phaseStart from "../../components/phase-start/phase-start.vue"
	export default {
		data() {
			return {
				title: 'Hello',
				tagList,
				selectedIcon:[true,false,false,false],
				isCollapse:false,
				rightWidth:1833.6,
			}
		},
		components:{
			backTools,
			moonChain,
			eclipticPlace,
			phaseStart
		},
		onLoad() {

		},
		created() {
			
		},
		methods: {
			navClick(index){
				this.selectedIcon = [false,false,false,false]
				this.selectedIcon[index] = !this.selectedIcon[index];
				console.log(this.selectedIcon)
				// location.reload();
			},
			// 点击折叠后需处理的函数
			Collapse(){
				console.log("点击折叠了")
				this.isCollapse = !this.isCollapse
				var winWidth = document.body.clientWidth || document.documentElement.clientWidth;
				console.log("浏览器宽度",winWidth);
				if(this.isCollapse){
					// 折叠了，右边的宽度也要变，
					this.rightWidth = 1969.6;
				}else{
					this.rightWidth = 1833.6;
				}
			}
		}
	}
</script>

<style lang="scss">
	html,
	body {
	  height: 100%;
	  margin: 0;
	}
	uni-page-body{
		height: 100%;
		margin: 0;
	}
	.content{
		height: 100%;
		display: flex;
		flex-direction: column;
		.content-header{
			flex-grow:0;
			flex-shrink:0;
			width: 100%;
			height: 48px;
			background: #002F93;
			position: relative;
			view{
				position: absolute;
				top: 14px;
				left: 16px;
				width: 192px;
				height: 22px;
				font-size: 16px;
				font-family: PingFangHK-Medium, PingFangHK;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 22px;
			}
		}
		.content-main{
			flex: 1;
			display: flex;
			// height: 100%;
			// overflow-x: auto;
			background:#F2F4F9;
			justify-content: space-between;
			// .nav-position{
			// 	position: relative;
			// 	// width: 192px;
			// }
			.nav{
				flex-grow:0;
				flex-shrink:0;
				width: 192px;
				// height: 1080px;
				background: #FFFFFF;
				padding-top: 3px;
			}
			.nav-collapse{
				width: 56px;
				background: #FFFFFF;
				padding-top: 3px;
			}
			// .nav_item{
			// 	// width: 192px;
			// 	position: absolute;
			// }
			.nav_item_content{
				display: flex;
				// justify-content: space-between;
				// padding-bottom: 23px;
				padding-top: 11.5px;
				padding-bottom: 11.5px;
				padding-left: 19px;
				// width: 100px;
				.nav_item_icon{
					width: 22px;
					height: 22px;
					padding-right: 10px;
					// background: #666666;
				}
				.nav_item_text_true{
					width: 72px;
					height: 25px;
					font-size: 18px;
					font-family: PingFangHK-Medium, PingFangHK;
					font-weight: 500;
					color: #002F93;
					line-height: 25px;
				}
				.nav_item_text_false{
					width: 72px;
					height: 25px;
					font-size: 18px;
					font-family: PingFangSC;
					color: #666666;
					line-height: 25px;
				}
			}
			.nav-item-one{
				position: relative;
			}
			.nav_item_content:hover{
				background: #F0F3F9;
			}
			// 折叠后悬浮后的样式
			.nav-zhedie:hover:after{
			position: absolute;
			left: 50px;
			top: 5px;
			width: 80px;
			height: 28px;
			background: #333333;
			box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
			border-radius: 5px;
			padding: 10px 15px;
			font-size: 14px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 22px;
			text-align: center;
			/*这里显示的内容为表格中自定义的labelTooltip属性对应的值*/
			content: attr(tip);
			z-index: 2;
			}
			.nav-zhedie:hover:before {
			  content: '';
			  width: 0;
			  height: 0;
			  border: 6px solid transparent;
			  border-right-color: #333333;
			
			  position: absolute;
			  left: 38px;
			  top: 20px;
			  // left: calc(50% + 25px);
			  opacity: 1;
			  transition: all 0.5s;
			}
	
			
			.content-main-right{
				width: 0;
				// height: 100%;
				flex: 1;
				flex-grow:1;
				flex-shrink:1;
			}
		}
		.no-collapse-content{
			position: fixed;
			width: 72px;
			height: 24px;
			background: #002F93;
			border-radius: 12px;
			bottom: 36px;
			left: 16px;
			display: flex;
			.collapse-img{
				width: 16px;
				height: 16px;
				padding-left: 12px;
				padding-right: 2px;
				padding-top: 4px;
			}
			.collapse-text{
				width: 28px;
				height: 20px;
				font-size: 14px;
				font-family: PingFangSC;
				color: #FFFFFF;
				line-height: 20px;
				padding-top: 2px;
			}
		}
		.collapse-content{
			width: 24px;
			height: 24px;
			background: #002F93;
			border-radius: 12px;
			position: fixed;
			left: 16px;
			bottom: 36px;
			.collapse-img{
				width: 16px;
				height: 16px;
				padding-left: 4px;
				padding-top: 4px;
			}
		}
		
	}
	
</style>
