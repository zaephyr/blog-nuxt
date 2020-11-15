<template>
  <div class="md:flex ">
    <div
      class="mt-4 mx-auto w-11/12 md:w-4/5 xl:w-2/3 border mb-12 px-2 py-4 shadow-xl bg-green-100"
    >
      <h1 class="uppercase text-green-500 font-bold ">
        <NuxtLink :to="`/blogs/${blog_post._id}`"
          >{{ blog_post.title }}
        </NuxtLink>
      </h1>

      <p class="text-sm font-light text-gray-600">
        {{ formatDate(blog_post.createdAt) }}
      </p>
      <p
        class="mt-2 text-gray-600 h-auto overflow-hidden mb-6 truncate-11-lines"
      >
        {{ blog_post.content }}
      </p>
      <NuxtLink :to="`/blogs/${blog_post._id}`" class="btn p-2 "
        >Read more ...
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
export default {
  props: {
    blog_post: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "PP");
    }
  }
};
</script>

<style></style>
