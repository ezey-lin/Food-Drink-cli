import Vue from 'vue';
import VueSweetAlert from 'vue-sweetalert';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import './bus';
import currencyFilter from './filters/currency';
import VeeValidate from 'vee-validate'


// import $ from 'jquery';
axios.defaults.withCredentials = true;
Vue.use(VeeValidate)
Vue.use(VueSweetAlert)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('Loading',Loading)
Vue.filter('currency',currencyFilter);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
  console.log('to',to,'from',from,'next',next)
  if(to.meta.requiresAuth){
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      // const vm = this;
      axios.post(api).then((response) => {
      console.log(response.data)
      if(response.data.success){
          next();
      }else{
        next({
          path:'/login'
        })
      }
    })
  }else{
    next();
  }
})