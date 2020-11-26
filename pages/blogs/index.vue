<template>
    <div class="flex flex-wrap  mt-8 mx-auto ">
        <BlogPost
            v-for="blog_post in blogs.data"
            :blog_post="blog_post"
            :key="blog_post.title"
            class="mx-auto w-4/5 sm:w-2/3 lg:w-1/3 md:w-1/2 "
        />
    </div>
</template>

<script>
export default {
    async asyncData({ params, $axios }) {
        const blogs = await $axios.$get('blogs');
        return { blogs };
    },
    transition: 'page',
};
</script>

<style></style>
