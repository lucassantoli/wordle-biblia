<template>
  <div class="container-guess-table">
    <div class="guess-table">
      <div class="header-guess">
        <div class="header-column">Referência</div>
        <div class="header-column">Proximidade</div>
      </div>
      <div v-for="(guess, index) in guesses" :key="index">
        <div class="individual-guess" v-if="checkIfEmpty(guess)">
          <div class="column book">{{ guess.ref }}</div>
          <div class="column proximity">
            <div>{{ guess.proxemoji }}</div>
            <div>{{ guess.percentual }}</div>
            <div>{{ guess.dir }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="guess-table table-inputs" v-if="!result">
      <div class="header-guess">
        <div class="header-column">Livro</div>
        <div class="header-column">Capítulo</div>
        <div class="header-column">Verso</div>
      </div>

      <div class="field-guess">
        <v-select
          class="column book"
          :items="references"
          item-text="name"
          item-value="index"
          v-model="guessBook"
          ref="bookinput"
          outlined
          dense
          hide-details
        ></v-select>
        <v-select
          class="column chapter"
          :items="generateNumbers(references[guessBook].chapters.length)"
          v-model="guessChapter"
          outlined
          dense
          hide-details
        ></v-select>
        <v-select
          class="column verse"
          :items="generateNumbers(references[guessBook].chapters[guessChapter - 1])"
          v-model="guessVerse"
          outlined
          dense
          hide-details
        ></v-select>
      </div>
    </div>
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
        v-if="result"
        class="button button-aux"
        color="primary"
        icon="mdi-share-variant"
        @click="handleShare"
      ></main-icon-button>
    </div>
  </div>
</template>

<script>
import { bible, references, dayVerse } from "@/data/bible.js";
import { findVerseByReference } from "@/utils/bible.js";

import MainButton from "@/components/MainButton";
import MainIconButton from "@/components/MainIconButton";

export default {
  name: "GuessTable",

  components: {
    MainButton,
    MainIconButton,
  },

  data: () => ({
    bible,
    references,
    dayVerse,
    result: false,
    guessBook: 0,
    guessChapter: 1,
    guessVerse: 1,
    guesses: [],
  }),

  props: {
    verse: Object,
    correct: Object,
    daysAfter: Number,
  },

  watch: {
    guessBook: function () {
      this.guessChapter = 1;
      this.guessVerse = 1;
    },

    guessChapter: function () {
      this.guessVerse = 1;
    },
  },

  computed: {
    countAlreadyGuessed: function () {
      return this.guesses.filter((guess) => Object.keys(guess).length > 0).length;
    },

    getColorButton: function () {
      if (this.result) {
        return "success";
      } else {
        return "primary";
      }
    },

    getContentButton: function () {
      if (this.result) {
        return "CORRETO";
      } else {
        return "ADIVINHAR";
      }
    },
  },

  methods: {
    checkIfEmpty(obj) {
      return Object.keys(obj).length > 0;
    },
    generateNumbers(len) {
      let numbers = [...Array(len).keys()];
      return numbers.map((n) => n + 1);
    },
    handleGuess() {
      if (this.result) return;
      let verse = findVerseByReference(
        this.guessBook,
        this.guessChapter - 1,
        this.guessVerse - 1,
        this.bible
      );
      let maxdist = Math.max(this.verse.index, 31104 - this.verse.index);
      verse.proximity =
        Math.round((1 - Math.abs(verse.index - this.verse.index) / maxdist) * 10000) / 100;
      let dir = this.verse.index < verse.index ? "⬆️" : "⬇️";
      verse.percentual = verse.proximity.toString().replace(".", ",") + " %";
      verse.dir = dir;

      if (verse.proximity == 100) {
        if (verse.index == this.verse.index) {
          verse.proxemoji = "🟩 🟩 🟩 🟩 🟩";
        } else {
          verse.percentual = "99,99 %";
          verse.proxemoji = "🟩 🟩 🟩 🟩 🟥";
        }
      } else if (verse.proximity > 80) {
        verse.proxemoji = "🟩 🟩 🟩 🟩 🟥";
      } else if (verse.proximity > 60) {
        verse.proxemoji = "🟩 🟩 🟩 🟥 🟥";
      } else if (verse.proximity > 40) {
        verse.proxemoji = "🟩 🟩 🟥 🟥 🟥";
      } else if (verse.proximity > 20) {
        verse.proxemoji = "🟩 🟥 🟥 🟥 🟥";
      } else {
        verse.proxemoji = "🟥 🟥 🟥 🟥 🟥";
      }

      this.guesses.push(verse);
      if (this.verse.index == verse.index) {
        this.handleCorrect();
      }
    },
    handleCorrect: function () {
      this.result = true;
      let obj = {
        guesses: this.guesses,
        daysAfter: this.daysAfter,
      };
      localStorage.setItem("previousGuessProximity", JSON.stringify(obj));
    },
    handleShare: function () {
      try {
        let textToClipboard = `Versooo proximidade #${this.daysAfter}\n`;
        let far = 0,
          mid = 0,
          close = 0;
        for (let i = 0; i < this.guesses.length; i++) {
          if (this.guesses[i].proximity > 66) close++;
          else if (this.guesses[i].proximity > 66) mid++;
          else far++;
        }

        textToClipboard += `\n🟩 ${close}\n🟨 ${mid}\n🟥 ${far}\n`;
        textToClipboard += `\nConsegui após ${this.guesses.length} tentativas\n\nJogue em: https://lucassantoli.github.io/wordle-biblia/#/proximidade`;

        navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
          if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(textToClipboard).then(
              () => {
                this.$root.snackbar.show({ message: "Copiado para a área de transferência!" });
              },
              (e) => {
                console.log("Um erro ocorreu", e);
              }
            );
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    let previousGuess = JSON.parse(localStorage.getItem("previousGuessProximity")) || undefined;
    if (previousGuess != undefined) {
      if (previousGuess.daysAfter == this.daysAfter) {
        this.guesses = previousGuess.guesses;
        this.handleCorrect();
      }
    }
  },
};
</script>

<style lang="scss">
@import "GuessTable.scss";
</style>
