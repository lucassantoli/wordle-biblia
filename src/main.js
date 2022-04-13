import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

fetch(process.env.BASE_URL + "config.json")
  .then((res) => res.json())
  .then((config) => {
    Vue.prototype.$initialDate = new Date(config.initialDate);

    new Vue({
      vuetify,
      router,
      render: (h) => h(App),
    }).$mount("#app");
  });
