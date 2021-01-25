//Page Object
const url = "http://100.11.83.72:8080/library";
Page({
  data: {
    bookList:[],
  userInfo: {},
  wxreturnedBook:{},
  oa_id:{oa_id:null}
  },
  onLoad:function(r){
    var that = this;
    wx.getStorage({
      key: 'userInput',
        success (res) {
        that.setData({"userInfo" : res.data});
        that.setData({
          "userInfo.username":that.data.userInfo.username,
          "userInfo.oanum": that.data.userInfo.oanum,
          "userInfo.password": that.data.userInfo.password,
          "oa_id.oa_id":that.data.userInfo.oanum
        });
    
        //判断用户的名字，oa账号和密码是否为空
        if(that.data.userInfo.username == null || that.data.userInfo.username == ''
        ||that.data.userInfo.oanum == null || that.data.userInfo.oanum == '' 
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
    wx.request({//接口，根据用户的姓名，oa账号和密码展示用户已经归还的图书
      url: url+"/wxadmin/wxreturnedBook",
      data : that.data.oa_id,
      header : {'content-type':'application/json'},// 默认值
      success(res){

        that.setData({
          bookList:res.data.wxreturnedBook
        });
    }
  })
}
})},

});
