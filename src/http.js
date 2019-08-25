import axios from 'axios';


import { Message, Loading } from 'element-ui';

let loading; //定义loading变量
function startLoading() { //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close();
}

axios.interceptors.request.use(config => {
    // 加载
    startLoading();
    return config;
}, error => {
    return Promise.reject(error);
})

// 解构
axios.interceptors.response.use(response => {
    endLoading();
    return response;
}, err => {
    endLoading();
    Message.error(error.response.data);
    return Promise.reject(error);
})
export default axios;