<template>
    <div id="detailContainer" class="solide_enter_active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <Loading v-if="loading" />
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg" :style="{'background-image':'url('+detailData.img.replace(/w\.h/,'148.208')+')'}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailData.img | setWH('148.208')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{detailData.nm}}</h2>
						<p>{{ detailData.enm }}</p>
						<p>{{ detailData.sc }}</p>
						<p>{{ detailData.cat }}</p>
						<p>{{ detailData.src }} / {{detailData.dur }}</p>
						<p>{{ detailData.pubDesc }}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{detailData.dra}}</p>
			</div>
            <!-- ref="detail_player"这样才能操作DOM节点 -->
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(item,index) in detailData.photos" :key="index">
						<div>
							<img :src="item | setWH('200.200')" alt="">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import Header from '@/components/Header'
import { setTimeout } from 'timers';
export default {
    name:'Detail',
    components:{Header},
    props:['id'],//接收路由props解耦的id
    data(){
        return{
            detailData:[],
            loading:true
        }
    },
    mounted(){
        this.axios.get('/api/detailmovie?movieId='+this.id)
        .then((res)=>{
            if(res.data.msg == 'ok'){
                this.loading=false;
                this.detailData=res.data.data.detailMovie;
                this.$nextTick(()=>{
                    new Swiper(this.$refs.detail_player, {
                    slidesPerView : 'auto',
                    freeMode : true,
                    freeModeSticky: true
                    });
                })
            }
        })
    },
    methods:{
        handleToBack(){
            this.$router.back()
        }
    }
}
</script>
<style lang="less" scoped>
#detailContainer{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    min-height: 100%;
    background-color: #fff;
}
#detailContainer.solide_enter_active{
    animation: .5s slideMove
}
@keyframes slideMove {
    0%{ transform: translateX(100%)}
    100%{ transform: translateX(0%)}
}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}

#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background:  0 40%;filter: blur(4px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
</style>