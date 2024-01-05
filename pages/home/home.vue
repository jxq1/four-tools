<template>
	<view >
		<view class="home" @click="toMain">
			<video :style="{width:wid+'px',height:hig+'px'}" class="home-video" autoplay muted id="myVideo" src="../../static/小工具动画2.mp4"
			@error="videoErrorCallback" 
			enable-danmu danmu-btn controls show-center-play-btn="true"
			:controls="false" @ended=toMain
			:duration='6'
			object-fit="fill"></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wid:document.body.clientWidth,
				hig:document.body.clientHeight
			}
		},
		created() {
			uni.onWindowResize((res) => {
				this.wid = res.size.windowWidth; //变化后的窗口宽度
				this.hig = res.size.windowHeight; //变化后的窗口高度
			})
		},
		methods: {
			toMain(){
				console.log("点击了")
				uni.redirectTo({
				    url: '/pages/index/index',
					success: function(res) {
					    console.log("成功")
					},
					fail: function(res) {
					    console.log("失败")
					}
				});
				uni.offWindowResize(() => {
				    console.log('取消监听窗口尺寸变化事件')
				})
			}
		}
	}
</script>

<style>
.home{
	width: 100%;
	height: 100%;
	background: #007AFF;
}
.home-video{
	width: 1000px;
	height: 1000px;
}
video::-webkit-media-controls {
    display:none !important;
}
</style>
