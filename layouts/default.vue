<template>
  <div>
    <BlogHeader />
    <Nuxt />
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  methods: {
    logout() {
      Cookie.remove("auth");
      this.$store.commit("setAuth", null);
    }
  }
};
</script>

<style></style>
