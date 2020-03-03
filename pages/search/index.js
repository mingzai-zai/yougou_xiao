// pages/search/index.js
import axios from "../../utils/axios.js"
Page({
  data:{
    //是否展示取消btn的按钮,切渲染这个值
    inputvalue:'',
    // 存储获取回来的列表
    searchlist:[],
    //展示列表
    showlist:false,
    //防抖节流，以免用户一直乱按频繁请求,
    loading:false,
    //保存最后请求的inputvalue
    lastvalue:'',
    //存放本地history数据
    historylist:[]
  },
//内容发生改变的时候
  c_inputvalue(e){
    this.setData({
      inputvalue:e.detail.value
    })
    if(e.detail.value) {
      if(!this.data.loading) {
        this.setData({
          loading:true,
          //记录最后一次（请求）的数据（123），因为用户按太快了，请求还没有成功时候一直按，当时loading是为true的，所以这过程书写的数据没有请求（1233333），所以要判断是否是真正的最后一次数据
          lastvalue:this.data.inputvalue
        })
        this.getData();
        //判断是否真正的最后一次数据
        if (this.data.lastvalue !== this.data.inputvalue) {
          this.getData()
        }
      }
    }else{
      this.setData({
        showlist: false,
      })
    }
  },
  //封装请求
  getData(){
    axios({
      url: '/goods/qsearch',
      data: { query: this.data.inputvalue }
    }).then(res => {
      // console.log(res);
      let { message } = res.data;
      
      this.setData({
        searchlist: message,
        showlist: true,
        loading: false,
      })
      if (message.length == 0) {
        this.setData({
          showlist:false,
        })
      }
    })
  },
// 点击取消按钮时候
  cancel(){
    this.setData({
      inputvalue: '',
      searchlist: [],
      showlist: false,
    })
  },
  // 点击确认时候
  confirm(){
    // wx.redirectTo
    wx.reLaunch({
      url: `/pages/searchfoods/index?keyword=${this.data.inputvalue}`
    })
    let arr = this.data.historylist
    arr.unshift(this.data.inputvalue)
    arr =Array.from([...new Set(arr)])
    // arr = [...new Set(arr)]
    wx.setStorageSync("history", arr)
  },
  // 一加载就显示本地存储的history
  onLoad(){
    let arr = wx.getStorageSync('history')
    if (!Array.isArray(arr)) {
      //如果用短路的话存的是对象呢
      arr = []
    }
    this.setData({
      historylist:arr
    })
  },
  //点击历史记录跳转
  handleto(e){
    wx.navigateTo({
      url: `/pages/searchfoods/index?keyword=${e.currentTarget.dataset.value}`
    })
    let arr = this.data.historylist
    arr.unshift(e.currentTarget.dataset.value)
    arr = Array.from([...new Set(arr)])
    // arr = [...new Set(arr)]
    wx.setStorageSync("history", arr)
  },
  //失焦时候
})