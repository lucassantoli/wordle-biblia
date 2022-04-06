import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },
  theme: {
    themes: {
      light: {
        primary: "#4A3C25",
        secondary: "#F4E7D4",
      },
    },
  },
});
