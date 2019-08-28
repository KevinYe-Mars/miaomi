<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
        <!-- 父组件在子组件中插入内容
        必须要在子组件中声明slot标签
        如果子组件模板不包含<slot>插口
        父组件的内容<p>{{msg}}</p>将会被丢弃 -->
    </div>
</template>
<script>
// 高度不超过父容器的高度，是不能滚动的，而它一旦超过了父容器的高度
// 我们就可以滚动内容区了，这就是 better-scroll 的滚动原理
import BScroll from 'better-scroll';
export default {
    name:'Scroller',
    //组件通讯
    props:{
        handleToScroll : {
            type : Function,
            default : function(){}
        },
        handleToTouchEnd : {
            type : Function,
            default : function(){}
        }
    },
    data(){
        return{
        }
    },
    mounted(){
        var scroll = new BScroll(this.$refs.wrapper,{
            tap : true,//开启点击事件
            probeType: 1,//滚动时派发scroll
        });//这个方法内置两个参数 1，包裹的容器 2，配置对象
        this.scroll = scroll;
        scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos)
        });
        scroll.on('touchEnd',(pos)=>{
            this.handleToTouchEnd(pos)
        });
    },
    methods:{
        toScrollTop(y){
            this.scroll.scrollTo(0,y);
        }
    }
}
</script>
<style lang="less" scoped>
.wrapper{height:100%}
</style>