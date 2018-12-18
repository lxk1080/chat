import axios from 'axios';

export function getAvatars() {
  const url = '/file/image';

  return axios.get(url).then(res => {
    if (res.status === 200) {
      return Promise.resolve(res.data);
    }
  })
}
