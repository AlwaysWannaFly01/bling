// pages/my/my.js
const app = getApp();
const Util = require('../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: 'Bling房来啦',
        property: {
            selectedMy: true
        }
    },
    getPhoneNumber(e) {
        console.log(e);
        const that = this;
        if (e.detail.errMsg !== 'getPhoneNumber:ok') {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '您还没有登录,请您先登录',
                confirmColor: '#ff7859',
                success: res => {
                    console.log(res);
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '../login/login'
                        });
                    }
                }
            });
        } else {
            wx.login({
                success: res => {
                    console.log(res);
                    wx.request({
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        method: 'post',
                        url: app.globalData.zhaofangBase + '/findhousewx/auth/decode_userinfo',
                        data: Util.json2Form({
                            encrypteData: e.detail.encryptedData,
                            iv: e.detail.iv,
                            code: res.code
                        }),
                        success: function(res) {
                            console.log(123);
                            console.log(res);
                            if (res.data.code == 1) {
                                //我后台设置的返回值为1是正确
                                wx.setStorageSync('phone', res.data.data.purePhoneNumber);
                                wx.setStorageSync('openId', res.data.data.openid);
                                that.phonelogin();
                                that.onShow();
                            } else {
                                wx.showToast({
                                    title: '获取失败,请重新再试',
                                    icon: 'none',
                                    duration: 1000,
                                    mask: true
                                });
                            }
                        },
                        fail: function(err) {
                            console.log(err);
                            wx.showModal({
                                title: '提示',
                                showCancel: false,
                                content: '获取手机号失败，请前往登录页面登录',
                                confirmColor: '#ff7859',
                                success: function(res) {
                                    if (res.confirm) {
                                        wx.navigateTo({
                                            url: '../login/login'
                                        });
                                    } else if (res.cancel) {
                                        console.log('用户点击取消');
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    quit: function() {
        console.log('退出');
        wx.removeStorageSync('uid');
        wx.removeStorageSync('headimg');
        wx.removeStorageSync('username');
        this.onShow();
    },
    toIndex() {
        wx.redirectTo({
            url: '/pages/index/index'
        });
    },
    demand() {
        wx.redirectTo({
            url: '/pages/demand/demand'
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
    onShow: function() {
        this.setData({
            username: wx.getStorageSync('username'),
            headimg: wx.getStorageSync('headimg')
        });
        if (wx.getStorageSync('uid')) {
            this.setData({
                isLogin: 1
            });
        } else {
            this.setData({
                isLogin: 0
            });
        }
    },

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
