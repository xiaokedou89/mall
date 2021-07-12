<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']" class="tab-control"       @tabClick="tabClick" v-show="isTabFixed" ref="tabControl1"/>
        <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
            <recommend-view :recommends="recommends" />
            <feature-view />
            <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
            <goods-list :goods="goods[currentType].list" />
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop" />
    </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper.vue';
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView.vue';

import NavBar from 'components/common/navbar/NavBar.vue';
import Scroll from 'components/common/scroll/Scroll.vue';

import TabControl from 'components/content/tabControl/TabControl.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
import BackTop from 'components/content/backTop/BackTop.vue';

import {getHomeMultidata,getHomeGoods} from 'network/home.js';
import {debounce} from 'common/utils.js';

export default {
    name: 'Home',
    components: {
        NavBar, 
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data(){
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': {
                    page: 0,
                    list: []
                },
                'new': {
                    page: 0,
                    list: []
                },
                'sell': {
                    page: 0,
                    list: []
                }
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0
        }
    },
    created(){
        this.getHomeMultidata();
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
        
       
    },
    mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,100);
        //接受GoodsListItem里img的onload里发射的事件总线自定义回调函数
        this.$bus.$on('itemImgLoad',() => {
            refresh();
        });
    },
    activated(){
        this.$refs.scroll.scroll.scrollTo(0,this.saveY,0);
        this.$refs.scroll.scroll.refresh();
    },
    deactivated(){
        this.saveY = this.$refs.scroll.scroll.y;
    },
    methods: {
        swiperImgLoad(){
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        },
        loadMore(){
            this.getHomeGoods(this.currentType);
        },
        contentScroll(position){
            this.isShowBackTop = (-position.y) > 1000;

            this.isTabFixed = (-position.y) > this.tabOffsetTop;
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0,500);
        },
        tabClick(index){
            switch (index){
                case 0: 
                    this.currentType = 'pop';
                    break;
                case 1:
                    this.currentType = 'new';
                    break;
                case 2:
                    this.currentType = 'sell';
                    break;
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        getHomeMultidata(){
            getHomeMultidata().then(
                res => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                }
            );
        },
        getHomeGoods(type){
            const page = this.goods[type].page + 1;
            getHomeGoods(type,page).then(res => {
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;
            });
        }
    }
}
</script>
<style scoped>
#home {
    height: 100vh;
    position: relative;
}
.home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
}
/* .tab-control {
    position: sticky;
    z-index: 1;
    top: 44px;
    background-color: #fff;
} */
.content {
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
   overflow:hidden;
}
.tab-control {
    position: relative;
    z-index: 2;
}
</style>