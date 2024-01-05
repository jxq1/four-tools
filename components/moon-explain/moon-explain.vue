<template>
	<view class="explain-text">
		<view class="ziduan-title">
			字段说明:
		</view>
		<view class="ziduan-content">
			<text>
				1.起始时间、终止时间、上升点、相位容许度设置根据设置可得；
				2.入座X为12星座之一
				3.入座时间为月亮进入X星座0度的时间，精确到秒
				4.主宰星1查表可得（2类同）
				5.天象相位1为入座时间时，主宰星与其他行星的相位（2类同，此时只计算十大星体的相位），若有多个数据则换行展示
				6.主宰星1落座为入座时间时，主宰星落座，精确到秒；主宰星1落宫为入座时间时，主宰星1落宫情况，根据上升点、主宰星1落座和宫制计算（2类同）
				7.月相为入座时间时，月相（月相类型：新月、上弦月、满月、下弦月、日食（环食、偏食、全食）、月食（偏食、半影月食、全食））的时间、类型、星座
			</text>
		</view>
		<view class="sort-title">
			计算结果排序:
		</view>
		<view class="sort-content">
			<text>
				1.根据入座的星座排序（从白羊到双鱼）
				2.同一星座内根据相位
				3.若经过了星体多个周期，按照日期先后排序
			</text>
		</view>
		<view class="dominate-title">
			主宰星设置：
		</view>
		<view class="dominate-content">
			<uni-table border stripe>
				<uni-tr>
					<uni-th align="left" width="96"></uni-th>
					<uni-th align="left">月亮入白羊座</uni-th>
					<uni-th align="left">月亮入金牛座</uni-th>
					<uni-th align="left">月亮入双子座</uni-th>
					<uni-th align="left">月亮入巨蟹座</uni-th>
					<uni-th align="left">月亮入狮子座</uni-th>
					<uni-th align="left">月亮入处女座</uni-th>
					<uni-th align="left">月亮入天秤座</uni-th>
					<uni-th align="left">月亮入天蝎座</uni-th>
					<uni-th align="left">月亮入射手座</uni-th>
					<uni-th align="left">月亮入摩羯座</uni-th>
					<uni-th align="left">月亮入水瓶座</uni-th>
					<uni-th align="left">月亮入双鱼座</uni-th>
				</uni-tr>
				<uni-tr>
					<uni-td width="96">主宰星1</uni-td>
					<uni-td>火</uni-td>
					<uni-td>金</uni-td>
					<uni-td>水</uni-td>
					<uni-td>\</uni-td>
					<uni-td>太</uni-td>
					<uni-td>水</uni-td>
					<uni-td>金</uni-td>
					<uni-td>火</uni-td>
					<uni-td>木</uni-td>
					<uni-td>土</uni-td>
					<uni-td>土</uni-td>
					<uni-td>木</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td width="96">主宰星2</uni-td>
					<uni-td>\</uni-td>
					<uni-td>\</uni-td>
					<uni-td>\</uni-td>
					<uni-td>天</uni-td>
					<uni-td>\</uni-td>
					<uni-td>\</uni-td>
					<uni-td>\</uni-td>
					<uni-td>冥</uni-td>
					<uni-td>\</uni-td>
					<uni-td>\</uni-td>
					<uni-td>天</uni-td>
					<uni-td>海</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.explain-text{
		width: 100%;
		// height: 641px;
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
		// height: 196px;
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
		// height: 84px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28px;
		padding-bottom: 24px;
	}
	.dominate-title{
		width: 108px;
		height: 25px;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 25px;
		margin-bottom: 6px;
	}
	.dominate-content{
		padding-bottom: 72px;
	}
</style>
