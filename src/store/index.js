import Vue from 'vue'
import Vuex from 'vuex'
import cache from '../ulit/cookie'

Vue.use(Vuex)
const token = cache.getToken('token')
const state = { // 初始化数据
  appid: 'Hkskklworlg103',
  user: 'admit',
  token: token || ''
}
const mutations = { // 同步操作（commit）
  addToken (state, value) {
    state.token = value
    cache.setToken('token', value)
  }
}
const actions = { // 异步操作(dispatch)

}
export default new Vuex.Store({
  state,
  mutations,
  actions
})