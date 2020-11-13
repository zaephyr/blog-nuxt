<template>
  <ReadBlog :blog_post="getBlog" />
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const getBlog = await $axios.$get(`blogs/${params.id}`);
    return { getBlog };
  }
};
</script>

<style></style>
