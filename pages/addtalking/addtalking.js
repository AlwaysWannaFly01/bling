// pages/addtalking/addtalking.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: 'Bling房来啦',
        num: 0,
        description: ''
    },
    inputDescription: function(e) {
        var s = e.detail.value.length;
        this.setData({
            description: e.detail.value,
            num: s
        })
    },
    save() {
        if (this.data.description === '') {
            wx.showToast({
                title: '请先填写补充说明',
                icon: 'none',
                duration: 1000,
                mask: true
            })
        } else {
            wx.setStorageSync('description', this.data.description);
            wx.navigateBack();
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})