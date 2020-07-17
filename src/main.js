import Vue from 'vue'
import main from './main.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select } from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import Router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.use(ElementUI);
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  render: h => h(main),
  Router,
  template: '<App/>'
}).$mount('#app')