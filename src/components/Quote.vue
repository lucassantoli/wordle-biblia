<template>
  <div class="quote">
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

  props: {
    verse: Object,
  },
};
</script>

<style lang="scss">
@import "Quote.scss";
</style>
