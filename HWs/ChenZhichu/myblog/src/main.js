
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'amfe-flexible'
import ElementUI from 'element-ui';
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-tiptap/lib/index.css';
import animated from 'animate.css'

// Vue.use(animated)
Vue.use(ElementUI);

Vue.use(ElementTiptapPlugin, {
  /* 插件配置项 */
  lang: 'zh',
});

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
