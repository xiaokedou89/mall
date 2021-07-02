import {request} from './request.js';

//首页发送homeMultidata请求,并返回结果promise
export function getHomeMultidata(){
    return request({
        url: '/home/multidata'
    });
};