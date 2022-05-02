import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

fetch(process.env.BASE_URL + "config-prod.json")
  .then((res) => res.json())
  .then((config) => {
    Vue.prototype.$initialDate = new Date(config.initialDate);
    Vue.prototype.$hardmode = config.hardmode;

    new Vue({
      vuetify,
      router,
      render: (h) => h(App),
    }).$mount("#app");
  });
