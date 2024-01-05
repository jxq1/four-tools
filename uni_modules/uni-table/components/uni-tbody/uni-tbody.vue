<template>
	<!-- #ifdef H5 -->
	<tbody>
		<slot></slot>
	</tbody>
	<!-- #endif -->
	<!-- #ifndef H5 -->
	<view><slot></slot></view>
	<!-- #endif -->
</template>

<script>
export default {
	name: 'uniBody',
	options: {
		virtualHost: true
	},
	data() {
		return {
			
		}
	},
	created() {
		this.root = this.getTable()
		console.log("tr长度",this.root.trChildren)
		let trlength = this.root.trChildren.length;
		let tbodyName = document.getElementsByTagName("tbody")[0];
		console.log(tbodyName)
		// console.log("高度",tbodyName.style.height)
		if(trlength==1){
			// tbodyName.style.height = "0px";
		}
	},
	methods: {
		/**
		 * 获取父元素实例
		 */
		getTable(name = 'uniTable') {
			let parent = this.$parent
			let parentName = parent.$options.name
			while (parentName !== name) {
				parent = parent.$parent
				if (!parent) return false
				parentName = parent.$options.name
			}
			return parent
		}
	}
}
</script>

<style lang="scss">
	// 设置滚动条
	tbody{
		display:block;
		// height:300px;
		// height: 100%;
		// width: 100%;
		// overflow-y:auto;
		// overflow-x:auto;
	}
	tbody::-webkit-scrollbar{
		width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
		z-index: 999;
		// scrollbar-arrow-color:red;
	}
	tbody::-webkit-scrollbar-thumb {
		height: 6px;
		max-height: 10px;
		max-width: 10px;
		min-height: 5px;
		min-width: 5px;
	    border-radius: 10px;
	    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		 // -webkit-box-shadow: inset 0 0 5px #E5EAF4;
	    // background: rgba(0,0,0,0.2);
		background: #E5EAF4;
		z-index: 999;
	}
	tbody::-webkit-scrollbar-track {
	    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		-webkit-box-shadow: inset 0 0 5px #E5EAF4;
	    border-radius: 0;
	    // background: rgba(0,0,0,0.1);
		background:#FFFFFF;
	}
</style>
