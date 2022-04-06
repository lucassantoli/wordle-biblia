<template>
  <div class="guess-table">
    <div class="header-guess">
      <div class="header-column book">Livro</div>
      <div class="header-column chapter">Capítulo</div>
      <div class="header-column verse">Versículo</div>
      <div class="header-column proximity">Proximidade</div>
    </div>
    <div
      class="individual-guess"
      v-for="(guess, index) in guesses"
      :key="index"
    >
      <div class="individual-guess" v-if="checkIfEmpty(guess)">
        <div class="column book">{{ guess.book }}</div>
        <div class="column chapter">{{ guess.chapter }}</div>
        <div class="column verse">{{ guess.verse }}</div>
        <div class="column proximity">{{ guess.proximity }}</div>
      </div>
    </div>

    <div class="field-guess" v-if="countAlreadyGuessed < 6">
      <v-select
        class="column book"
        :items="books"
        outlined
        dense
        hide-details
      ></v-select>
      <v-select
        class="column chapter"
        :items="generateNumbers(10)"
        outlined
        dense
        hide-details
      ></v-select>
      <v-select
        class="column verse"
        :items="generateNumbers(10)"
        outlined
        dense
        hide-details
      ></v-select>
      <div class="column proximity">&nbsp;</div>
    </div>
  </div>
</template>

<script>
import { books } from "@/data/bible.js";

export default {
  name: "GuessTable",

  props: {
    guesses: Array,
    correct: Object,
  },

  data: () => ({
    books,
  }),

  computed: {
    countAlreadyGuessed: function () {
      return this.guesses.filter((guess) => Object.keys(guess).length > 0)
        .length;
    },
  },

  methods: {
    checkIfEmpty(obj) {
      return Object.keys(obj).length > 0;
    },

    generateNumbers(n) {
      return [...Array(n).keys()];
    },
  },
};
</script>

<style lang="scss">
@import "GuessTable.scss";
</style>
