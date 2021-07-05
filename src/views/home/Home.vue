<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners" />
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" />
        <goods-list :goods="goods[currentType].list" />
        <ul>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
            <li>libieo</li>
        </ul>
    </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper.vue';
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView.vue';

import NavBar from 'components/common/navbar/NavBar.vue';

import TabControl from 'components/content/tabControl/TabControl.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';

import {getHomeMultidata,getHomeGoods} from 'network/home.js';
export default {
    name: 'Home',
    components: {
        NavBar, 
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList
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
            currentType: 'pop'
        }
    },
    created(){
        this.getHomeMultidata();
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    methods: {
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
    padding-top: 44px;
}
.home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
}
.tab-control {
    position: sticky;
    z-index: 1;
    top: 44px;
    background-color: #fff;
}
</style>