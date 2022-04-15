<template>
  <div class="guess">
    <!-- Modelo 1 -->
    <div class="guess-inputs">
      <my-option
        v-for="(option, index) in guessValue.options"
        :key="index"
        :option="option"
        @click="handleSelect"
        :disabled="hasGuessed"
      ></my-option>

      <div class="buttons">
        <main-icon-button
          v-if="currGame != 0 && hasGuessed && !isEndless"
          class="button button-aux"
          color="primary"
          icon="mdi-arrow-left"
          @click="handlePrev"
        ></main-icon-button>

        <main-button
          class="button button-guess"
          :color="getColorButton"
          @click="handleGuess"
          :result="result"
        >
          {{ getContentButton }}
        </main-button>

        <main-icon-button
          v-if="currGame == 4 && hasGuessed && !isEndless"
          class="button button-aux"
          color="primary"
          icon="mdi-share-variant"
          @click="handleShare"
        ></main-icon-button>

        <main-icon-button
          v-if="currGame != 4 && hasGuessed && !isEndless"
          class="button button-aux"
          color="primary"
          icon="mdi-arrow-right"
          @click="handleNext"
        ></main-icon-button>

        <main-icon-button
          v-if="hasGuessed && isEndless"
          class="button button-aux"
          color="primary"
          icon="mdi-reload"
          @click="handleReload"
        ></main-icon-button>
      </div>
    </div>
  </div>
</template>

<script>
import MainButton from "@/components/MainButton";
import MyOption from "@/components/MyOption";
import MainIconButton from "@/components/MainIconButton";

export default {
  name: "Guess",

  components: {
    MainButton,
    MyOption,
    MainIconButton,
  },

  data: () => ({
    hasGuessed: false,
    result: null,
  }),

  props: {
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
      let option = this.guessValue.options.find((op) => op.selected);

      if (option != undefined) {
        this.hasGuessed = true;
        this.result = option.isCorrect;
        if (!this.guessValue.hasGuessed) {
          this.guessValue.guess = option.index;
          this.guessValue.hasGuessed = true;
          this.guessValue.correct = option.isCorrect;

          this.$emit("hasGuessed", true);

          if (this.currGame == 4) {
            this.$emit("gameEnded", true);
          }
        }
      }
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

  mounted() {
    if (this.guessValue.hasGuessed) {
      this.handleGuess();
    }
  },

  created() {
    if (this.previousGuess) {
      this.handleGuess();
    }
  },
};
</script>

<style lang="scss">
@import "Guess.scss";
</style>
