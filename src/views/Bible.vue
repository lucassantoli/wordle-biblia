<template>
  <div class="home">
    <my-header :unlockUnlimited="hasUnlockedEndlessGame"></my-header>

    <quote :verse="verse" @click="unlockUnlimited"></quote>

    <guess :options="options" :haveAlreadyGuessed="haveAlreadyGuessed"></guess>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import Quote from "@/components/Quote";
import Guess from "@/components/Guess";

import { bible, dayVerse } from "@/data/bible.js";
import { findVerse, shuffle } from "@/utils/bible.js";

var seedrandom = require("seedrandom");

export default {
  name: "Home",
  components: { MyHeader, Quote, Guess },

  data: () => ({
    timesClickedOnVerse: 0,
    haveAlreadyGuessed: false,
    hasUnlockedEndlessGame: false,
    bible,
    seedrandom,
    dayVerse,
    index: null,
    verse: null,
    options: [],
  }),

  methods: {
    unlockUnlimited: function () {
      this.timesClickedOnVerse++;
      if (this.timesClickedOnVerse > 20) {
        localStorage.setItem("unlockedendlessgame", true);
        this.hasUnlockedEndlessGame = true;
      }
    },
  },

  created() {
    try {
      this.hasUnlockedEndlessGame =
        JSON.parse(localStorage.getItem("unlockedendlessgame")) ?? false;
    } catch (e) {
      this.hasUnlockedEndlessGame = false;
    }

    let index = 0;
    if (JSON.parse(localStorage.getItem("endlessgame")) ?? false) {
      index = Math.floor(Math.random() * 31104 + 1);
    } else {
      index = Math.floor((new Date() - this.$initialDate) / (1000 * 3600 * 24));
    }

    let rng = seedrandom(index);

    this.index = this.dayVerse[index];
    this.verse = findVerse(this.index, this.bible, true);
    let options = [this.verse];

    let iterations = 0;
    while (options.length < 5 && iterations++ < 31104) {
      let randomIndex = Math.floor(rng() * 31104 + 1);
      let option = findVerse(randomIndex, this.bible, false);

      let existsInOptions =
        options.find((verse) => verse.index == option.index) == undefined;
      if (existsInOptions) {
        options.push(option);
      }
    }

    let previousGuess =
      JSON.parse(localStorage.getItem("hasGuessed")) ?? undefined;
    if (previousGuess != undefined) {
      options.forEach((op) => {
        if (op.index == previousGuess) {
          op.selected = true;
        } else {
          op.setected = false;
        }
      });
    }

    this.options = shuffle(options, rng);
    this.haveAlreadyGuessed = previousGuess != undefined;
  },
};
</script>

<style>
@import "Bible.scss";
</style>
