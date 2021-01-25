// pages/save/save.js
const url = "http://100.11.83.72:8080/library";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklist:[],//书籍信息

    "isbn":'',//书编号
    "book_name":null,//书名
    save:"../image/save.png",
  },
  //书籍详情

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(r){
    var that = this;
    wx.getStorage({
      key: 'userInput',
        success (res) {
  
        that.setData({"userInfo" : res.data});
        that.setData({
          "userInfo.oanum":that.data.userInfo.oanum,
          "userInfo.username": that.data.userInfo.username,
          "userInfo.password": that.data.userInfo.password
        });
    
        //判断用户的名字，oa账号和密码是否为空
        if(that.data.userInfo.oanum == null || that.data.userInfo.oanum == ''
        ||that.data.userInfo.username == null || that.data.userInfo.username == '' 
        ||that.data.userInfo.password == null || that.data.userInfo.password == '' ){
          wx.showToast({
            title: '请先登录！',
            icon: 'none',
            duration: 2000,
            success:function(){
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }, 2000) //延迟2s
            }
          })
      }
    else
    wx.request({//接口，根据用户的姓名，oa账号和密码展示用户已经收藏的图书
      url: url+"/wxadmin/wxBookCollect",
      data : that.data.userInfo,
      header : {'content-type':'application/json'},// 默认值
      success(res){
        that.setData({
          booklist: res.data.booklist
        });
       
        /*wx.switchTab({//跳转到初始页面
          url: "pages/sys/sys"
        })*/
    }
  })
}
})},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },
  bookInfo:function(r){
    wx.navigateTo({//跳转到详情页面
      url: "/pages/bookinfo/bookinfo?bookId="+this.data.bookId,
    })
  }
})