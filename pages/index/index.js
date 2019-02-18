//index.js
//获取应用实例
const app = getApp();
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
    data: {
        property: {
            selectedBuy: true,
            selectedIndex: true
        },
        show: false, //弹窗
        isClick: false,
        longitude: '',
        latitude: '',
        scale: 15
    },
    //关闭弹窗
    close: function() {
        this.setData({
            show: false
        });
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
                    // console.log(res);
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
                        url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/getPhoneNumber',
                        data: {
                            encrypted_data: e.detail.encryptedData,
                            iv: e.detail.iv,
                            code: res.code
                        },
                        method: 'post',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: res => {
                            console.log(res);
                            if (res.data.code == 1) {
                                const phone = res.data.data.purePhoneNumber;
                                const openId = wx.getStorageSync('openId');
                                console.log(openId);
                                const os = wx.getStorageSync('os');
                                wx.setStorageSync('phone', res.data.data.purePhoneNumber); //设置个人手机号缓存
                                wx.request({
                                    url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/getPhoneLogin',
                                    data: {
                                        mobile: phone
                                    },
                                    method: 'post',
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    success: res => {
                                        console.log(res);
                                        wx.setStorageSync('uid', res.data.data.uid); //设置个人uid缓存
                                        wx.setStorageSync('username', res.data.data.username);
                                        wx.setStorageSync('headimg', res.data.data.headimg);
                                        that.setData({
                                            ot: 2,
                                            disabled: false,
                                            show: false
                                        });
                                        wx.showToast({
                                            title: '已成功绑定手机号',
                                            icon: 'none',
                                            duration: 1000,
                                            mask: true
                                        });
                                        if (that.data.isClick) {
                                            wx.redirectTo({
                                                url: '/pages/demand/demand'
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    },
    rent() {
        wx.redirectTo({
            url: '/pages/renthouse/renthouse'
        });
    },
    sell() {
        wx.redirectTo({
            url: '/pages/sellhouse/sellhouse'
        });
    },
    demand() {
        if (wx.getStorageSync('uid')) {
            wx.redirectTo({
                url: '/pages/demand/demand'
            });
        } else {
            this.setData({
                show: true,
                isClick: true
            });
        }
    },
    my() {
        wx.redirectTo({
            url: '/pages/my/my'
        });
    },
    resetPosition() {
        this.getlocation();
    },
    chooseBudget() {
        wx.navigateTo({
            url: '/pages/pricechoose/pricechoose'
        });
    },
    addtalking() {
        wx.navigateTo({
            url: '/pages/addtalking/addtalking'
        });
    },
    onLoad() {
        qqmapsdk = new QQMapWX({
            key: 'UQRBZ-I3HKG-EZTQ6-IXSEP-LYYS2-XVFEL'
        });
        var sys = wx.getSystemInfoSync();
        var navBarHeight = -(sys.screenHeight - sys.windowHeight - sys.statusBarHeight) * 4 - 20;
        this.setData({
            navheight: navBarHeight
        });
        this.getlocation();
        if (!wx.getStorageSync('uid')) {
            this.setData({
                show: true,
                ot: 1
            });
        } else {
            this.setData({
                ot: 2
            });
        }
    },
    onShow() {
        this.setData({
            priceSelection: wx.getStorageSync('priceSelection'),
            description: wx.getStorageSync('description')
        });
    },
    getlocation() {
        wx.getLocation({
            type: 'gcj02',
            success: res => {
                console.log(res);
                let longitude = res.longitude;
                let latitude = res.latitude;
                qqmapsdk.reverseGeocoder({
                    location: {
                        longitude: longitude,
                        latitude: latitude
                    },
                    success: res => {
                        console.log(res);
                        this.setData({
                            address: res.result.address
                        });
                        console.log(this.data.address);
                    }
                });

                wx.request({
                    url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/documentPriceAverage',
                    data: {
                        demand_type: 2,
                        position_x: longitude,
                        position_y: latitude
                    },
                    method: 'get',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: res => {
                        console.log(res);
                        if (parseInt(res.data.code) == 1) {
                            if (res.data.data.house_count !== 0) {
                                this.setData({
                                    markers: [
                                        {
                                            id: '1',
                                            iconPath: '../../image/lat.png',
                                            longitude: longitude,
                                            latitude: latitude,
                                            width: 16,
                                            height: 32,
                                            callout: {
                                                content:
                                                    '区域内房源均价:' +
                                                    res.data.data.price_average +
                                                    '元/m²\n' +
                                                    this.data.address,
                                                color: '#333',
                                                fontSize: 14,
                                                borderRadius: 10,
                                                bgColor: '#fff',
                                                padding: 6,
                                                textAlign: 'center',
                                                display: 'ALWAYS'
                                            }
                                        }
                                    ]
                                });
                            } else {
                                this.setData({
                                    markers: [
                                        {
                                            id: '1',
                                            iconPath: '../../image/lat.png',
                                            longitude: longitude,
                                            latitude: latitude,
                                            width: 16,
                                            height: 32,
                                            callout: {
                                                content: '该区域暂无房源',
                                                color: '#333',
                                                fontSize: 14,
                                                borderRadius: 10,
                                                bgColor: '#fff',
                                                padding: 6,
                                                display: 'ALWAYS'
                                            }
                                        }
                                    ]
                                });
                            }
                        }
                    }
                });

                this.setData({
                    longitude: longitude,
                    latitude: latitude,
                    circles: [
                        {
                            longitude: longitude,
                            latitude: latitude,
                            color: '#ff912e90',
                            fillColor: '#ffbc7490',
                            radius: 500,
                            strokeWidth: 1
                        }
                    ]
                });
                console.log(this.data.longitude);
                console.log(this.data.latitude);
            }
        });
    },
    regionChange(e) {
        console.log(e);
        if (e.type == 'end') {
            this.mapCtx.getCenterLocation({
                success: res => {
                    console.log(res);
                    qqmapsdk.reverseGeocoder({
                        location: {
                            longitude: res.longitude,
                            latitude: res.latitude
                        },
                        success: res => {
                            console.log(res);
                            this.setData({
                                address: res.result.address
                            });
                        },
                        fail: function(error) {
                            console.error(error);
                        },
                        complete: function(res) {
                            console.log(res);
                        }
                    });

                    wx.request({
                        url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/documentPriceAverage',
                        data: {
                            demand_type: 2,
                            position_x: res.longitude,
                            position_y: res.latitude
                        },
                        method: 'get',
                        header: {
                            'content-type': 'application/json'
                        },
                        success: result => {
                            console.log(result);
                            if (parseInt(result.data.code) == 1) {
                                if (result.data.data.house_count !== 0) {
                                    this.setData({
                                        markers: [
                                            {
                                                id: '1',
                                                iconPath: '../../image/lat.png',
                                                longitude: res.longitude,
                                                latitude: res.latitude,
                                                width: 16,
                                                height: 32,
                                                callout: {
                                                    content:
                                                        '区域内房源均价:' +
                                                        result.data.data.price_average +
                                                        '元/m²\n' +
                                                        this.data.address,
                                                    color: '#333',
                                                    fontSize: 14,
                                                    borderRadius: 10,
                                                    bgColor: '#fff',
                                                    padding: 6,
                                                    textAlign: 'center',
                                                    display: 'ALWAYS'
                                                }
                                            }
                                        ],
                                        circles: [
                                            {
                                                longitude: res.longitude,
                                                latitude: res.latitude,
                                                color: '#ff912e90',
                                                fillColor: '#ffbc7490',
                                                radius: 500,
                                                strokeWidth: 1
                                            }
                                        ]
                                    });
                                } else {
                                    this.setData({
                                        markers: [
                                            {
                                                id: '1',
                                                iconPath: '../../image/lat.png',
                                                longitude: res.longitude,
                                                latitude: res.latitude,
                                                width: 16,
                                                height: 32,
                                                callout: {
                                                    content: '该区域暂无房源',
                                                    color: '#333',
                                                    fontSize: 14,
                                                    borderRadius: 10,
                                                    bgColor: '#fff',
                                                    padding: 6,
                                                    display: 'ALWAYS'
                                                }
                                            }
                                        ],
                                        circles: [
                                            {
                                                longitude: res.longitude,
                                                latitude: res.latitude,
                                                color: '#ff912e90',
                                                fillColor: '#ffbc7490',
                                                radius: 500,
                                                strokeWidth: 1
                                            }
                                        ]
                                    });
                                }
                            }
                        }
                    });

                    this.setData({
                        long2: res.longitude,
                        lat2: res.latitude
                    });
                }
            });
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.mapCtx = wx.createMapContext('myMap');
        console.log(this);
    },
    sendNeed() {
        let px, py;
        // console.log(this.data.long2, 'this.data.long2');
        // console.log(this.data.lat2, 'this.data.lat2');
        if (!this.data.long2 && !wx.getStorageSync('position_x')) {
            px = this.data.longitude;
            py = this.data.latitude;
            // console.log(px);
            // console.log(py);
        }
        if (this.data.long2) {
            px = this.data.long2;
            py = this.data.lat2;
            // console.log(px);
            // console.log(py);
        }
        if (!wx.getStorageSync('price')) {
            wx.showToast({
                title: '请选择预算',
                icon: 'none',
                duration: 1000,
                mask: true
            });
        } else {
            this.setData({
                disabled: true
            });
            wx.request({
                url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/addDemand',
                data: {
                    uid: wx.getStorageSync('uid'),
                    type: 2,
                    position_x: px,
                    position_y: py,
                    price: wx.getStorageSync('price'),
                    description: wx.getStorageSync('description')
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                success: res => {
                    console.log(res);
                    if (parseInt(res.data.code) === 1) {
                        wx.removeStorageSync('price');
                        wx.removeStorageSync('description');
                        wx.removeStorageSync('priceSelection');
                        this.setData({
                            sho: true,
                            position_x: '',
                            position_y: '',
                            disabled: false
                        });
                        this.onShow();
                    } else {
                        this.setData({
                            disabled: false
                        });
                    }
                }
            });
        }
    },
    hid: function() {
        wx.navigateTo({
            url: '/pages/demand/demand'
        });
        this.setData({
            sho: false
        });
    }
});
