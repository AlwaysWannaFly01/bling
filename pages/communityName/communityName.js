// pages/communityName/communityName.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: '搜索地区',
        inputVal: '',
        page: 1,
        testdata: []
    },
    inputTyping: function(e) {
        console.log(e);
        this.setData({
            inputVal: e.detail.value
        });
        this.searchData();
    },
    clearInput: function(e) {
        this.setData({
            inputVal: '',
            testdata: []
        });
    },
    searchData: function() {
        const that = this;
        wx.showToast({
            title: '数据加载中',
            icon: 'loading'
        });
        const num = 10;
        const p = that.data.page;
        const houseData = [];
        wx.request({
            url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/demandScreenCommunity',
            data: {
                title: that.data.inputVal,
                num: num,
                p: p
            },
            method: 'get',
            header: { 'content-type': 'application/json' },
            success: function(res) {
                console.log(res);
                if (parseInt(res.data.code) == 1) {
                    var houseData = res.data.data;
                    for (let i = 0; i < houseData.length; i++) {
                        const values = houseData[i].title.split(that.data.inputVal);
                        console.log(values);
                        houseData[i].titleAll = values;
                    }
                    console.log(houseData);

                    setTimeout(function() {
                        wx.hideLoading();
                    }, 2000);
                    var list = that.data.testdata.concat(houseData);
                    console.log(list);

                    if (list.length == 0) {
                        that.setData({
                            exist: true
                        });
                    }
                    that.setData({
                        testdata: list
                    });
                }
            },
            fail: function(err) {
                console.log(res.data.msg);
            }
        });
    },
    choose: function(e) {
        console.log(e);
        const id = e.currentTarget.dataset.id;
        const title = e.currentTarget.dataset.title;
        const price = e.currentTarget.dataset.price;
        const partition = e.currentTarget.dataset.ptid;
        const mall = e.currentTarget.dataset.mall;
        const position_x = e.currentTarget.dataset.px;
        const position_y = e.currentTarget.dataset.py;
        wx.setStorageSync('document_new_id', id);
        wx.setStorageSync('search_title', title);
        wx.setStorageSync('price_average', price);
        wx.setStorageSync('partition', partition);
        wx.setStorageSync('mall', mall);
        wx.setStorageSync('position_x', position_x);
        wx.setStorageSync('position_y', position_y);
        wx.navigateBack();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

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
