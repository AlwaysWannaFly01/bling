// pages/pricechoose/pricechoose.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: 'Bling房来啦',
        buyPrice: [
            '80万以下',
            '80-100万',
            '100-150万',
            '150-200万',
            '200-300万',
            '300-400万',
            '400-500万',
            '500万以上'
        ],
        buyValue: ['0,80', '80,100', '100,150', '150,200', '200,300', '300,400', '400,500', '500,0'],
        price: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    choosePrice: function(e) {
        // console.log(e.currentTarget.dataset);
        const price = this.data.buyValue[e.currentTarget.dataset.index];
        const priceSelection = this.data.buyPrice[e.currentTarget.dataset.index];
        this.setData({
            choosedindex: e.currentTarget.dataset.index,
            price: price,
            priceSelection: priceSelection
        });
        console.log(this.data.price);
    },
    save() {
        if (this.data.price == '') {
            wx.showToast({
                title: '您还没有选择预算',
                icon: 'none',
                duration: 1000,
                mask: true
            });
        } else {
            wx.setStorageSync('price', this.data.price);
            wx.setStorageSync('priceSelection', this.data.priceSelection);
            wx.navigateBack();
        }
    },
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
