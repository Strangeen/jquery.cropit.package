# ����
���ڹ�����Ҫ��ʹ��cropit�����ǻ���cropit��װһ�׼������üȿ���ʹ�õ�package����

# �ĵ�

1. ����js��
<script src="jquery.min.js"></script>
<script src="jquery.cropit.js"></script>
<script src="jquery.cropit.package.js"></script>

2. ���ô��div
<div id="image-box"></div>

3. ����cropit
<script type="text/javascript">
// ����������options
options = {
	backImgUrl: ����ͼ 
	backColor: ������ɫ
	borderWidth: �߿���
	borderColor: �߿���ɫ
	borderRadius: �߿�Բ��
	width: ͼƬ��Ϊ���
	height: ͼƬ��Ϊ�߶�
	selectNotice: ѡ��ť���� 
	reselectNotice: ��ѡ����
	uploadNotice: �ϴ���ť����
	uploadUrl: �ϴ�����̨url
	success: �ϴ��ɹ�function
	error: ʧ��function
	beforeSend: �ϴ�֮ǰfunction
	complete: ���function
	dataKeyName: ͼƬbase64�����ϴ��Ĳ�����
}

$('#id').initCropit(options);
</script>

# ��̨���
Դ�����[cropit��̨���չ���](https://github.com/Strangeen/cropit_back_end_component)