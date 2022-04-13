<template>
  <div
    :class="[
      'my-option',
      option.selected && 'selected',
      disabled && 'disabled',
    ]"
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
    disabled: Boolean,
  },

  methods: {
    handleClick: function () {
      if (!this.disabled) {
        this.$emit("click", this.option);
      }
    },
  },
};
</script>

<style lang="scss">
@import "MyOption.scss";
</style>
