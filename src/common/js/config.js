import axios from 'axios';
import { Toast } from 'antd-mobile';

// 拦截请求
axios.interceptors.request.use(function (req) {
  Toast.loading('', 0); // 0 代表不关闭
  return req;
});

// 拦截响应
axios.interceptors.response.use(function (res) {

  Toast.hide(); // 全局销毁

  if (res.config.url === '/user/check') {
    if (res.data.code === 2) {
      Toast.offline(res.data.msg, 2); // 2s
    }
  }

  return res;
});
