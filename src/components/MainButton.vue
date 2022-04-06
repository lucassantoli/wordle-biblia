<template>
  <v-btn elevation="0" color="primary" class="main-button">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "MainButton",
};
</script>

<style lang="scss">
@import "MainButton.scss";
</style>
