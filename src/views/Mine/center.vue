<template>
    <div>
        <div>个人中心:</div>
        <div>当前用户:{{$store.state.user.name}}<a href="javascript:;" @touchstart="handleToLogout">退出</a></div>
        <div v-if="$store.state.user.isAdmin">用户身份:管理员<a href="/admin" target="_blank">进入后台管理系统</a></div>
        <div v-else>用户身份:普通会员</div>
        <div>  
            <input type="file" name="file" value="上传头像" @change="handleToUpload">
            <img class="userHead" :src="$store.state.user.userHead">
            <!-- 用户头像 -->
        </div>
    </div>
</template>
<script>
import { MsgBox } from '@/components/JS';
//因导航守卫不能有this事件，所以要引入axios
import axios from 'axios';
export default {
    name:'center',
    data(){
        return{

        }
    },
    methods:{
        handleToLogout(){
            this.axios.get('/api2/users/logout')
            .then((res)=>{
                // console.log(res)
                if(res.data.status == 0){
                    //退出时将状态管理的name值置为空,管理员权限也置为false
                    //删除本地存储
                    localStorage.removeItem('name');
                    localStorage.removeItem('isAdmin');
                    this.$router.push('/mine/login')                            //用户头像
                    this.$store.commit('user/USER_NAME',{name:'',isAdmin:false, userHead:''})
                }
            }) 
        },
         //上传用户头像
         handleToUpload(ev){
            var file = ev.target.files[0]; //拿到文件
            var param = new FormData(); //创建的实例可以把数据存储起来给后台
            param.append('file' , file , file.name); //添加数据
            //指定上传文件头信息
            var config = {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            };
            this.axios.post('/api2/users/uploadUserHead',param , config).then((res)=>{
            console.log(res)
            var status = res.data.status;
            var This = this;
            if( status === 0 ){
                MsgBox({
                    title : '信息',
                    content : '上传头像成功',
                    ok : '确定',
                    handleOk(){
                        //更新状态管理
                        This.$store.commit('user/USER_NAME',{
                            name : This.$store.state.user.name , 
                            isAdmin : This.$store.state.user.isAdmin ,
                            userHead : res.data.data.userHead  + '?' + Math.random(),
                        });
                    }
                });
            }
            else{
                MsgBox({
                    title : '信息',
                    content : '上传头像失败',
                    ok : '确定'
                });
            }
        });
    }
    },
    //路由守卫
    beforeRouteEnter (to, from, next) {
        //能获取到getUser的内容就代表登录状态
        axios.get('/api2/users/getUser')
        .then((res)=>{
            if(res.data.status == 0){
                next(vm=>{
                    //本地存储让后台能拿到name和isAdmin
                    localStorage.setItem('name',res.data.data.username);
                    localStorage.setItem('isAdmin',res.data.data.isAdmin);
                    //把数据存到状态管理中(vm为回调函数，$store.commit调用user下的USER_NAME进行赋值)
                    vm.$store.commit('user/USER_NAME',{
                        name:res.data.data.username,
                        isAdmin:res.data.data.isAdmin,
                        userHead:res.data.data.userHead, //用户头像    
                    })
                });
            }else{
                next('/mine/login')
            }
        })
    },
   
}
</script>
<style lang="less" scoped>
.userHead{ width:100px; height:100px; border-radius: 50%; overflow: hidden;}
</style>