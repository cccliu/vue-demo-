import {request} from './request'

// 接口管理
const getLogin = (froms) => {
  let res = request('/carapp/travel/queryCarCurrentStatusH5.json?code=76r943', 'POST', froms, false)
  return res
}

export {
  getLogin
}