// pages/main.js
import engine from '../../api/engine.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    letter: [],
    scale: 4,
    data:''
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    engine.POST({
      params:{word:'子'},
      path:'http://service.wx.prguanjia.com/edu/character',
      onSuccess:(res)=>{
        console.log(res.data.data);
        if(!res.data.result){
          this.data.data= res.data.data;
          this.drawLetter();
        }
      },
      onFail:(err)=>{
      }
    })














    
  },
  drawLetter(){
    this.data.letter = JSON.parse(this.data.data.content);
    this.setData(this.data);
    var arr = this.data.letter.chinese.bishun;

    this.drawOutline(wx.createCanvasContext('stage'));

    var context = wx.createCanvasContext('stage');
    context.setStrokeStyle("#000000");
    context.setFillStyle('#000000');
    var self = this;
    var count = 0;
    var timer = setInterval(function () {
      if (count < arr.length) {
        count++;
        var tmpArr = arr.slice(0, count);
        if (tmpArr && tmpArr.length > 0) {
          var childCount = 0;
          var childTimer = setInterval(function () {
            var tArr = tmpArr[tmpArr.length - 1];
            if (childCount < tArr.length / 15) {
              childCount++;
              var childArr = tArr.slice(0, childCount * 15);
              self.drawOneStroke(context, childArr);
              context.draw(true);
            } else {
              clearInterval(childTimer);
              childCount = 0;
            }

          }, 40);
        }
      } else {
        clearInterval(timer);
        count = 0;
      }
    }, 1000);

  },
  drawOneStroke(context, childArr) {
    if (!childArr || !childArr.length) {
      return;
    }
    var scale = this.data.scale;

    context.moveTo(childArr[0][0] / scale, childArr[0][1] / scale);
    context.stroke();
    for (var i = 0; i <= childArr.length - 1; i++) {
      context.lineTo(childArr[i][0] / scale, childArr[i][1] / scale);
    }
    context.stroke();
  },

  drawOutline(context) {
    var arr = this.data.letter.chinese.bihua;
    context.setStrokeStyle("#999999");
    context.setFillStyle('#999999');
    var self = this;

    arr.forEach(function (item, index) {
      self.drawOneStroke(context, item);

      // item.forEach(function(childItem,index){
      //   console.log(childItem);
      // });
    });
    context.stroke();
    context.draw(true);

    // var count = 0;
    // var timer = setInterval(function () {
    //   if (count < arr.length) {
    //     count++;
    //     var tmpArr = arr.slice(0, count);
    //     if (tmpArr && tmpArr.length > 0) {
    //       var childCount = 0;
    //       var childTimer = setInterval(function () {
    //         // for (var i = 0; i < tmpArr.length; i++) {
    //         //   if (i < tmpArr.length - 1) {
    //         //     self.drawOneStroke(context, tmpArr[i]);
    //         //   }
    //         // }
    //         var tArr = tmpArr[tmpArr.length - 1];
    //         if (childCount < tArr.length / 15) {
    //           childCount++;
    //           var childArr = tArr.slice(0, childCount * 15);
    //           self.drawOneStroke(context, childArr);
    //         } else {
    //           // self.drawOneStroke(context, tArr);
    //           clearInterval(childTimer);
    //           childCount = 0;
    //         }
    //         context.draw(true);

    //       },0);
    //     }
    //   } else {
    //     clearInterval(timer);
    //     count = 0;
    //   }
    // },0);



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