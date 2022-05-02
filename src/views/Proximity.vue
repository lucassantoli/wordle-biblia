<template>
  <div class="home">
    <my-header></my-header>
    <div class="game">
      <quote :verse="verse"></quote>

      <span class="title"> Em qual versículo da bíblia podemos encontrar o texto acima? </span>
    </div>

    <div class="container-proximity">
      <guess-proximity :verse="verse" :daysAfter="daysAfter"></guess-proximity>
    </div>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <div class="dialog">
        <h2 class="dialog-title">Como funciona</h2>
        <p>Todo dia você será apresentado a um verso da bíblia.</p>
        <p>
          Você terá que adivinhar qual a referência deste versículo do dia. Para isso, insira
          escolha um livro, capítulo e versículo nos campos e faça seu palpite.
        </p>
        <p>
          Após confirmar o palpite, você saberá a <strong>proximidade</strong> do seu palpite com a
          referência correta.
        </p>
        <p>
          Não há limite de tentativas! Acerte o quanto antes e compartilhe seu resultado com amigos
          e veja quem pontuou mais em menos tempo!
        </p>

        <main-button @click="handleCloseDialog">Entendi</main-button>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import Quote from "@/components/Quote";
import MyHeader from "@/components/MyHeader";
import MainButton from "@/components/MainButton";
import GuessProximity from "@/components/GuessProximity";

import { bible, dayVerse } from "@/data/bible.js";
import { findVerse } from "@/utils/bible.js";

export default {
  name: "Proximity",
  components: {
    MyHeader,
    MainButton,
    GuessProximity,
    Quote,
  },

  data: () => ({
    dialog: true,
    daysAfter: null,
    verse: null,
    bible,
    dayVerse,
  }),

  methods: {
    handleCloseDialog: function () {
      localStorage.setItem("closeDialogProximity", true);
      this.dialog = false;
      this.timerInterval = setInterval(() => {
        this.countTime++;
      }, 1000);
    },
  },

  mounted() {
    const closeDialog = localStorage.getItem("closeDialogProximity") || false;
    this.dialog = !closeDialog;
  },

  created() {
    let index = Math.floor((new Date() - this.$initialDate) / (1000 * 3600 * 24)) + 15000;
    this.daysAfter = index - 15000;
    index = index % 31104;

    this.verse = findVerse(dayVerse[index], this.bible, false);
  },
};
</script>

<style>
@import "Proximity.scss";
</style>
