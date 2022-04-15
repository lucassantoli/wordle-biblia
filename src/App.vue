<template>
  <v-app class="app">
    <span v-if="isLoading">Carregando...</span>
    <router-view />
    <main-snackbar ref="snackbar" />
  </v-app>
</template>

<script>
import MainSnackbar from "@/components/MainSnackbar";

export default {
  name: "App",

  data: () => ({
    isLoading: true,
  }),

  components: {
    MainSnackbar,
  },

  mounted() {
    this.isLoading = false;
    this.$root.snackbar = this.$refs.snackbar;
    let hasScrolled = JSON.parse(localStorage.getItem("hasScrolled"));
    if (hasScrolled == null) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 5000);
      localStorage.setItem("hasScrolled", 0);
    } else {
      if (hasScrolled < 3) {
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 5000);
        localStorage.setItem("hasScrolled", hasScrolled + 1);
      }
    }
  },
};
</script>

<style lang="scss">
@import "App.scss";
</style>
