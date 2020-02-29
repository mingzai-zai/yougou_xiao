// pages/sort/index.js
import axios from '../../utils/axios.js'
Page({
 data:{
   sortlist:[],
   current:0
 },
 onLoad(){
   axios({
     url:'/categories',
   }).then(res=>{
     console.log(res);
    let {message} = res.data;
    this.setData({
      sortlist:message
    })
   })
 },
 click(e){
   console.log(e.currentTarget.dataset.index)
   this.setData({
     current:e.currentTarget.dataset.index
   })
 }
})