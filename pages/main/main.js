// pages/main.js
import engine from '../../api/engine.js'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        letter: {
            bihua: [],
            bishun: [],
            bushou: '',
            pinyin: ''
        },
        inputVal: '',
        data: {},
        scale: 3,
        data: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.audioCtx = wx.createAudioContext('audio')
        this.loadData();
    },
    loadData() {
        engine.POST({
            params: { word: this.data.inputVal ? this.data.inputVal : '字' },
            path: 'https://api.prguanjia.com/edu/character',
            onSuccess: (res) => {
                if (!res.data.result) {
                    this.data.data = res.data.data;
                    this.data.letter = JSON.parse(this.data.data.content).chinese;
                    this.setData(this.data);
                    this.drawLetter();
                }
            },
            onFail: (err) => {
            }
        })
    },
    drawLetter() {
        this.setData(this.data);
        var arr = this.data.letter.bishun;
        var context = wx.createCanvasContext('stage');
        context.draw();
        this.drawOutline(context);
        context.setLineWidth(1.5);
        context.setStrokeStyle("#000000");
        context.setFillStyle('#000000');
        var self = this;
        var count = 0;
        clearInterval(this.timer);
        clearInterval(this.childTimer);
        this.timer = setInterval(() => {
            if (count < arr.length) {
                count++;
                var tmpArr = arr.slice(0, count);
                if (tmpArr && tmpArr.length > 0) {
                    var childCount = 0;
                    self.childTimer = setInterval(() => {
                        var tArr = tmpArr[tmpArr.length - 1];
                        if (childCount < tArr.length / 25) {
                            childCount++;
                            var childArr = tArr.slice(0, childCount * 25);
                            self.drawOneStroke(context, childArr);
                            context.draw(true);
                        } else {
                            clearInterval(self.childTimer);
                            childCount = 0;
                        }
                    }, 40);
                }
            } else {
                clearInterval(self.timer);
                clearInterval(self.childTimer);
                count = 0;
            }
        }, 1200);
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
        var arr = this.data.letter.bihua;
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

    },
    audioPlay(){
        this.audioCtx.play();
    },
    replay() {
        this.drawLetter();

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

    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value,
            inputShowed: !e.detail.value
        });
        if(this.data.inputVal){
            this.loadData();
        }
    }
})