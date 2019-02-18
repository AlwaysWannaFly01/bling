// pages/renthouse/renthouse.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        property: {
            selectedRent:true,
            selectedIndex:true
        }
    },
    toIndex() {
        wx.redirectTo({
            url: '/pages/index/index'
        });
    },
    sell(){
        wx.redirectTo({
            url: '/pages/sellhouse/sellhouse'
        });
    },
    demand() {
        wx.redirectTo({
            url: '/pages/demand/demand'
        });
    },
    my() {
        wx.redirectTo({
            url: '/pages/my/my'
        });
    },
    resetPosition() {
        console.log(123);
    },
    chooseBudget() {
        wx.navigateTo({
            url: '/pages/rentpricechoose/rentpricechoose'
        });
    },
    addtalking() {
        wx.navigateTo({
            url: '/pages/addtalking/addtalking'
        });
    },
    onShow() {
        console.log(123)
        console.log(wx.getStorageSync('rentPrice'))
        this.setData({
            priceSelection: wx.getStorageSync('rentPriceSelection'),
            description: wx.getStorageSync('description')
        });
        console.log(this.data.priceSelection)
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