// pages/shouquan/index.js
import axios from "../../utils/axios.js";
Page({

  getuserinfo(e){
    // console.log(e);
    let { encryptedData, rawData, iv, signature} = e.detail
    wx.login({
      success:function(res){
        let {code} = res;
        if(code) {
          axios({
            url: "/users/wxlogin",
            data:
              { encryptedData, rawData, iv, signature, code },
            method: "post"
          }).then(res => {
            // console.log(res)
            if(res.data.meta.msg=="登录成功"){
              let { token } = res.data.message;
              wx.setStorageSync('token', token)
              wx.showToast({
                title: '授权成功',
                icon: 'success',
              })
              wx.navigateBack()
            }
          })
        }
      }
    })
  }
})