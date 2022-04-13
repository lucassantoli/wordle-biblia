<template>
  <div class="guess">
    <span class="title">
      Em qual versículo da bíblia podemos encontrar o texto acima?
    </span>

    <!-- Modelo 1 -->
    <div class="guess-inputs">
      <my-option
        v-for="(option, index) in options"
        :key="index"
        :option="option"
        @click="handleSelect"
        :disabled="hasGuessed"
      ></my-option>

      <main-button
        class="button-guess"
        :color="getColorButton"
        @click="handleGuess"
        :result="result"
      >
        {{ getContentButton }}
      </main-button>
    </div>

    <!-- Modelo 2 -->
    <!-- <guess-table :guesses="guesses"></guess-table>

    <hr />

    <div class="guess-inputs">
      <span class="title">Seu palpite</span>

      <div class="guess-input col-12">
        <span class="label">Livro:</span>
        <v-select
          class="book"
          :items="books"
          outlined
          dense
          hide-details
        ></v-select>
      </div>

      <div class="row">
        <div class="guess-input">
          <span class="label">Capítulo:</span>
          <v-select
            class="chapter"
            :items="generateNumbers(10)"
            outlined
            dense
            hide-details
          ></v-select>
        </div>

        <div class="guess-input">
          <span class="label">Versículo:</span>
          <v-select
            class="verse"
            :items="generateNumbers(10)"
            outlined
            dense
            hide-details
          ></v-select>
        </div>
      </div>

      <main-button class="button-guess">Adivinhar</main-button>
    </div>-->
  </div>
</template>

<script>
// import { books } from "@/data/bible.js";

//import GuessTable from "@/components/GuessTable";
import MainButton from "@/components/MainButton";
import MyOption from "@/components/MyOption";

export default {
  name: "Guess",

  components: {
    //GuessTable,
    MainButton,
    MyOption,
  },

  data: () => ({
    // books,
    hasGuessed: false,
    result: null,
    guesses: [{}, {}, {}, {}, {}],
  }),

  props: {
    options: Array,
  },

  methods: {
    generateNumbers(n) {
      return [...Array(n).keys()];
    },

    handleSelect(event) {
      this.options.forEach((option) => {
        if (option.ref === event.ref) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      });
    },

    handleGuess() {
      let option = this.options.find((op) => op.selected);
      if (option != undefined) {
        this.hasGuessed = true;
        this.result = option.isCorrect;
      }
    },
  },

  computed: {
    getColorButton: function () {
      if (this.result == null) {
        return "primary";
      } else if (this.result == true) {
        return "success";
      } else {
        return "error";
      }
    },

    getContentButton: function () {
      if (this.result == null) {
        return "ADIVINHAR";
      } else if (this.result == true) {
        return "CORRETO";
      } else {
        return "ERRADO";
      }
    },
  },
};
</script>

<style lang="scss">
@import "Guess.scss";
</style>
