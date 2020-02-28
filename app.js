//app.js
import axios from "utils/axios.js"
App({
  onLaunch: function () {
    axios.defaults.baseURL ="https://api-hmugo-web.itheima.net/api/public/v1"
  }
})