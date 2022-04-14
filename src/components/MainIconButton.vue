<template>
  <v-btn
    elevation="0"
    :color="color"
    class="main-icon-button"
    @click="handleClick"
  >
    <v-icon v-text="icon"></v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "MainButton",

  props: {
    color: String,
    icon: String,
  },

  methods: {
    handleClick: function (event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style lang="scss">
@import "MainIconButton.scss";
</style>
