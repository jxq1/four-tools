<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
	  font-family: "iconfont"; /* Project id 2991643 */
	  src: url('~@/static/font/iconfont.woff2?t=1638780674075') format('woff2'),
	       url('~@/static/font/iconfont.woff?t=1638780674075') format('woff'),
	       url('~@/static/font/iconfont.ttf?t=1638780674075') format('truetype');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-duigou:before {
	  content: "\ebe6";
	}
	
	.icon-fuxuankuangxuanzhong:before {
	  content: "\e652";
	}
	
	.icon-jiahao1:before {
	  content: "\e727";
	}
	
	.icon-jianhao:before {
	  content: "\e729";
	}
	

	/*checkbox选中后样式  */
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
		background:#002F93;
		border-color:#002F93;
		border: 2px solid #002F93 !important;
		position: relative;
		z-index: 1;
	}
	
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked::before{
		/* width: 100%;
		height: 100%; */
		position: absolute;
		/* left: 50%;
		top: 50%; */
		/* color: #fff; */
		top: 1px;
		left: 7px;
		height: 12px;
		width: 6px;
		border-right-width: 2px;
		border-right-color: #fff;
		border-right-style: solid;
		border-bottom-width:2px ;
		border-bottom-color: #fff;
		border-bottom-style: solid;
		opacity: 1;
		transform-origin: center;
		transform: rotate(45deg);
		
		background-color: #002F93;
		/* font-size: 14px;
		text-align: center;
		line-height: 20rpx; */
		/* content: "\ebe6"; */
		content: " ";
		/* padding-right: 0; */
		/* transform: translate(-50%, -50%) scale(1); 
		-webkit-transform: translate(-50%, -50%) scale(1);
		transform-origin: center; */
	}
	uni-checkbox .uni-checkbox-input:hover{
		border:2px solid #002F93 !important;
		outline:none;
	}
	uni-button{
		padding-left: 0;
		padding-right: 0;
	}
	uni-checkbox .uni-checkbox-input{
		border:2px solid #999999 !important ;
	}
	
	/* uni-page-body{
		height: 100% !important;
	} */
	/* .uni-picker-view-wrapper{
		width: 100%;
		display: flex !important;
		justify-content: space-around !important;
	} */
	/*width对垂直流动条有效*/
	/*height对水平流动条有效*/
	/* ::-webkit-scrollbar {
	        width: 4px; 
	        height: 4px;
	} */
	 /*定义滚动条的轨道颜色、内阴影及圆角*/
	/* ::-webkit-scrollbar-track{
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	    background-color: rosybrown;
	    border-radius: 3px;
	} */
	   /**定义滑块颜色、内阴影及圆角*/
	/* ::-webkit-scrollbar-thumb{
	   border-radius: 7px;
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	    background-color: #E8E8E8;
		height: 10px !important;
		width: 10px !important;
	} */
	/*定义两端按钮的样式*/
	/* ::-webkit-scrollbar-button { background-color:#E8E8E8;} */
	/*定义右下角汇合处的样式*/
	/* ::-webkit-scrollbar-corner { background:khaki;} */
	
</style>
