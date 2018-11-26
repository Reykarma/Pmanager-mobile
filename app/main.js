import Vue from 'nativescript-vue'
import App from './components/Taskboard'
import Login from './components/Login'
import VueDevtools from 'nativescript-vue-devtools'
require( "nativescript-localstorage" );

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

localStorage.clear();

if(localStorage.getItem('ID_user')==null){
  new Vue({
  render: h => h('frame', [h(Login)])
  }).$start()
}else{
  new Vue({
  render: h => h('frame', [h(App)])
  }).$start()
}
