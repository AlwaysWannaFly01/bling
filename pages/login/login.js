// pages/login/login.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        send: true,
        mobile: '',
        code: '',
        alreadySend: false,
        second: 60
    },
    inputMobile: function(e) {
        console.log(e);
        this.setData({
            mobile: e.detail.value
        });
    },
    inputCode: function(e) {
        console.log(e);
        this.setData({
            code: e.detail.value
        });
    },
    agreement: function() {
        wx.navigateTo({
            url: '/pages/service-agreement/service-agreement'
        });
    },
    sendMsg() {
        const phone = this.data.mobile;
        const checkphone = this.checkMobile(phone);
        if (!checkphone) {
            // 手机格式不正确
            this.setData({
                mobile: ''
            });
        } else {
            wx.request({
                url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/sendVerify',
                data: {
                    mobile: phone
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                success: res => {
                    console.log(res);
                }
            });
            this.setData({
                alreadySend: true,
                send: false
            });
            this.timer();
        }
    },
    checkMobile: function(mobile) {
        let str = /^1\d{10}$/;
        if (str.test(mobile)) {
            return true;
        } else {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '请输入正确的手机号'
            });
            return false;
        }
    },
    timer() {
        const promise = new Promise((resolve, reject) => {
            const setTimer = setInterval(() => {
                this.setData({
                    second: this.data.second - 1
                });
                if (this.data.second <= 0) {
                    this.setData({
                        second: 60,
                        alreadySend: false,
                        send: true
                    });
                    resolve(setTimer);
                }
                // else if (this.data.second <= 50) {
                //     this.setData({
                //         second: 60
                //     });
                //     reject(setTimer);
                // }
            }, 1000);
        });
        promise.then(setTimer => {
            clearInterval(setTimer);
        });
        // promise.catch(setTimer => {
        //     clearInterval(setTimer);
        // });
    },
    onSubmit() {
        const that = this;
        wx.request({
            url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/login',
            data: {
                mobile: that.data.mobile,
                code: that.data.code
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            success: res => {
                console.log(res);
                if (parseInt(res.data.code) == 1) {
                    wx.setStorageSync('uid', res.data.data.uid);
                    wx.setStorageSync('username', res.data.data.username);
                    wx.setStorageSync('headimg', res.data.data.headimg);
                    wx.setStorageSync('phone', that.data.mobile);
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 1500
                    });
                    that.setData({
                        disabled: true
                    });
                    setTimeout(() => {
                        wx.navigateBack();
                    }, 2000);
                    // wx.navigateBack();
                } else {
                    wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: '请输入正确的短信验证码'
                    });
                    return false;
                }
            }
        });
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
