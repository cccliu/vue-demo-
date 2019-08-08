import cookie from 'vue-cookies'
export default {
  getToken (key) {
    return cookie.get(key)
  },
  setToken (key, value) {
    return cookie.set('token', value)
  }
}
