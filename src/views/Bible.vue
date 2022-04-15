<template>
  <div class="home">
    <my-header :games="games.games" :currGame="currGame"></my-header>
    <div class="game" v-for="(game, index) in games.games" :key="index">
      <div class="currGame" v-if="currGame == index">
        <div class="quote-container">
          <quote :verse="game.verse"></quote>
        </div>

        <span class="title"> Em qual versículo da bíblia podemos encontrar o texto acima? </span>

        <div class="timer">
          {{ getFormattedTime }}
        </div>
        <guess
          v-model="games.games[index]"
          :daysAfter="daysAfter"
          :currGame="currGame"
          @nextGame="() => Math.min(++currGame, 4)"
          @prevGame="() => Math.max(--currGame, 0)"
          @gameEnded="handleEndgame"
          @hasGuessed="handleGuess"
          @shareGame="handleShare"
        ></guess>
      </div>
    </div>
  </div>
</template>

<script>
import Quote from "@/components/Quote";
import Guess from "@/components/Guess";
import MyHeader from "@/components/MyHeader";

import { bible, dayVerse } from "@/data/bible.js";
import { findVerse, shuffle } from "@/utils/bible.js";

var seedrandom = require("seedrandom");

export default {
  name: "Home",
  components: {
    MyHeader,
    Quote,
    Guess,
  },

  data: () => ({
    timerInterval: null,
    countTime: 0,
    daysAfter: null,
    previousTime: null,
    previousGuess: false,
    bible,
    seedrandom,
    dayVerse,
    index: null,
    games: { time: null, daysAfter: null, games: [] },
    currGame: 0,
  }),

  computed: {
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

  methods: {
    handleEndgame: function () {
      clearInterval(this.timerInterval);
      this.games.time = this.countTime;
      this.games.daysAfter = this.daysAfter;
      localStorage.setItem("previousGuess", JSON.stringify(this.games));
    },

    handleGuess: function () {
      this.games.time = this.countTime;
      this.games.daysAfter = this.daysAfter;
      localStorage.setItem("previousGuess", JSON.stringify(this.games));
    },

    handleShare: function () {
      try {
        let textToClipboard = `Versooo #${this.daysAfter}\n`;
        this.games.games.forEach((game) => {
          if (game.correct) {
            textToClipboard += "🟩 ";
          } else {
            textToClipboard += "🟥 ";
          }
        });

        textToClipboard += `\nConsegui em ${this.getFormattedTime}\n\nJogue em: https://lucassantoli.github.io/wordle-biblia/`;

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
    let startInterval = true;

    let previousGuess = JSON.parse(localStorage.getItem("previousGuess")) || undefined;
    if (previousGuess != undefined) {
      let countGuess = previousGuess.games.filter((game) => game.hasGuessed).length;
      if (countGuess == 5) {
        startInterval = false;
      }
    }

    if (startInterval) {
      this.timerInterval = setInterval(() => {
        this.countTime++;
      }, 1000);
    }
  },

  created() {
    let index = Math.floor((new Date() - this.$initialDate) / (1000 * 3600 * 24)) * 5;
    this.daysAfter = index / 5;

    let rerenderGame = false;
    let previousGuess = JSON.parse(localStorage.getItem("previousGuess")) || undefined;
    if (previousGuess != undefined) {
      let countGuess = previousGuess.games.filter((game) => game.hasGuessed).length;
      this.currGame = countGuess;
      this.games = previousGuess;
      this.countTime = previousGuess.time;
      if (previousGuess.daysAfter != this.daysAfter) {
        rerenderGame = true;
      }
    } else {
      rerenderGame = true;
    }

    if (rerenderGame) {
      let rng = seedrandom(this.daysAfter);

      this.index = this.dayVerse[index];

      for (let i = 0; i < 5; i++) {
        let game = {};
        let verse = findVerse(this.dayVerse[index + i], this.bible, true);
        let options = [verse];

        let iterations = 0;
        while (options.length < 5 && iterations++ < 31104) {
          let randomIndex = Math.floor(rng() * 31104 + 1);
          let option = findVerse(randomIndex, this.bible, false);

          let existsInOptions = options.find((verse) => verse.index == option.index) != undefined;
          if (!existsInOptions) {
            options.push(option);
          }
        }

        game.options = shuffle(options, rng);
        game.verse = verse;
        game.hasGuessed = false;
        game.guess = null;
        game.correct = null;
        this.games.games.push(game);
      }
    }
  },
};
</script>

<style>
@import "Bible.scss";
</style>
