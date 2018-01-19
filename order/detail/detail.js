// detail.js

var Bmob = require('../../utils/bmob.js');
var that;

Page({
	data: {
		isAdmin: wx.getStorageSync('isAdmin')
	},
	onLoad: function (options) {
		that = this;
    var sellerId = options.sellerId;
    that.loadSeller(sellerId);
		that.loadOrder(options.objectId);
		// that.setData({
		// 	objectId: options.objectId
		// });
	},
  loadSeller: function (sellerId) {
    that = this;
    var query = new Bmob.Query('Seller');
    query.equalTo('objectId', sellerId);
    query.find().then(function (sellerObjects) {
      var seller = sellerObjects[0];
      var express_fee = seller.get("express_fee");
      that.setData({
        seller: seller,
        express_fee: express_fee
      })
    });
  },
	loadOrder: function (objectId) {
		// 加载订单详情
		var query = new Bmob.Query('Order');
		query.include('user');
		query.include('address');
		query.get(objectId).then(function (order) {
			that.setData({
				order: order
      });
		});
	},
	contact: function () {
		var telephone = that.data.seller.get('telephone');
		wx.makePhoneCall({
			phoneNumber: telephone //仅为示例，并非真实的电话号码
		})
	},
	payment: function () {
		// 支付
		getApp().payment(that.data.order);
	},
	cancel: function () {
		// 取消确认
		wx.showModal({
			title: '确定要取消订单吗？',
			success: function (res) {
				if (res.confirm) {
					// 取消订单
					var order = that.data.order;
					order.set('status', -1);
					order.save().then(function (orderSaved) {
						wx.showToast({
							title: '订单已取消',
							success: function () {
								that.setData({
									order: orderSaved
								});
							}
						});
					})
				}
			}
		});
	},
	callReceiver: function (e) {
		var telephone = e.currentTarget.dataset.telephone;
		wx.makePhoneCall({
			phoneNumber: telephone //仅为示例，并非真实的电话号码
		})
	},
	send: function () {
		// 取消确认
		wx.showModal({
			title: '确定要派送订单吗？',
			success: function (res) {
				if (res.confirm) {
					// 取消订单
					var order = that.data.order;
					order.set('status', 2);
					order.save().then(function (orderSaved) {
						wx.showToast({
							title: '订单已派送',
							success: function () {
								that.setData({
									order: orderSaved
								});
							}
						});
					})
				}
			}
		});
	},
  navi: function(){
wx.navigateTo({
  url: '../erweima/erweima',
})



  }
})