<template>
  <div class="home">
    <my-header></my-header>

    <quote :verse="verse"></quote>

    <guess></guess>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import Quote from "@/components/Quote";
import Guess from "@/components/Guess";

export default {
  name: "Home",
  components: { MyHeader, Quote, Guess },

  data: () => ({
    verse: {
      ref: "Ec 7:8",
      text: "Melhor é o fim das coisas do que o princípio delas; melhor é o paciente de espírito do que o altivo de espírito.",
      book: "Eclesiastes",
      chapter: "7",
      verse: "8",
    },
  }),
};
</script>

<style>
@import "Bible.scss";
</style>
