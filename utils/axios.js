
const axios = (config={})=>{
  return new Promise((ok,notok)=>{
    // 如果有其它请求地址的话https那些的，例如https://api.github.com/users就判断是否有http才加，可以用正则的search和其它方法，或者是indexOf（'http'）
    config.url = axios.defaults.baseURL + config.url;
    wx.request({
      ...config,
      // method:'GET',
      success:function(res){
        ok(res)
      },
      fail(res){
        notok(res)
      },
      complete(res){
        axios.errors(res)
      }
    })
  })
}

axios.defaults={
  baseURL:''
}
axios.errors = () => { };//默认空函数
// //所以在这边就要处理这个传进去的function，不能在onError里面处理数据，所以先存起来
axios.onError=cb => {
  if (typeof cb == "function") {
    axios.errors = cb
  }
}
export default axios;