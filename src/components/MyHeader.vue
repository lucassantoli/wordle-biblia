<template>
  <header>
    <span>Versooo</span>
    <v-switch
      v-if="unlockUnlimited"
      v-model="endlessGame"
      label="Jogo infinito"
      hide-details
    ></v-switch>
    <div class="icon" v-if="false">
      <v-icon color="primary">mdi-help</v-icon>
    </div>
  </header>
</template>

<script>
export default {
  name: "MyHeader",

  data: () => ({
    endlessGame: false,
  }),

  watch: {
    endlessGame: function (value) {
      localStorage.setItem("endlessgame", value);
      if (value) {
        localStorage.removeItem("hasGuessed");
      }
    },
  },

  props: {
    unlockUnlimited: Boolean,
  },

  created() {
    this.endlessGame = JSON.parse(localStorage.getItem("endlessgame") ?? false);
  },
};
</script>

<style lang="scss">
@import "MyHeader.scss";
</style>
