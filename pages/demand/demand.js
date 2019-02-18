// pages/demand/demand.js

const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: 'Bling房来了',
        property: {
            selectedDemand: true
        },
        flag: false,
        history: [],
        searchLoadingComplete: false, //是否全部加载完数据
        page: 1
    },
    toIndex() {
        wx.redirectTo({
            url: '/pages/index/index'
        });
    },
    my() {
        wx.redirectTo({
            url: '/pages/my/my'
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.loadData();
    },
    loadData() {
        const that = this;
        !that.data.flag
            ? wx.showToast({
                  title: '数据加载中',
                  icon: 'loading'
              })
            : null;
        const perpage = 6;
        const page = that.data.page;
        console.log(page);

        const houseData = [];
        console.log('uid====' + wx.getStorageSync('uid'));
        if (!that.data.searchLoadingComplete) {
            wx.request({
                url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/blingDemandList',
                data: {
                    uid: wx.getStorageSync('uid'),
                    num: perpage,
                    p: page
                },
                method: 'get',
                header: { 'content-type': 'application/json' },
                success: res => {
                    console.log(res);
                    var houseData = res.data.data;
                    if (parseInt(res.data.code) === 1) {
                        wx.showToast({
                            title: '数据加载中',
                            icon: 'loading'
                        });
                        if (res.data.data.length === 0) {
                            console.log('没有数据了');

                            wx.showToast({
                                title: '数据已经全部加载完成',
                                icon: 'success',
                                duration: 1000,
                                complete: () => {
                                    that.setData({
                                        flag: true
                                    });
                                }
                            });
                            that.setData({
                                searchLoadingComplete: true
                            });
                        } else {
                            setTimeout(() => {
                                wx.hideLoading();
                            }, 2000);
                            that.setData({
                                history: that.data.history.concat(houseData)
                            });
                            console.log(that.data.history);
                        }
                    } else {
                        wx.showModal({
                            title: '提示',
                            showCancel: false,
                            content: '您还没有登录,请您先登录',
                            confirmColor: '#ff7859',
                            success: res => {
                                if (res.confirm) {
                                    wx.redirectTo({
                                        url: '../login/login'
                                    });
                                } else if (res.cancel) {
                                    console.log('用户点击取消');
                                }
                            }
                        });
                    }
                }
            });
        }
    },
    toListInfo(e) {
        console.log(e);
        if (e.currentTarget.dataset.type == 5) {
            wx.navigateTo({
                url:
                    '/pages/sellerback/sellerback?deid=' +
                    e.currentTarget.dataset.id +
                    '&detype=' +
                    e.currentTarget.dataset.type
            });
        } else {
            wx.navigateTo({
                url:
                    '/pages/recommend/recommend?id=' +
                    e.currentTarget.dataset.id +
                    '&type=' +
                    e.currentTarget.dataset.type
            });
        }
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
    onReachBottom: function() {
        console.log('上拉加载');
        let p = this.data.page;
        p++;
        this.setData(
            {
                page: p
            },
            () => {
                this.loadData();
            }
        );
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});
