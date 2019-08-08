<template>
    <div class="index">
        <div class="header">首页</div>
        <p>{{appid}}</p>
        <div class="content_main">
            <ul>
              <li><button @click="logins">点击登录</button></li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {getLogin} from '../../ulit/interfaces'
export default {
  name: 'index',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    // ...mapState(['appid', 'user']) // 参数是数组
    ...mapState({
      appid: state => state.appid,
      user: (state) => {
        console.log(state)
      }
    })
  },
  created () {
  },
  methods: {
    logins () {
      let _this = this
      getLogin().then(() => {
        console.log(65656)
        _this.$store.commit('addToken', 'eyJleHAiOjE1MTYzNDIxMjAsInN1YiI6ImNhbXNfYWRtaW5fZGV2Iiwi')
        _this.$router.push({name: 'Instruction'})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body,ul,li{
    padding: 0;
    margin: 0;
  }
  input {
    background: none;
    outline: none;
    border: none;
  }
  .header{
    text-align: center;
  }
  .content_main{
    width: 100%;
  }
  .content_main ul{
    width: 100%;
  }
  .content_main ul li{
    margin-top: 10px;
  }
  .content_main ul li input{
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border:1px solid #e5e5e5;
    padding: 0px 5px 0px 15px;
    border-radius: 3px;
    width: 75%;
  }
</style>
