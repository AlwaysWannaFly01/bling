// pages/sellerback/sellerback.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: '需求反馈',
        dataNews: {},
        show1: false,
        show2: false,
        show3: true,
        recoList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            demand: options.deid,
            demand_type: options.detype
        });
        this.showData();
    },
    showData() {
        wx.request({
            url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/blingDemandRecommendList',
            data: {
                uid: wx.getStorageSync('uid'),
                demand: this.data.demand,
                demand_type: this.data.demand_type
            },
            method: 'get',
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                console.log(res);
                if (parseInt(res.data.code) == 1) {
                    this.setData({
                        dataNews: res.data.data,
                        imgUrls: res.data.data.photoList
                    });
                    if (res.data.data.recommendList.length > 0 && res.data.data.recommendList.length <= 5) {
                        this.setData({
                            recoList: res.data.data.recommendList
                        });
                    }
                    if (res.data.data.recommendList.length > 5) {
                        const arr = res.data.data.recommendList.slice(0, 5);
                        const good = res.data.data.recommendList.slice(5);
                        this.setData({
                            recoList: arr,
                            goodRecolist: good
                        });
                    }
                }
                console.log(this.data.recoList);
            }
        });
    },
    clickspread: function() {
        this.setData({
            show1: true,
            show2: true,
            show3: false
        });
    },
    clickpack: function() {
        this.setData({
            show1: false,
            show2: false,
            show3: true
        });
    },
    go() {
        wx.getSystemInfo({
            success: res => {
                this.setData({
                    systemInfo: res
                });
                if (res.platform == 'ios') {
                    wx.showModal({
                        title: '提示',
                        showCancel: false,
                        confirmText: '我知道了',
                        content: '在"App Store"里搜索比邻找房即可下载',
                        confirmColor: '#ff7859'
                    });
                } else if (res.platform == 'android') {
                    wx.navigateTo({
                        url: '/pages/webView/webView'
                    });
                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});