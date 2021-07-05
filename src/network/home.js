import {request} from './request.js';

//首页发送homeMultidata请求,并返回结果promise
export function getHomeMultidata(){
    return request({
        url: '/home/multidata'
    });
};

//首页商品列表数据请求
export function getHomeGoods(type,page){
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    });
}