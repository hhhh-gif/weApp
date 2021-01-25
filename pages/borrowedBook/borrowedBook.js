//Page Object
const url = "http://100.11.83.72:8080/library";
Page({
  data: {
  bookList:[],
  userInfo: {},
  ids:{oa_id:null,
  book_id:null},
keyWord: 
  {
  },
  oa_id:{oa_id:null},//oa_id
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
          "oa_id.oa_id": that.data.userInfo.oanum
        });
       
        wx.request({//接口，根据用户的姓名，oa账号和密码获取已经借阅的书籍
          url: url+"/wxadmin/wxborrowedBook",
          data :that.data.oa_id,
          header : {'content-type':'application/json'},// 默认值
          success: function(res){
            
            that.setData({ bookList : res.data.wxborrowedBook})
        }
      })
    },
      fail(res){
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
    }
  })},
//还书
returnBook: function(data){
  var index = data.currentTarget.id;//item 下标索引

  var that = this;
  wx.getStorage({
    key: 'userInput',
    success (r) {
      that.setData({keyWord:r.data})
      wx.showModal({
        title: '提示',
        content: '确定归还？',
        success: function(res) {
        that.setData({
          "ids.oa_id":that.data.keyWord.oanum,
          "ids.book_id":that.data.bookList[index].isbn
        });
        if (res.confirm) {
          wx.request({//接口，根据用户的信息，对用户借阅的书籍归还
            url: url+"/wxadmin/wxreturnBook",
            data : that.data.ids,
            header : {'content-type':'application/json'},// 默认值
            success(res){
    
              wx.showToast({
                title: '归还成功！',
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 0,
                })
              }, 2000) //延迟2s
            
          }
        })
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
        })
    }
  })
}
});
