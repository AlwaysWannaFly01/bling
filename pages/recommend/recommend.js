// pages/recommend/recommend.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: '需求反馈',
        scale: 15
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options);
        this.setData(
            {
                id: options.id,
                demand_type: options.type
            },
            () => {
                this.recommendData();
            }
        );
    },
    recommendData() {
        console.log(123);
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000
        });
        wx.request({
            url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/blingDemandRecommendList',
            data: {
                uid: wx.getStorageSync('uid'),
                demand: this.data.id,
                demand_type: this.data.demand_type
            },
            method: 'get',
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                console.log(res);
                if (parseInt(res.data.code) == 1) {
                    const recommendList = res.data.data.recommendList;
                    let arrlist = [];
                    if (recommendList.length > 10) {
                        arrlist = recommendList.slice(0, 10);
                    } else {
                        arrlist = recommendList;
                    }
                    this.setData({
                        recommend: res.data.data,
                        recommendList: arrlist,
                        position_x: res.data.data.position_x,
                        position_y: res.data.data.position_y,
                        markers: [
                            {
                                id: '1',
                                iconPath: '../../image/lat.png',
                                longitude: res.data.data.position_x,
                                latitude: res.data.data.position_y,
                                width: 16,
                                height: 32
                            }
                        ],
                        circles: [
                            {
                                latitude: res.data.data.position_y,
                                longitude: res.data.data.position_x,
                                color: '#ff912e90',
                                fillColor: '#ffbc7490',
                                radius: 500,
                                strokeWidth: 1
                            }
                        ]
                    });
                } else {
                    wx.showToast({
                        title: '网络不佳，请检查网络',
                        icon: 'error',
                        duration: 1000
                    });
                }
            }
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
