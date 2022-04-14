<template>
  <div class="quote" @click="handleClick">
    <v-img :src="quote" max-width="28px" class="quote-img"></v-img>
    <span v-text="verse.text"></span>
  </div>
</template>

<script>
import quote from "@/assets/quote.svg";

export default {
  name: "Quote",

  data: () => ({
    quote,
  }),

  methods: {
    handleClick: function (event) {
      this.$emit("click", event);
    },
  },

  props: {
    verse: Object,
  },
};
</script>

<style lang="scss">
@import "Quote.scss";
</style>
