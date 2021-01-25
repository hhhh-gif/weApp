//Page Object
const url = "http://100.11.83.72:8080/library";
Page({data: {
  booklist:[{ 
    "isbn":'',//书编号
    "book_name":'',
    "author":'',
    "genre":'',
    "bookSurplus":null,
    "bookFace":null}],//书籍信息
search:{}
},

  onLoad:function(r){
    var that=this;
    wx.request({
      url: url+"/wxadmin/wxshowBook",
    
     // data : r,
      header : {'content-type':'application/json'},// 默认值
      success: function (res) {

        that.setData({
          booklist: res.data.booklist
        });
        wx.switchTab({//跳转到初始页面
          url: "../../pages/sys/sys"
        })
    }
  })
},

  // 查询搜索的接口方法
  getBooks: function (r) {
    var that=this;

    wx.request({
      url: url+"/wxadmin/wxSearchBook",
      data : that.data.search,
      header : {'content-type':'application/json'},// 默认值
      success:function (res){
  
        that.setData({
          booklist: res.data.booklist
          })
      }
    })
  },
  //获取输入框的值
  getInputValue:function(e){
    this.data.search.book_name = e.detail.value;
  },

   //书籍详情
  bookInfo:function(r){
    var that = this;
    wx.navigateTo({//跳转到详情页面
      url: "/pages/bookinfo/bookinfo?isbn="+that.data.booklist[r.currentTarget.id].isbn,
    })
  },
//显示刷新
onShow:function(){
  var that=this;
  wx.request({
    url: url+"/wxadmin/wxshowBook",
  
   // data : r,
    header : {'content-type':'application/json'},// 默认值
    success: function (res) {
  
      that.setData({
        booklist: res.data.booklist
      });
      wx.switchTab({//跳转到初始页面
        url: "../../pages/sys/sys"
      })
  }
})
}
});
