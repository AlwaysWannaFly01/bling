// pages/sellhouse/sellhouse.js
const app = getApp()
const qiniuUploader = require('../../utils/qiniuUploader');
// 初始化七牛相关参数
function initQiniu() {
    var options = {
        regin: 'ECN', //华东区
        uptokenURL: 'https://www.mmuunn.cn/FastRentWx/HouseList/qiNiuUpToken',
        domain: 'http://img.funbling.net',
        shouldUseQiniuFileName: false
    };
    qiniuUploader.init(options);
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        property: {
            selectedSell: true,
            selectedIndex: true
        },
        houseStyle: false,
        multiArray: [
            ['1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室', '9室'],
            ['0厅', '1厅', '2厅', '3厅', '4厅', '5厅', '6厅', '7厅', '8厅', '9厅'],
            ['0厨', '1厨', '2厨', '3厨', '4厨', '5厨', '6厨', '7厨', '8厨', '9厨'],
            ['0卫', '1卫', '2卫', '3卫', '4卫', '5卫', '6卫', '7卫', '8卫', '9卫']
        ],
        multiIndex: [0, 0, 0, 0],
        num: 0
    },
    bindHousePickerChange: function(e) {
        //选择户型
        console.log('picker发送选择改变，携带值为', e.detail.value);
        var multiIndex = e.detail.value;
        var bedroom_id = multiIndex[0] + 1;
        var sittingroom_id = multiIndex[1];
        var kitchen_id = multiIndex[2];
        var toilet_id = multiIndex[3];
        this.setData({
            multiIndex: multiIndex,
            bedroom: bedroom_id,
            sittingroom: sittingroom_id,
            kitchen: kitchen_id,
            toilet: toilet_id,
            houseStyle: true
        });
    },
    bindAreaInput(e) {
        console.log(e);
        this.setData({
            area: e.detail.value
        });
    },
    useaverageprice() {
        if (!this.data.area || this.data.area < 10 || this.data.area > 999) {
            wx.showToast({
                title: '请填写合理的建筑面积',
                icon: 'none',
                duration: 1000,
                mask: true
            });
        } else {
            var pri = (wx.getStorageSync('price_average') * this.data.area) / 10000;
            pri = pri.toFixed(2);
            console.log(pri);
            this.setData({
                expectPrice: pri
            });
        }
    },
    relese() {
        initQiniu();
        const that = this;
        const filePath = wx.getStorageSync('files');
        console.log(filePath);
        const imgData = [];
        if (filePath.length > 0) {
            for (let i = 0; i < filePath.length; i++) {
                qiniuUploader.upload(
                    filePath[i],
                    res => {
                        if (res) {
                            imgData.push(res.imageURL);
                        }
                        that.setData({
                            photo: imgData
                        });
                    },
                    error => {
                        console.error('error:' + JSON.stringify(error));
                    }
                );
            }
            console.log(that.data);
            console.log(imgData);
        }
    },
    sellDescription(e) {
        var num = e.detail.value.length;
        this.setData({
            description: e.detail.value,
            Num: num
        });
    },
    match: function() {
        console.log(this.data.photo);
        console.log(this.data.bedroom);
        if (!wx.getStorageSync('document_new_id')) {
            wx.showToast({
                title: '请选择小区',
                icon: 'none',
                duration: 1000,
                mask: true
            });
        } else if (!this.data.bedroom) {
            wx.showToast({
                title: '请选择户型',
                icon: 'none',
                duration: 1000,
                mask: true
            });
        } else if (!this.data.area || this.data.area < 10 || this.data.area > 999) {
            wx.showToast({
                title: '请填写合理的房间面积',
                icon: 'none',
                duration: 1000,
                mask: true
            });
        } else if (!this.data.expectPrice) {
            wx.showToast({
                title: '请填写期望价格',
                icon: 'none',
                duration: 1000,
                mask: true
            });
        } else {
            // this.relese();
            this.matchAgent();
        }
    },
    matchAgent() {
        console.log(123)
        const that = this;
        that.setData({
            btnDisabled: 'disabled'
        });
        wx.request({
            url: app.globalData.xuanfangBase + '/XuanfangWx/Bling/addDemand',
            header: {
                'content-type': 'application/json'
            },
            method: 'get',
            data: {
                uid: wx.getStorageSync('uid')
            }
        });
    },
    toIndex() {
        wx.redirectTo({
            url: '/pages/index/index'
        });
    },
    rent() {
        wx.redirectTo({
            url: '/pages/renthouse/renthouse'
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
    search: function() {
        wx.navigateTo({
            url: '/pages/communityName/communityName'
        });
    },
    perfect: function() {
        wx.navigateTo({
            url: '/pages/houseInfo/houseInfo'
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
            search_title: wx.getStorageSync('search_title'),
            price_average: wx.getStorageSync('price_average')
        });
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