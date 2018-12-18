export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export const formatTime = (createTime) => {
  const dayTime = 24 * 60 * 60 * 1000;
  const currentDay = new Date();

  const h = currentDay.getHours();
  const m = currentDay.getMinutes();
  const s = currentDay.getSeconds();

  const read = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000;
  const deltaTime = currentDay.getTime() - createTime;

  if (deltaTime < read) {
    return formatDate(new Date(createTime), 'hh:mm');
  }

  if (deltaTime > read && deltaTime < read + dayTime) {
    return '昨天';
  }

  if (deltaTime > read + dayTime && deltaTime < read + dayTime * 2) {
    return '前天';
  }

  return formatDate(new Date(createTime), 'yyyy/MM/dd');
}
