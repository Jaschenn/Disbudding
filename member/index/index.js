
var Bmob = require('../../utils/bmob.js');
var that;

Page({
	onLoad: function () {
		that = this;
		that.setData({
			user: Bmob.User.current(),
      isAdmin: wx.getStorageSync('isAdmin'),
		});
    
	},
	logout: function () {
		// 确认退出登录
		wx.showModal({
			title: '确定退出登录',
			success: function (res) {
				if (res.confirm) {
					// 退出操作
					Bmob.User.logOut();
					that.setData({
						user: Bmob.User.current()
					});
				}
			}
		});
	},
  beseller: function () {
    //成为卖家

    wx.navigateTo({
      url: '../beseller/beseller',
    })

  }
}) 