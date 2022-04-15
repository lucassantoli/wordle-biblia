<template>
  <v-btn elevation="0" :color="color" class="main-button" @click="handleClick">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "MainButton",

  props: {
    color: {
      type: String,
      default: "primary",
    },
  },

  methods: {
    handleClick: function (event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style lang="scss">
@import "MainButton.scss";
</style>
