//Page Object
const url = "http://100.11.83.72:8080/library";
Page({
  data: {
    collect:{
      "bookcar_name":'',
      "bookcar_user":'',
      "oanum":'',
    },//收藏add
   keyWord: 
    {"book_name":'',//书名
    "isbn":'',
    "username":'',//姓名
     "oanum": '',//oa
    },
    borrowInfo:{
    "oa_id":'',//oanum
    "book_id":'',
    },
    userInfo: { "oanum": null,//oa
    "username": null,//用户账号
    "password": null,//用户密码
  },
   bookInfo:{},//图书详细信息,封面、书名、作者、分类、库存、简介等
   canBorrow:false,//能否借书
   borrowText:'借书',//按钮值
  },
  onLoad:function(options){
    var that = this;
    that.data.keyWord.isbn = options;
   // console.log("options:", that.data.keyWord.isbn.isbn)
//书籍详情接口，向后台传入书籍编号，获取图书详细信息
    wx.request({
      url: url+"/wxadmin/wxBookInfo",
      data : that.data.keyWord.isbn,
      header : {'content-type':'application/json'},// 默认值
      success(res){
      
         that.setData({
           bookInfo: res.data.bookInfo,
         });
         that.setData({"keyWord.book_name" : res.data.bookInfo.book_name});

        if(res.data.bookInfo.status == 1){
          that.setData({canBorrow:true,
            borrowText:'库存不足！'});
    
        }
      }
    })
},
//借书接口。传入书籍编号，在后台书库存减一
borrowBook: function(e){
  var that = this;
  wx.getStorage({
    key: 'userInput',
      success (res) {
      that.setData({"userInfo" : res.data});
      that.setData({
        "userInfo.username":that.data.userInfo.username,
        "userInfo.oanum": that.data.userInfo.oanum,
        "userInfo.password": that.data.userInfo.password,
      });
      that.setData({
        "borrowInfo.oa_id":that.data.userInfo.oanum,
        "borrowInfo.book_id":that.data.keyWord.isbn.isbn
      });
      wx.showModal({
        title: '提示',
        content: '确定借书？',
        success: function(res) {
        if (res.confirm) {
          wx.request({
            url: url+"/wxadmin/wxborrowBook",
            data : that.data.borrowInfo,
            header : {'content-type':'application/json'},// 默认值
            success(res){
              if(res.data.wxborrowBook == 1){
     
              wx.showToast({
                title: '借书成功！',
                icon: "success",
                duration: 1000
              });
              setTimeout(function () {
              wx.navigateBack({
                delta: 0,
              })
            },2000)}

            else if(res.data.wxborrowBook == 0){
              wx.showToast({
                title: '借书失败！',
                icon: "none",
                duration: 1000
              })
            }
          },
          fail(res){
            wx.showToast({
              title: '借书失败！',
              icon: "none",
              duration: 1000
            });
            setTimeout(function () {
              wx.navigateBack({
                delta: 0,
              })
            },2000)}
        })
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
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
  })
  },
  //收藏接口.传入用户id和图书id，
  saveBook:function(){
  var that = this;
  wx.getStorage({
    key: 'userInput',
      success (res) {
      that.setData({"userInfo" : res.data});
      that.setData({
        "userInfo.username":that.data.userInfo.username,
        "userInfo.oanum": that.data.userInfo.oanum,
        "userInfo.password": that.data.userInfo.password
      });
      wx.showModal({
        title: '提示',
        content: '确定收藏？',
        success: function(res) {
        if (res.confirm) {
          that.data.collect.bookcar_name=that.data.keyWord.book_name,
          that.data.collect.bookcar_user=that.data.userInfo.username,
          that.data.collect.oanum=that.data.userInfo.oanum,

          wx.request({
            url: url+"/wxadmin/wxBookInfoCollect",
            data : that.data.collect,
            header : {'content-type':'application/json'},// 默认值
            success(res){
          
              if(res.status = "success"){
              wx.showToast({
                title: '收藏成功！',
                icon: "success",
                duration: 1000
              })
            }
            else if(res.status = "error"){
              wx.showToast({
                title: '收藏失败！',
                icon: "none",
                duration: 1000
              })
            }
          }
        })
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
        })
    },
    fail(res){
      //判断用户的名字，oa账号和密码是否为空
      if(that.data.userInfo.name == null || that.data.userInfo.name == ''
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
  }
  })
}
});
