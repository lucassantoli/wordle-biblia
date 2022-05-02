<template>
  <div class="guess-proximity">
    <div class="guess-inputs">
      <guess-table :guesses="[]" :verse="verse" :daysAfter="daysAfter"></guess-table>
    </div>
  </div>
</template>

<script>
import GuessTable from "@/components/GuessTable";

export default {
  name: "GuessProximity",

  components: {
    GuessTable,
  },

  data: () => ({
    result: null,
  }),

  props: {
    verse: Object,
    daysAfter: Number,
    currGame: Number,
    value: Object,
    isEndless: Boolean,
  },

  methods: {
    generateNumbers(n) {
      return [...Array(n).keys()];
    },

    handleSelect(event) {
      this.guessValue.options.forEach((option) => {
        if (option.ref === event.ref) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      });
    },

    handleGuess() {
      //   let option = this.guessValue.options.find((op) => op.selected);
      //   if (option != undefined) {
      //     this.hasGuessed = true;
      //     this.result = option.isCorrect;
      //     if (!this.guessValue.hasGuessed) {
      //       this.guessValue.guess = option.index;
      //       this.guessValue.hasGuessed = true;
      //       this.guessValue.correct = option.isCorrect;
      //       this.$emit("hasGuessed", true);
      //       if (this.currGame == 4) {
      //         this.$emit("gameEnded", true);
      //       }
      //     }
      //   }
    },

    handleReload() {
      window.location.reload();
    },

    handleShare: function (event) {
      this.$emit("shareGame", event);
    },

    handleNext: function (event) {
      this.$emit("nextGame", event);
    },

    handlePrev: function (event) {
      this.$emit("prevGame", event);
    },
  },

  computed: {
    guessValue: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  },

  mounted() {
    // if (this.guessValue.hasGuessed) {
    //   this.handleGuess();
    // }
  },

  created() {
    if (this.previousGuess) {
      this.handleGuess();
    }
  },
};
</script>

<style lang="scss">
@import "GuessProximity.scss";
</style>
