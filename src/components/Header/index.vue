<template>
    <div>
        <header id="header"> 
			<slot></slot> <h1>{{title}}</h1>
        <!-- 父组件在子组件中插入内容
        必须要在子组件中声明slot标签
        如果子组件模板不包含<slot>插口
        父组件的内容<p>{{msg}}</p>将会被丢弃 -->
		</header>
    </div>
</template>
<script>
export default {
    name:'Header',
    props:{
        title:{
            type:String,
            default:' 猫咪电影'
        }
    },
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
#header{width:100%; height:50px; color: #fff; background: #e54847; border-bottom: 1px solid #e54847; position: relative;}
#header h1{ font-size: 18px; text-align: center; line-height: 50px; font-weight: normal; }
#header i{ position: absolute; left: 5px; top: 50%; margin-top: -13px; font-size: 26px;}

</style>