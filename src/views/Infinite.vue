<template>
  <div class="home">
    <my-header isEndless></my-header>
    <div class="game">
      <div class="currGame">
        <quote :verse="game.verse"></quote>

        <span class="title"> Em qual versículo da bíblia podemos encontrar o texto acima? </span>

        <guess v-model="game" isEndless></guess>
      </div>
    </div>
  </div>
</template>

<script>
import Quote from "@/components/Quote";
import Guess from "@/components/Guess";
import MyHeader from "@/components/MyHeader";

import { bible, dayVerse } from "@/data/bible.js";
import { findVerse, shuffle2 } from "@/utils/bible.js";

export default {
  name: "Infinite",
  components: {
    MyHeader,
    Quote,
    Guess,
  },

  data: () => ({
    previousTime: null,
    bible,
    dayVerse,
    index: null,
    game: { verse: null, options: [] },
  }),

  created() {
    let index = Math.floor(Math.random() * 31104 + 1);
    this.index = this.dayVerse[index];

    this.game.verse = findVerse(this.index, this.bible, true);
    let options = [this.game.verse];

    let iterations = 0;
    while (options.length < 5 && iterations++ < 31104) {
      let randomIndex = Math.floor(Math.random() * 31104 + 1);
      let option = findVerse(randomIndex, this.bible, false);

      let existsInOptions = options.find((verse) => verse.index == option.index) != undefined;
      if (!existsInOptions) {
        options.push(option);
      }
    }

    options = shuffle2(options);
    this.game.options = options;
  },
};
</script>
