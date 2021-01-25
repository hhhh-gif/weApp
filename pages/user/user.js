// getCurrentPage是获取当前页面的实例对象。
const app = getApp()
Page({

  data: {
    borrowed: 0,//已借书数量
    returned: 0,//已还书数量
    username:"未登录",
    userInfo: {},
    userimg:"../../image/skd.jpg",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    /*arrow:"../../image/0106arrow3x.png",*/

    // 1.菜单栏数据
    items: [
      {
        icon:'',//图标
        text: '登录',
        url:"/pages/login/login"
      },
      {
        icon:'',//图标
        text: '收藏图书',
        url:"/pages/save/save"
      },
      {
        icon:'',//图标
        text: '联系我们',
        url:"/pages/contact/contact"
      }
    ],
  },
  gotopage: function (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.hi
    })
  },
  //已借阅图书
  goBorrowed:function(){
    wx.navigateTo({
      url:'/pages/borrowedBook/borrowedBook',
   
    })
  },
  //已归还图书
  goReturned:function(){
    wx.navigateTo({
      url:"/pages/returnedBook/returnedBook"
    })
  },

  onLoad:function(options) {
    var that = this;
    if(that.data.userInfo.avatarUrl == null || that.data.userInfo.avatarUrl == '' 
    ||  that.data.userInfo.nickName == null ||  that.data.userInfo.nickName == '')
    {
      wx.navigateTo({
        url:"/pages/auth/auth"
      })
  }
    /**
     * 获取用户信息
     */
    else
    {
      wx.getStorage({
      key: 'userInfo',
      success (res) {
        that.setData({"userInfo" : res.data});
        that.setData({
          "userInfo.avatarUrl":that.data.userInfo.avatarUrl,
          "userInfo.nickName": that.data.userInfo.nickName,
        });
      },
      })
    }
},
//返回刷新
onShow(){
 // this.onLoad();
 var that = this;
  wx.getStorage({
    key: 'userInfo',
    success (res) {
      that.setData({"userInfo" : res.data});
      that.setData({
        "userInfo.avatarUrl":that.data.userInfo.avatarUrl,
        "userInfo.nickName": that.data.userInfo.nickName,
      });
    },
    })
},
  //事件处理函数
  bindViewTap: function () {
    var that = this;
    wx.openSetting({
      success: function (res) { // 这里重新调用代码，比如这里的重新显示头像昵称
        res.authSetting = {
          "scope.userInfo": true,
        }
      },
    })
  }
})