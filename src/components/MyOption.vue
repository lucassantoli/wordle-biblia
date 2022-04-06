<template>
  <div
    :class="['my-option', option.selected && 'selected']"
    @click="handleClick"
  >
    <v-icon>mdi-text</v-icon>
    <span>{{ option.ref }}</span>
  </div>
</template>

<script>
export default {
  name: "MyOption",

  props: {
    option: Object,
  },

  methods: {
    handleClick: function () {
      this.$emit("click", this.option);
    },
  },
};
</script>

<style lang="scss">
@import "MyOption.scss";
</style>
