<template>
    <div id="content">
        <div class="city_body">
				<div class="city_list">
                    <Loading v-if="isLoading" />
                    <Scroller v-else ref="city_list">
                    <div>
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="item in hotCity" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
						</ul>
					</div>
                    <!-- Vue中直接操作DOM元素，就必须用ref属性进行注册 -->
					<div class="city_sort" ref="city_sort">
						<div v-for="item in cityList" :key="item.id">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="items in item.list" :key="items.id" @tap="handleToCity(items.nm,items.id)">{{items.nm}}</li>
							</ul>
						</div>
					</div>
                    </div>
                    </Scroller>
				</div>
            <div class="city_index">
                <ul>
                    <li @touchstart="handleToIndex(index)" v-for="(item,index) in cityList" :key="item.index">{{item.index}}</li>
                </ul>
            </div>
		</div>
    </div>
</template>
<script>
export default {
    name:'City',
    data(){
        return{
            cityData:[],
            cityList : [],
            hotCity : [],
            isLoading:true
        }
    },
    mounted(){
        //从localSorage取出来
        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');
        if(cityList && hotList){
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        }
        this.axios.get('/api/cityList').then((res)=>{
            if(res.data.msg == 'ok'){
                this.cityData=res.data.data.cities;
                var {cityList,hotCity}=this.formatCityList(this.cityData);//解析
                this.cityList=cityList;//映射
                this.hotCity=hotCity;
                // console.log(res.data.data.cities)
                //[{index : 'A',list : [{nm : '某城',id : 123}]}]
                //把数据转换成这种格式
                this.isLoading = false;
                window.localStorage.setItem('cityList',JSON.stringify(cityList));
                window.localStorage.setItem('hotList', JSON.stringify(hotCity));
                //存入localStorage
            }
        })
    },
    methods: {
        formatCityList(cities){
            var cityList = [];
            var hotCity = [];
            for(var i=0;i<cities.length;i++){
                if(cities[i].isHot ===1){
                    hotCity.push(cities[i])
                }
            }
            for(var i=0;i<cities.length;i++){
                var firstLetter = cities[i].py.substring(0,1).toUpperCase();
                if(toCom(firstLetter)){//新添加index
                    cityList.push({index : firstLetter,list : [{nm:cities[i].nm , id : cities[i].id}]})
                }else{//如果toCom(firstLetter) return累加到index中
                    for(var j=0;j<cityList.length;j++){
                        if(cityList[j].index === firstLetter){
                            cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                        }
                    }
                }
            }
            //城市排序
            cityList.sort((n1,n2)=>{
                if(n1.index > n2.index){
                    return 1;
                }else if(n1.index < n2.index){
                    return -1;
                }else{
                    return 0;
                }
            })
            function toCom(firstLetter){
                for(var i=0;i<cityList.length;i++){
                    if(cityList[i].index === firstLetter){//如果匹配上就添加
                        return false;
                    }
                }
                return true;
            }
            // console.log(cityList)
            // console.log(hotCity)
            return {cityList,hotCity}
        },
        handleToIndex(index){
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            // this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop;
            this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
        },
        handleToCity(nm,id){
            this.$store.commit('city/CITY_INFO',{nm,id})
            //传递city下的city/CITY_INFO,传递值为nm,id
            window.localStorage.setItem('nowNm',nm)
            window.localStorage.setItem('nowId',id)
            this.$router.push('/movie/nowplaying')
        }
    },
}
</script>
<style lang="less" scoped>
#content .city_body{ margin-top: 0; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ margin-top: -40px; width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>