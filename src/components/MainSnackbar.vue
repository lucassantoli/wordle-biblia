<template>
  <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" top>
    <v-icon left v-text="icon"></v-icon>
    <span v-text="message"></span>
  </v-snackbar>
</template>

<script>
export default {
  name: "MainSnackbar",
  data() {
    return {
      showSnackbar: false,
      message: "",
      color: "success",
      icon: "mdi-check",
      timer: 5000,
    };
  },
  methods: {
    show(data) {
      this.message = data.message || "";
      this.color = data.color || "success";
      this.timer = data.timer || 5000;
      this.icon = data.icon || "mdi-check";
      this.showSnackbar = true;
    },
  },
};
</script>
