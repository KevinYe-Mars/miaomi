<template>
  <div>
    <header id="header">
      <h1>登录猫咪</h1>
    </header>
    <div id="content">
      <div class="login_body">
        <div>
          <input v-model="username" class="login_text" type="text" placeholder="账户名/手机号/Email" />
        </div>
        <div>
          <input v-model="password" class="login_text" type="password" placeholder="请输入您的密码" />
        </div>
        <div>
          <!-- 图形验证码 -->
          <input type="text" class="login_text" v-model="verifyImg" placeholder="请输入您的验证码" /><img @touchstart="handleToVerifyImg" src="/api2/users/verifyImg" />
        </div>
        <div class="login_btn">
          <input type="submit" value="登录" @touchstart="handleToLogin" />
        </div>
        <div class="login_link">
          <router-link to="/mine/register">立即注册</router-link>
          <router-link to="/mine/findPassword">找回密码</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {MsgBox} from '@/components/JS'
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      verifyImg:""
    };
  },
  methods: {
    handleToLogin() {
      //请求本地接口数据
      this.axios.post('/api2/users/login', {
          //传参
          username: this.username,
          password: this.password,
          verifyImg : this.verifyImg
        }).then(res => {
          console.log(res)
		    	var _this=this;
          if(res.data.status == 0){
            MsgBox({
            title:'登录',
            content:'登陆成功',
            ok:'确定',
            handleOk(){
					_this.$router.push('/mine/center')
				}
			})
		  }else{
			MsgBox({
				  title:'登录',
				  content:res.data.msg,
				  ok:'确定'
			  })  
		  }
        });
    },
    // 点击更新验证码
    handleToVerifyImg(ev){
      ev.target.src = '/api2/users/verifyImg?'+Math.random();
    }
  }
};
</script>
<style lang="less" scoped>
#header {
  width: 100%;
  height: 50px;
  color: #e54847;
  background: #ffffff;
  border-bottom: 1px solid #e54847;
  position: relative;
  border-radius: 10px;
}
#header h1 {
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  font-weight: normal;
}
#header i {
  position: absolute;
  left: 5px;
  top: 50%;
  margin-top: -13px;
  font-size: 26px;
}

#content .login_body {
  width: 100%;
}
.login_body .login_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
  border-radius: 10px;
}
.login_body .login_btn {
  height: 50px;
  margin: 10px 0;
}
.login_body .login_btn input {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  border: none;
  display: block;
  color: #e54847;
  font-size: 20px;
  border-bottom: 1px solid #e54847;
  &:hover {
    color: #fff;
    background-color: #e54847;
    cursor: pointer;
    transition: all 200ms linear;
  }
}
.login_body .login_link {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.login_body .login_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #666;
  &:hover {
    color: #e54847;
  }
}
</style>