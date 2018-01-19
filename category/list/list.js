
var Bmob = require('../../utils/bmob.js');
var that;
Page({
	onLoad: function () {
		that = this;
		// 管理员认证
    getApp().auth();
  }, 
  onShow: function () {
    var sellerId = getApp().auth();
    that.loadCategories(sellerId);
  },
  loadCategories: function (sellerId) {
    var query = new Bmob.Query('Category');
    query.equalTo('sellerId', sellerId); 
		query.ascending('priority');
		query.limit(Number.Max_VALUE);
		query.find().then(function (categories) {
			console.log(categories);
			that.setData({
				categories: categories
			});
		});
	},
	add: function () {
		// 跳转添加页面
		wx.navigateTo({
			url: '../add/add'
		});
	},
})