import axios from 'axios';
import Qs from 'qs';

// 获取与当前用户相关的所有消息（发送方或接收方）
export function getMsgList() {
  const url = '/chat/getMsgList';

  return axios.get(url).then(res => {
    if (res.status === 200) {
      return Promise.resolve(res.data);
    }
  })
}

// 设置接收的消息已读
export function setMsgRead(data) {
  const url = '/chat/readmsg';

  return axios.post(url, Qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  })
}
