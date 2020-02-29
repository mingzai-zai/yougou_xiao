// pages/searchfoods/index.js
Page({
  data:{
    current:0
  },
  typetab(e){
    this.setData({
      current:e.currentTarget.dataset.index
    })
  }
  
})