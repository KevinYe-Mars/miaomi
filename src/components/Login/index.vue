<template>
    <div>
        <header id="header">
            <h1>登录猫咪</h1>
        </header>
        <div id="content">
			<div class="login_body">
				<div>
					<input class="login_text" type="text" placeHolder="账户名/手机号/Email" >
				</div>
				<div>
					<input class="login_text" type="password" placeHolder="请输入您的密码" >
				</div>
				<div class="login_btn">
					<input type="submit" value="登录">
				</div>
				<div class="login_link">
					<a href="#">立即注册</a>
					<a href="#">找回密码</a>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
export default {
    name:'Login',
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
#header{width:100%; height:50px; color: #e54847; background: #ffffff; border-bottom: 1px solid #e54847; position: relative; border-radius: 10px;}
#header h1{ font-size: 18px; text-align: center; line-height: 50px; font-weight: normal; }
#header i{ position: absolute; left: 5px; top: 50%; margin-top: -13px; font-size: 26px;}

#content .login_body{  width:100%;}
.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;border-radius: 10px;}
.login_body .login_btn{ height:50px; margin:10px 0;}
.login_body .login_btn input{ width:100%; height:100%; background:#fff; border-radius: 10px; border:none; display: block; color:#e54847; font-size: 20px;border-bottom: 1px solid #e54847;&:hover{color:#fff;background-color: #e54847;cursor: pointer;transition: all 200ms linear}}
.login_body .login_link{ display: flex; justify-content:space-between;padding: 0 10px;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#666;&:hover{color: #e54847}}
</style>