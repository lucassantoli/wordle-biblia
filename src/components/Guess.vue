<template>
  <div class="guess">
    <span class="title"> Em qual versículo da bíblia podemos encontrar o texto acima? </span>

    <div class="timer" v-if="!isEndlessGame">
      {{ getFormattedTime }}
    </div>

    <!-- Modelo 1 -->
    <div class="guess-inputs">
      <my-option
        v-for="(option, index) in options"
        :key="index"
        :option="option"
        @click="handleSelect"
        :disabled="hasGuessed"
      ></my-option>

      <div class="buttons">
        <main-button
          class="button button-guess"
          :color="getColorButton"
          @click="handleGuess"
          :result="result"
        >
          {{ getContentButton }}
        </main-button>
        <main-icon-button
          v-if="isEndlessGame && hasGuessed"
          class="button button-aux"
          color="primary"
          icon="mdi-reload"
          @click="handleReload"
        ></main-icon-button>
        <main-icon-button
          v-if="!isEndlessGame && hasGuessed"
          class="button button-aux"
          color="primary"
          icon="mdi-share-variant"
          @click="handleShare"
        ></main-icon-button>
      </div>
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
import MainIconButton from "@/components/MainIconButton";

export default {
  name: "Guess",

  components: {
    //GuessTable,
    MainButton,
    MyOption,
    MainIconButton,
  },

  data: () => ({
    // books,
    hasGuessed: false,
    result: null,
    timerInterval: null,
    countTime: 0,
    //guesses: [{}, {}, {}, {}, {}],
    isEndlessGame: false,
  }),

  props: {
    options: Array,
    previousGuess: Boolean,
    previousTime: String,
    daysAfter: Number,
  },

  watch: {
    previousGuess: function (value) {
      if (value) {
        this.handleGuess();
      }
    },
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
        clearInterval(this.timerInterval);
        this.hasGuessed = true;
        this.result = option.isCorrect;
        if (!this.isEndlessGame) {
          localStorage.setItem("hasGuessed", option.index);
          localStorage.setItem(
            "previousTime",
            JSON.stringify({
              getFormattedTime: this.getFormattedTime,
              daysAfter: this.daysAfter,
            })
          );
        }
      }
    },

    handleReload() {
      window.location.reload();
    },

    handleShare() {
      try {
        let textToClipboard = "";
        if (this.daysAfter) {
          if (this.result)
            textToClipboard = `Versooo #${this.daysAfter} - Acertei em ${this.getFormattedTime}\nJogue em: https://lucassantoli.github.io/wordle-biblia/`;
          else
            textToClipboard = `Versooo #${this.daysAfter} - Hoje não deu 😔\nJogue em: https://lucassantoli.github.io/wordle-biblia/`;
        } else {
          throw "Um erro ocorreu ";
        }

        navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
          if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(textToClipboard).then(
              function () {
                console.log("Copiado para a área de transferência");
              },
              function (e) {
                console.log("Um erro ocorreu", e);
              }
            );
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    incrementTime: function () {
      this.countTime++;
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

    getFormattedTime: function () {
      if (this.previousTime) {
        return this.previousTime;
      } else {
        if (this.countTime >= 60) {
          return `⏱️ ${~~(this.countTime / 60)} min ${this.countTime % 60} seg`;
        } else {
          return `⏱️ ${this.countTime % 60} seg`;
        }
      }
    },
  },

  mounted() {
    let startInterval = true;
    let previousTime = JSON.parse(localStorage.getItem("previousTime")) ?? undefined;
    if (previousTime != undefined) {
      if (previousTime.daysAfter == this.daysAfter) {
        startInterval = false;
      }
    }
    if (!this.isEndlessGame && startInterval)
      this.timerInterval = setInterval(this.incrementTime, 1000);
  },

  created() {
    this.isEndlessGame = JSON.parse(localStorage.getItem("endlessgame")) ?? false;
    if (this.previousGuess) {
      this.handleGuess();
    }
  },
};
</script>

<style lang="scss">
@import "Guess.scss";
</style>
