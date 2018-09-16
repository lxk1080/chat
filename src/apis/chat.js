import axios from 'axios';

export function getMsgList() {
  const url = '/chat/getMsgList';

  return axios.get(url).then(res => {
    if (res.status === 200) {
      return Promise.resolve(res.data);
    }
  })
}