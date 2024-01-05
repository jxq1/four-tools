<template>
	<view class="explain-text">
		<view class="ziduan-title">
			字段说明:
		</view>
		<view class="ziduan-content">
			<text>
				1.上升点、起始时间、终止时间、相位容许度设置、星体1根据设置可得；
				2.星体1/2前出时间、前出落座根据星历表、相位容许度设置计算，前出落宫根据其前出落座、上升点和宫位系统计算，前出元素根据前出落座计算；\n精准时间、精准落座根据相位表、相位容许度设置查表可得，精准落宫根据其精准落座、上升点和宫位系统计算，精准元素根据精准落座计算；\n后至时间、后至落座根据星历表、相位容许度设置计算，后至落宫根据其后至落座、上升点和宫位系统计算，后至元素根据后至落座计算（ps：（1）相位表里的行星含日、月、水、金、火、木、土、天、海、冥、凯龙、北交点，相位不含72°；相位表里没有的行星和相位类型，精准相位不能查表可得，需要通过星历表计算（2）涉及到上升点的，根据设置的上升点度数计算）
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
		height: 25px;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 25px;
		padding-bottom: 6px;
	}
	.ziduan-content{
		width: 1013px;
		// height: 140px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28px;
		padding-bottom: 24px;
	}
	.sort-title{
		width: 126px;
		height: 25px;
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
