var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seller:[],
    banners: [
      {
        id: 3,
        img: 'http://img0.imgtn.bdimg.com/it/u=3375642676,2786765658&fm=27&gp=0.jpg',
        url: '',
        name: '今晨'
      },
      {
        id: 1,
        img: 'https://tse1-mm.cn.bing.net/th?id=OIP.qnS3OeyDlLG-P0R1T62R3wEfDZ&w=232&h=172&c=7&o=5&dpr=1.25&pid=1.7',
        url: '',
        name: '告别午高峰'
      },
      {
        id: 2,
        img: 'http://img3.imgtn.bdimg.com/it/u=501001262,249057307&fm=27&gp=0.jpg',
        url: '',
        name: '金牌好店'
      }
    ],

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    getApp().loadAllSeller(function (seller) {
      that.setData({
        seller: seller,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})