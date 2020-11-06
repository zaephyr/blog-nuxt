<template>
  <ReadBlog :blog_post="getBlog" />
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const getBlog = await $axios.$get(`blogs/${params.id}`);
    console.log("HELLO");
    return { getBlog };
  }
};
</script>

<style></style>
