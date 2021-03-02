$(function () {
	var layer = layui.layer;
	getUserInfo()
	$('#btnLogout').on('click', function () {
		layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
			//do something
			localStorage.removeItem('token');
			location.href = '/login.html'
			layer.close(index);
		});
	})
})

// 获取用户的基本信息
function getUserInfo() {
	$.ajax({
		method: 'get',
		url: '/my/userinfo',
		headers: {
			Authorization: localStorage.getItem('token') || ''

		},
		success: function (res) {
			console.log(res);
			if (res.status !== 0) {
				return layui.layer.msg('获取用户信息失败');
			}
			renderAvatar(res.data)

		}

	})
}
function renderAvatar(user) {
	// 渲染用户名字
	var name = user.nickname || user.username
	console.log(name);
	$('.welcome').html('欢迎&nbsp;&nbsp;' + name)
	// 渲染用户头像
	if (user.user_pic !== null) {
		$('.layui-nav-img').attr('src', user.user_pic).show();
		$('.text-avatar').hide();
	} else {
		$('.lay-nav-img').hide();
		var first = name[0].toUpperCase();
		$('.text-avatar').html(first).show();
	}
}
