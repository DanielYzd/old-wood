import axios from 'axios';
import { Message } from 'element-ui';
import { Loading } from 'element-ui';
import Router from '../router/index.js'

axios.defaults.withCredentials = true
let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        // spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}
let needLoadingRequestCount = 0

export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}
axios.interceptors.request.use(config => {
    if (config.showLoading != false) {
        showFullScreenLoading()
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    tryHideFullScreenLoading()
    return response
}, error => {
    tryHideFullScreenLoading()
    return Promise.reject(error)
})

function jsonToFormData(json) {
    let data = '';
    const keys = Object.keys(json);
    keys.forEach((key, i) => {
        i === (keys.length - 1) ? data += `${key}=${json[key]}` : data += `${key}=${json[key]}&`
    });
    return data;
}

function errorState(response) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
            // 如果不需要除了data之外的数据，可以直接 return response.data
    } else {
        Message({
            message: '网络连接超时,请检查网络',
            type: 'error'
        });
    }
}

function successState(res) {
    if (res.data.code != "0000") {
        Message({ message: res.data.msg, type: "error" });
        if (res.data.code == "0101") {
            Router.push('/')
        }
    }
}

const httpServer = (opts, data) => {
    let cancel, promiseArr = {}
    axios.interceptors.request.use(config => {
        //发起请求时，取消掉当前正在进行的相同请求
        if (promiseArr[config.url]) {
            promiseArr[config.url]('操作取消')
            promiseArr[config.url] = cancel
        } else {
            promiseArr[config.url] = cancel
        }
        return config
    }, error => {
        return Promise.reject(error)
    })
    let sessionId = "";
    if (window.localStorage.getItem('sessionId')) {
        sessionId = window.localStorage.getItem('sessionId');
    }
    if (opts.tag) {
        let options = {
            method: opts.method,
            url: opts.url,
            showLoading: opts.showLoading,
            data,
            headers: {
                'SESSION_ID': sessionId,
                "Content-Type": "multipart/form-data",
            },
        }
        let promise = new Promise(function(resolve, reject) {
            axios(options).then(
                (res) => {
                    successState(res);
                    resolve(res);
                }
            ).catch(
                (response) => {
                    errorState(response)
                    reject(response)
                }
            )

        })
        return promise
    } else {
        let httpDefaultOpts = { //http默认配置
            method: opts.method,
            url: opts.url,
            showLoading: opts.showLoading,
            timeout: 10000,
            data: JSON.stringify(data),
            params: data,
            headers: opts.method == 'get' ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
                'SESSION_ID': sessionId

            } : {
                'SESSION_ID': sessionId,
                "Accept": "application/json",
                'X-Requested-With': 'XMLHttpRequest',
                "Content-Type": "application/json;charset=UTF-8",
            }
        };
        if (opts.method == 'get') {
            delete httpDefaultOpts.data;
        } else {
            delete httpDefaultOpts.params;

        }
        let promise = new Promise(function(resolve, reject) {
            axios(httpDefaultOpts).then(
                (res) => {
                    // debugger;
                    successState(res);
                    resolve(res);
                }
            ).catch(
                (response) => {
                    errorState(response)
                    reject(response)
                }
            )

        })
        return promise
    }
}

export default httpServer