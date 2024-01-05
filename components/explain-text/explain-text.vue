<template>
	<view class="explain-text">
		<view class="ziduan-title">
			字段说明:
		</view>
		<view class="ziduan-content">
			<text>
				1.计算点、运算相位、前容许度、目标星体、后容许度、起始时间、终止时间根据设置可得；
				2.目标星体前出=计算点+（左减右加）相位度数-前容许度
				3.目标星体后至=计算点+（左减右加）相位度数+后容许度
				4.前出时间为目标星体位于前出度数的时间，后至时间为目标星体位于后至度数的时间（星体逆行排序：前顺、后顺；前逆、后顺；前顺、后逆；前逆、后逆）
				5.太阳所起星座及黄道度数根据前出时间计算可得，精确到秒；太阳所至星座及黄道度数根据后至时间计算可得，精确到秒
			</text>
		</view>
		<view class="sort-title">
			计算结果排序:
		</view>
		<view class="sort-content">
			<text>
				1.根据星体
				2.同一星体内根据相位
				3.同一相位内根据目标星体顺逆
				4.若经过了星体多个周期，按照日期先后排序
			</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.explain-text{
		width: 100%;
		// height: 350px;
		// background: #FFFFFF;
		border-radius: 8px;
		padding-top: 16px;
		// margin: 8px;
		padding-left: 24px;
	}
	.ziduan-title{
		width: 90px;
		// height: 25px;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 25px;
		padding-bottom: 6px;
	}
	.ziduan-content{
		width: 1013px;
		// height: 168px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28px;
		padding-bottom: 24px;
	}
	.sort-title{
		width: 126px;
		// height: 25px;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 25px;
		padding-bottom: 6px;
	}
	.sort-content{
		width: 296px;
		// height: 140px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28px;
	}
</style>
