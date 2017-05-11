import util from '../../utils/util.js'

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    history: [],
    searchValue: '',
    loading: false
  },
  doSearch () {
    let that = this
    this.loading()
    wx.request({
      url: 'http://api.pansou.com/search_new.php?q=' + this.data.searchValue,
      success (res) {
        wx.navigateTo({
          url: '/pages/list/list'
        })
      },
      fail (res) {
        console.log(res)
      },
      complete () {
        this.loaded()
      }
    })
  },
  loading() {
    this.setData({
      loading: true
    })
  },
  loaded() {
    this.setData({
      loading: false
    })
  },
  search () {
    if (this.data.searchValue == '') {
      return false
    }
    let histories = this.data.history
    histories.length == 10 && histories.shift()
    histories.push(this.data.searchValue)
    this.doSearch()
    this.setData({
      history: histories
    })
    wx.setStorage({
      key: 'search_history',
      data: this.data.history,
    })
  },
  searchInput (e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  research (event) {
    this.setData({searchValue: event.currentTarget.dataset.item})
  },
  onLoad () {
    wx.navigateTo({
      url: '/pages/list/list'
    })
    that = this
    console.log(wx.getStorage({
      key: 'search_history',
      success (res) {
        that.setData({
          history: res.data
        })
      }
    }))
    
    let that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
