<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TabBarItem',
    props: {
        path: String,
        activeColor: {
            type: String,
            default: 'deepPink'
        }
    },
    computed: {
        isActive(){
            return this.$route.path.includes(this.path);
        },
        activeStyle(){
            return this.isActive ? {color: this.activeColor} : {};
        }
    },
    methods: {
        itemClick(){
            this.$router.replace(this.path);
        }
    }
}
</script>
<style scoped>
.tab-bar-item {
    height: 49px;
    flex: 1;
    text-align: center;
    font-size: 14px;
}
.tab-bar-item img {
    width: 24px;
    height: 24px;
    margin: 3px 0 2px 0;
    vertical-align: middle;
}
</style>