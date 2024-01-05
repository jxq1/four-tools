<template>
	<view class="explain-text">
		<view class="ziduan-title">
			字段说明:
		</view>
		<view class="ziduan-content">
			<text>
				1.星体、起始时间、终止时间根据设置可得；
				2.起始星座度数根据起始时间计算，精确到秒；终止星座度数根据终止时间计算，精确到秒
				3.始逆时间、始逆星座度数根据星体周期表可得（始顺类同），若有多个数据则换行展示
				4.诸星相时间位置根据太阳落座表可得（星相：上合、下合、极长、入背、出背），若有多个数据则换行展示
				5.赤纬、黄纬，为起始时间的星体赤纬和黄纬数据，根据星体落座表计算可得，精确到秒
			</text>
		</view>
		<view class="sort-title">
			计算结果排序:
		</view>
		<view class="sort-content">
			<text>
				1.根据星体排序
			</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.explain-text{
		width: 100%;
		height: 100%;
		// background: #FFFFFF;
		border-radius: 8px;
		padding-top: 16px;
		// margin: 8px;
		padding-left: 24px;
	}
	.ziduan-title{
		width: 90px;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 25px;
		padding-bottom: 6px;
	}
	.ziduan-content{
		width: 1013px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28px;
		padding-bottom: 24px;
	}
	.sort-title{
		width: 126px;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 25px;
		padding-bottom: 6px;
	}
	.sort-content{
		width: 296px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28px;
	}
</style>
