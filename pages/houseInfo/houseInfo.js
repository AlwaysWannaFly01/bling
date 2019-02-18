// pages/houseInfo/houseInfo.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: '房源信息',
        decorateType: ['毛坯', '简装', '精装', '豪装', '中装'],
        files: [],
        hidepic: false,
        floor: '',
        floor2: ''
    },
    binddecorate(e) {
        console.log(e.detail.value);
        this.setData({
            index: e.detail.value,
            flag: true,
            decorate: parseInt(e.detail.value) + 11
        });
    },
    floor(e) {
        console.log(e);
        this.setData({
            floor: e.detail.value
        });
    },
    floor2(e) {
        this.setData({
            floor2: e.detail.value
        });
    },
    chooseImage(e) {
        console.log(e);
        const that = this;
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                console.log(res);
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
                // console.log(that.data.files, 'data中的files');
                if (that.data.files.length >= 9) {
                    const files = that.data.files;
                    const num = files.length - 9;
                    files.splice(files.length - num, num);
                    // console.log(that.data.files);
                    that.setData({
                        files: files,
                        hidepic: true
                    });
                }
            }
        });
    },
    previewImage(e) {
        const that = this;
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: that.data.files
        });
    },
    deleteImg(e) {
        console.log(e);
        const that = this;
        const index = e.target.dataset.index;
        const src = e.target.dataset.src;
        const files = that.data.files;
        files.splice(index, 1);

        that.setData({
            files: files,
            hidepic: ''
        });
    },
    save() {
        const pages = getCurrentPages(); //当前页面
        const beforePage = pages[pages.length - 2]; //前一个页面
        if (parseInt(this.data.floor2) < parseInt(this.data.floor)) {
            wx.showToast({
                title: '楼层总数不能小于楼层数',
                icon: 'none',
                duration: 1000,
                mask: true
            });
        } else if (
            (this.data.floor != '' && this.data.floor2 == '') ||
            (this.data.floor == '' && this.data.floor2 != '')
        ) {
            wx.showToast({
                title: '楼层总数和楼层数必须同时填写或同时不填写',
                icon: 'none',
                duration: 1000,
                mask: true
            });
        } else {
            wx.setStorageSync('floor', this.data.floor);
            wx.setStorageSync('floor2', this.data.floor2);
            wx.setStorageSync('decorate', this.data.decorate);
            wx.setStorageSync('files', this.data.files);
            wx.navigateBack({
                success: function() {
                    beforePage.relese(); //执行前一个页面的方法
                }
            });
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
