<template>
    <div id="main">
        <Header title="猫咪影院" />
        <div id="content">
            <div class="cinema_menu">
				<router-link tag="div" to="/cinema/allcity" class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<router-link tag="div" to="/cinema/brand" class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<router-link tag="div" to="/cinema/feature" class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i>
				</router-link>
			</div>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <TabBar />
    </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
export default {
    name:'Cinema',
    components:{
        Header,TabBar
    },
    data(){
        return{

        }
    }
}
</script>

<style lang="less" scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
.cinema_menu .router-link-active{color:#f03d37}
</style>