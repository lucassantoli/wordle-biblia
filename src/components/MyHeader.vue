<template>
  <header>
    <span>Versooo</span>

    <main-button class="button back-to-daily" @click="backToDaily" v-if="isEndless">
      <v-icon>mdi-arrow-left</v-icon>
      <span>Jogo diário</span>
    </main-button>

    <div class="game-counter" v-else @click="() => unlockEndless++">
      <span v-for="(game, index) in games" :key="index" :class="['unit', getColor(game, index)]">
        {{ index + 1 }}
      </span>
    </div>
  </header>
</template>

<script>
import MainButton from "@/components/MainButton";

export default {
  name: "MyHeader",

  components: {
    MainButton,
  },

  data: () => ({
    unlockEndless: 0,
  }),

  props: {
    currGame: Number,
    games: Array,
    isEndless: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getColor: function (game, index) {
      if (index > this.currGame) return "off";
      else if (game.correct == null) return "on";
      else if (game.correct == true) return "green";
      else return "red";
    },

    backToDaily: function () {
      this.$router.push({ name: "Bible" });
    },
  },

  watch: {
    unlockEndless: function (value) {
      if (value >= 5) this.$router.push({ name: "Infinite" });
    },
  },
};
</script>

<style lang="scss">
@import "MyHeader.scss";
</style>
