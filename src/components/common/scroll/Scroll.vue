<template>
    <div ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            scroll: null
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        });
        this.scroll.on('scroll',(position) => {
            this.$emit('scroll',position);
        });
        this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp');
            this.scroll.finishPullUp();
        });
    },
    methods: {
        scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time);
        },
        refresh(){
            // console.log('show me the num');
            this.scroll.refresh();
        }
    }
}
</script>
<style scoped>

</style>