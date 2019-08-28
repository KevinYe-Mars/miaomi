<template>
    <div class="movie_body" ref="movie_body">
        <!-- ref设置可以进行DOM操作 -->
        <Loading v-if="isLoading" />
        <Scroller v-else :handleToScroll='handleToScroll' :handleToTouchEnd='handleToTouchEnd'>
            <ul>
                <li class="pullDown">{{ pullDownMsg }}</li>
                <li v-for="item in movieList" :key="item.id">
                    <div class="pic_show" @tap="handletoDetali"><img :src="item.img |setWH('130.180')"></div>
                    <div class="info_list">
                        <h2> {{item.nm}} <img style="height:14px" v-if="item.version" src="@/assets/max.png"/></h2>
                        <p>观众评 <span style="color:#f1a712;font-weight:600">{{item.sc}}</span></p>
                        <p>主演: {{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>
<script>
export default {
    name:'NowPlaying',
    data(){
        return{
            movieList:[],
            pullDownMsg:'',
            isLoading:true,
            prevCityId:-1
        }
    },
    activated(){
        var cityId = this.$store.state.city.id;//状态管理的id
        if(this.prevCityId == cityId){return;}
        this.isLoading = true;
        this.axios.get('/api/movieOnInfoList?cityId='+cityId)
        .then((res)=>{
            if(res.data.msg == 'ok'){
                this.movieList = res.data.data.movieList;
                this.isLoading = false;
                this.prevCityId = cityId;
                // this.$nextTick(()=>{//保证数据渲染完成后触发这个方法的回调
                //     var scroll = new BScroll(this.$refs.movie_body,{
                //         tap : true,//开启点击事件
                //         probeType: 1,//滚动时派发scroll
                //     });//这个方法内置两个参数 1，包裹的容器 2，配置对象
                //     scroll.on('scroll',(pos)=>{
                //         if(pos.y>30){
                //             this.pullDownMsg = "正在更新中"
                //         }
                //     });
                //     scroll.on('touchEnd',(pos)=>{
                //         if(pos.y>30){
                //             this.axios.get('/api/movieOnInfoList?cityId=10')
                //             .then((res)=>{
                //                 if(res.data.msg == 'ok'){
                //                     this.pullDownMsg = "更新完成"
                //                     setTimeout(() => {
                //                         this.movieList = res.data.data.movieList;
                //                         this.pullDownMsg = ""
                //                     }, 200);
                //                 }
                //             })
                //         }
                //     })
                // });
            }
        })
    },
    methods:{
        handletoDetali(){
        console.log('handletoDetali')
        },
        handleToScroll(pos){
            if(pos.y>30){
                this.pullDownMsg = "正在更新中"
            }
        },
        handleToTouchEnd(pos){
            if(pos.y>30){
                this.axios.get('/api/movieOnInfoList?cityId=10')
                .then((res)=>{
                    if(res.data.msg == 'ok'){
                        this.pullDownMsg = "更新完成"
                        setTimeout(() => {
                            this.movieList = res.data.data.movieList;
                            this.pullDownMsg = ""
                        }, 200);
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{padding: 0;margin: 0;border: 0}
</style>