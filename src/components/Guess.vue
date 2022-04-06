<template>
  <div class="guess">
    <span class="title">
      Em qual versículo da bíblia podemos encontrar o texto acima?
    </span>

    <guess-table :guesses="guesses"></guess-table>

    <div class="button-guess">
      <main-button>Adivinhar</main-button>
    </div>
  </div>
</template>

<script>
import GuessTable from "@/components/GuessTable";
import MainButton from "@/components/MainButton";

export default {
  name: "Guess",

  components: { GuessTable, MainButton },

  data: () => ({
    guesses: [{}, {}, {}, {}, {}],
  }),
};
</script>

<style lang="scss">
@import "Guess.scss";
</style>
