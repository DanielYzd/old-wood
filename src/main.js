// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import http from './util/http.js'
import api from './util/api.js'
// import 'element-ui/lib/theme-chalk/index.css'
import './element-variables.scss'
import './less/common.less'
import vueQuillEditor from 'vue-quill-editor' // 引入富文本工具
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'


Vue.config.productionTip = false
Vue.prototype.http = http
Vue.prototype.api = api
Vue.use(ElementUI, { size: 'normal', zIndex: 2000 })
Vue.use(vueQuillEditor)
var option = {
    fullscreenEl: true,
    // showHideOpacity: false,
    bgOpacity: 1,
}
Vue.use(preview, option)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})