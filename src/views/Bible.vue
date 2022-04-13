<template>
  <div class="home">
    <my-header></my-header>

    <quote :verse="verse"></quote>

    <guess :options="options"></guess>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import Quote from "@/components/Quote";
import Guess from "@/components/Guess";

import { bible, dayVerse } from "@/data/bible.js";

import { findVerse, shuffle } from "@/utils/bible.js";

export default {
  name: "Home",
  components: { MyHeader, Quote, Guess },

  data: () => ({
    bible,
    dayVerse,
    index: null,
    verse: null,
    options: [],
  }),

  created() {
    const index = Math.floor(
      (new Date() - this.$initialDate) / (1000 * 3600 * 24)
    );

    this.index = this.dayVerse[index];

    this.verse = findVerse(this.index, this.bible, true);

    let options = [this.verse];

    let iterations = 0;
    while (options.length < 5 && iterations++ < 31104) {
      let randomIndex = Math.floor(Math.random() * 31104 + 1);
      let option = findVerse(randomIndex, this.bible, false);
      console.log(option);
      let existsInOptions =
        options.find((verse) => verse.index == option.index) == undefined;
      if (existsInOptions) {
        options.push(option);
      }
    }

    this.options = shuffle(options);
  },
};
</script>

<style>
@import "Bible.scss";
</style>
