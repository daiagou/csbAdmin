import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import routes from './routes'

Vue.config.productionTip = false




// Vue.use(ElementUI)
import i18n from './common/lang' // Internationalization
Vue.use(ElementUI,{
    i18n: (key, value) => i18n.t(key, value)
})


Vue.use(VueRouter)


const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')



