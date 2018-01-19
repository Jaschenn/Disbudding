// checkout.js
var Bmob = require('../../utils/bmob.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');

var that;

Page({
	data: {
		personCountIndex: 0,
    isAdmin: wx.getStorageSync('isAdmin'),
	},
	onLoad: function (options) {
		that = this;
		that.loadAddress();
		// 注册通知
        WxNotificationCenter.addNotification("addressSelectedNotification", that.getSelectedAddress, that);
        WxNotificationCenter.addNotification("remarkNotification", that.getRemark, that);
        // 购物车获取参数
        that.setData({
        	carts: JSON.parse(options.carts)
        });
        // 读取商家信息
        that.loadSeller(options.sellerId);
        that.setData({
        	amount: parseFloat(options.amount),
        	quantity: parseInt(options.quantity),
        	express_fee: parseInt(options.express_fee),
        	total: parseFloat(options.amount) + parseInt(options.express_fee)
        });
        that.initpersonCountArray();
	},
  loadSeller: function (sellerId) {
    that = this;
    var query = new Bmob.Query('Seller');
    query.equalTo('objectId', sellerId);
    query.find().then(function (sellerObjects) {
      var seller = sellerObjects[0];
      that.setData({
        seller: seller,
        sellerId: sellerId,
      })
    });
  },
	selectAddress: function () {
		wx.navigateTo({
			url: '../../address/list/list?isSwitchAddress=true'
		});
	},
	getSelectedAddress: function (addressId) {
		console.log(addressId);
		// 回调查询地址对象
		var query = new Bmob.Query("Address");
		query.get(addressId).then(function (address) {
			that.setData({
				address: address
			});
		});
	},
	loadAddress: function () {
		var that = this;
		var query = new Bmob.Query('Address');
		query.equalTo('user', Bmob.User.current());
		query.descending('updatedAt');
		query.limit(1);
		query.find().then(function (addressObjects) {
			// 查到用户已有收货地址
			if (addressObjects.length > 0) {
				that.setData({
					address: addressObjects[0]
				});
			}
		});
	},
	initpersonCountArray: function () {
		// 初始化用户数
		var personCountArray = [];
		var length = 10;
		for (var i = 1; i <= length; i++) {
			personCountArray.push(i + '人');
		}
		personCountArray.push(length + '人以上');
		that.setData({
			personCountArray: personCountArray
		});
	},
	getRemark: function (remark) {
		console.log(remark)
		that.setData({
			remark: remark
		});
	},
	naviToRemark: function () {
		wx.navigateTo({
			url: '../remark/remark?remark=' + (that.data.remark || '')
		});	
	},
	bindPickerChange: function(e) {
		// 监听picker事件
		this.setData({
			personCountIndex: e.detail.value
		})
	},
	payment: function () {
		// 创建订单
		var order = new Bmob.Object('Order');
		order.set('user', Bmob.User.current());
		order.set('address', that.data.address);
		order.set('express_fee', that.data.express_fee);
		order.set('title', that.data.carts[0].title);
		order.set('quantity', that.data.quantity);
		order.set('amount', that.data.amount);
		order.set('total', that.data.total);
		order.set('status', 0);
		order.set('detail', that.data.carts);
    order.set('sellerId', that.data.sellerId);
    order.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("日记创建成功, objectId:" + result.id);
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建日记失败');
      }
    });


    wx.showToast({
      title: 'SUCCESS!@',
    });
     wx.navigateBack({
       delta:2,
     });
   
		//order.save().then(
      
    //   function (orderCreated) {
		// 	// 保存成功，调用支付
		// 	getApp().payment(orderCreated);
		// }, function (res) {
		// 	console.log(res)
		// 	wx.showModal({
		// 		title: '订单创建失败',
		// 		showCancel: false
		// 	})
		// });

	}
})