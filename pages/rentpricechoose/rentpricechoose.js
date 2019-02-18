// pages/rentpricechoose/rentpricechoose.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: 'Bling房来啦',
        rentPrice: [
            '500元/月以下',
            '500-1000元/月',
            '1000-1500元/月',
            '1500-2000元/月',
            '2000-3000元/月',
            '3000-5000元/月',
            '5000元/月以上'
        ],
        rentValue: ['0,500', '500,1000', '1000,1500', '1500,2000', '2000,3000', '3000,5000', '5000,0'],
        price: ''
    },
    choosePrice: function(e) {
        console.log(e.currentTarget.dataset);
        var price = this.data.rentValue[e.currentTarget.dataset.index];
        var priceSelection = this.data.rentPrice[e.currentTarget.dataset.index];
        this.setData({
            choosedindex: e.currentTarget.dataset.index,
            price: price,
            priceSelection: priceSelection
        });
        console.log(this.data.price);
    },

    save: function() {
        if (this.data.price == '') {
            wx.showToast({
                title: '您还没有选择预算',
                icon: 'none',
                duration: 1000,
                mask: true
            });
        } else {
            wx.setStorageSync('rentPrice', this.data.price);
            wx.setStorageSync('rentPriceSelection', this.data.priceSelection);
            wx.navigateBack();
        }
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
