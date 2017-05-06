# 概述
由于工作需要，使用cropit，于是基于cropit封装一套极简设置既可以使用的package工具

# 文档

1. 引入js：
<script src="jquery.min.js"></script>
<script src="jquery.cropit.js"></script>
<script src="jquery.cropit.package.js"></script>

2. 设置存放div
<div id="image-box"></div>

3. 设置cropit
<script type="text/javascript">
// 按需求配置options
options = {
	backImgUrl: 背景图 
	backColor: 背景颜色
	borderWidth: 边框宽度
	borderColor: 边框颜色
	borderRadius: 边框圆角
	width: 图片切为宽度
	height: 图片切为高度
	selectNotice: 选择按钮文字 
	reselectNotice: 重选文字
	uploadNotice: 上传按钮文章
	uploadUrl: 上传到后台url
	success: 上传成功function
	error: 失败function
	beforeSend: 上传之前function
	complete: 完成function
	dataKeyName: 图片base64编码上传的参数名
}

$('#id').initCropit(options);
</script>

# 后台配件
源码见：[cropit后台接收工具](https://github.com/Strangeen/cropit_back_end_component)