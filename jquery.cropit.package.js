// jquery.cropit.package.js
// 基于cropit封装，协议MIT
// https://www.juwends.com
// options = {
//		backImgUrl: 背景图 
//		backColor: 背景颜色
//		borderWidth: 边框宽度
//		borderColor: 边框颜色
//		borderRadius: 边框圆角
//		width: 图片切为宽度
//		height: 图片切为高度
//		selectNotice: 选择按钮文字 
//		reselectNotice: 重选文字
//		uploadNotice: 上传按钮文章
//		uploadUrl: 上传到后台url
//		success: 上传成功function
//		error: 失败function
//		beforeSend: 上传之前function
//		complete: 完成function
//		dataKeyName: 图片base64编码上传的参数名
// }
// 使用方法：$('#id').initCropit(options);

;(function($) {
	var cropitModel = function($imgEditor ,options){

		this.id = new Date().getTime();

		var doUpload = function(data) {
			
			// 自定义data的key值，即后台获取的parameterName
			var dataKeyName = "imgData";
			if (options.dataKeyName) dataKeyName = options.dataKeyName;
			var ajaxData = {};
			ajaxData[dataKeyName] = data;
			
			$.ajax({
				url: options.uploadUrl,
				type: 'post',
				dataType: 'text',
				data: ajaxData,
				success: options.success,
				error: options.error,
				beforeSend: options.beforeSend,
				complete: options.complete
			});
		};

		// 整理options
		if (!options || !options.backImgUrl) {options.backImgUrl = ''};
		if (!options || !options.backColor) {options.backColor = '#f8f8f8'};
		if (!options || !options.borderWidth) {options.borderWidth = 1};
		if (!options || !options.borderColor) {options.borderColor = '#ccc'};
		if (!options || !options.borderRadius) {options.borderRadius = 0};
		if (!options || !options.width) {options.width = 250};
		if (!options || !options.height) {options.height = 250};
		if (!options || !options.selectNotice) {options.selectNotice = '选择图片'};
		if (!options || !options.reselectNotice) {options.reselectNotice = '重新选择'};
		if (!options || !options.uploadNotice) {options.uploadNotice = '上传'};
		if (!options || !options.uploadUrl) {options.uploadUrl = '/'};
		if (!options || !options.success) {options.success = function(res){}};
		if (!options || !options.error) {options.error = function(){}};
		if (!options || !options.beforeSend) {
			options.beforeSend = function(){
				// 上传时禁用选图和上传按钮
				$('#select-img-btn-' + that.id).prop('disabled', true);
				$('#export-btn-' + that.id).prop('disabled', true);
			};
		} else {
			var beforeSend = options.beforeSend;
			options.beforeSend = function(){
				// 上传时禁用选图和上传按钮
				$('#select-img-btn-' + that.id).prop('disabled', true);
				$('#export-btn-' + that.id).prop('disabled', true);
				beforeSend();
			};
		}
		if (!options || !options.complete) {
			options.complete = function(){
				// 完成时恢复选图和上传按钮
				$('#select-img-btn-' + that.id).prop('disabled', false);
				$('#export-btn-' + that.id).prop('disabled', false);
			}
		} else {
			var complete = options.complete;
			options.complete = function(){
				// 完成时恢复选图和上传按钮
				$('#select-img-btn-' + that.id).prop('disabled', false);
				$('#export-btn-' + that.id).prop('disabled', false);
				complete();
			}
		}

		// 页面dom
		var minBtnWidth = 160;
		var dom = [
			// styles
			'<style>',
			'.cropit-preview {background:url("'+ options.backImgUrl +'") '+ options.backColor +' no-repeat;background-size:cover;border:'+ options.borderWidth +'px solid ' + options.borderColor + ';border-radius:'+ options.borderRadius +'px;width: '+ options.width +'px;height:'+ options.height +'px;}',
			'.cropit-preview-image-container {border-radius:'+ (options.borderRadius - 2) +'px;}',
			'.cropit-image-zoom-input {width:'+ options.width +'px;margin:10px 0;}',
			'.cropit-preview-image-container {cursor: move;}',
			'.export-btn, .select-img-btn {width:'+ (options.width < minBtnWidth ? options.width : (options.width - 10) / 2) +'px;height: 28px;}',
			'.export-btn {' + (options.width < minBtnWidth ? 'margin-top:5px;' : 'float: right;') + '}',
			//'.image-editor {width: '+ (options.width + options.borderWidth * 2) +'px;text-align:left;}',
		    '</style>',
		    // show box ,zoom box and file input
		    '<div class="cropit-preview"></div>',
			'<input type="range" class="cropit-image-zoom-input">',
			'<input type="file" id="cropit-image-input-'+ this.id +'" class="cropit-image-input" style="display:none"/>',
			// buttons
			'<div><button id="select-img-btn-'+ this.id +'" class="select-img-btn">'+ options.selectNotice +'</button><button id="export-btn-'+ this.id +'" class="export-btn" disabled>'+ options.uploadNotice +'</button></div>'
		].join('');

		// 页面dom放入页面，并启动cropit
		$imgEditor.css({'width': (options.width + options.borderWidth * 2) +'px','text-align':'left'})
					.html(dom).cropit();

		// 为dom绑定事件
		var that = this;

		// 选择图片后变成重选字样
		$imgEditor.on('change', '#cropit-image-input-' + this.id, function(){
			$('#select-img-btn-' + that.id).text(options.reselectNotice);
			// 开启上传按钮
			if ($('#export-btn-' + that.id).prop('disabled') == true && $(this).val()) 
				$('#export-btn-' + that.id).prop('disabled', false);
		});

		// 选择/重选图片
		$imgEditor.on('click', '#select-img-btn-' + this.id, function(){
			$('#cropit-image-input-' + that.id).click();
		});
		
		// 上传
		$imgEditor.on('click', '#export-btn-' + that.id, function(){
			doUpload($imgEditor.cropit('export'));
		});
	};
	
	$.fn.extend({
		initCropit: function(options){
			return new cropitModel(this, options);
		}
	});
})(jQuery);