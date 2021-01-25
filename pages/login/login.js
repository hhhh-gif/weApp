//var app = require('../../resource/js/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputList:{},//输入框信息
  },
getName: function(e){
  this.data.inputList.username = e.detail.value;
},
getOaNum: function(e){
  this.data.inputList.oanum = e.detail.value;
},
getCode: function(e){
  this.data.inputList.password = e.detail.value;
},
//用户登录
  checkIn: function(r){
    var that = this;
    if(this.data.inputList.username == null || this.data.inputList.username == '')
      wx.showToast({
        title: '请输入用户名！',
        icon: 'none',
        duration: 1000})
      else if(this.data.inputList.oanum == null || this.data.inputList.oanum == '')
        wx.showToast({
          title: '请输入OA账号！',
          icon: 'none',
          duration: 1000})
      else if(this.data.inputList.password == null || this.data.inputList.password == '')
          wx.showToast({
            title: '请输入用户密码！',
            icon: 'none',
            duration: 1000})
    //接口：用户输入姓名，oa账号，密码传到后台。后台做验证，成功则登录
    else{

    wx.request({//登录接口，将用户的姓名，oa账号和密码传入后台做验证，后台返回status数值1表示验证通过，否则登录失败
      url: "http://100.11.83.72:8080/library/wxlogin",//请求url
      data: this.data.inputList,
      header : {'content-type':'application/json'},// 默认值
      success: function(res){//获取到后台的返回值

        if(res.data.status == "success"){//验证通过
          console.log("登录成功")
          wx.showToast({
            title: '登录成功！',
            duration: 1000,
            icon: 'success',
            mask: true,
            success:function(){
          
              wx.setStorage({
                data: that.data.inputList,
                key: 'userInput',
             }),
              setTimeout(function () {
                wx.switchTab({
                  url: "../../pages/sys/sys",
                })
              }, 2000) //延迟2s
            },
          })
        }
      else if(res.data.status !="success"){//验证失败
        console.log("登录失败")
        wx.showToast({
          title: '账号或密码错误',
          duration: 1000,
          icon: 'none',
          mask: true,
        })
      }
      }
    })
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

})