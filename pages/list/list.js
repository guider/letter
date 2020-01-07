const app = getApp();
import engine from '../../api/engine.js'
const util = require('../../utils/util');
let that;
Page({
    data: {
        list: app.globalData.list,
        topinfo: {
            ListName: '唐诗三百首',
            pic_album: 'http://fdfs.xmcdn.com/group31/M02/10/1E/wKgJSVlun6jgnxXWAANbaJnn_40681_web_large.jpg'
        },
        songlist: []
    },
    onLoad(options) {
        console.log(this)
        engine.GET({
            params: {},
            path: 'https://api.prguanjia.com/edu/requiredReading',
            onSuccess: (res) => {
                console.log(res)
                if (!res.data.result) {
                    // this.data.list = res.data.data;
                    // this.setData(this.data)
                }
            },
            onFail: (err) => {
            }
        })
    },

    /* 列表颜色 */
    dealColor(rgb) {
        if (!rgb) {
            return;
        };
        let r = (rgb & 0x00ff0000) >> 16,
            g = (rgb & 0x0000ff00) >> 8,
            b = (rgb & 0x000000ff);
        return `rgb(${r},${g},${b})`;
    },


    /* 列表点击 */
    playsongTap: function (ev) {
        // app.setGlobalData({ songData: ev.currentTarget.dataset.data, songLists: that.data.songlist }); // 改变全局数据
        var item = ev.currentTarget.dataset.data;
        var index = ev.currentTarget.dataset.index;
        wx.navigateTo({
            url: '../player/player?data='+JSON.stringify(item)+'&index='+index
        });
    }
});