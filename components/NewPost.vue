<template>
  <div class="flex">
    <div class="w-1/3 md:w-1/5 flex flex-col px-4">
      <h2 class="text-green-600  border-b-2 font-bold text-2xl">Back Log</h2>
      <div
        v-if="backLog.data"
        v-for="blogPost in backLog.data"
        :key="blogPost.id"
        class="my-2"
      >
        <span
          class="cursor-pointer hover:underline"
          @click="getBlog(blogPost.id)"
        >
          {{ blogPost.title }}
        </span>
        <input
          type="radio"
          :id="blogPost.id"
          :value="blogPost.id"
          v-model="checkedBlogs"
        />
      </div>
      <span class="my-3" v-else>No blogs available</span>
      <button class="btn w-1/2 mx-auto" @click="submitBlogPosts">
        Submit Blogs
      </button>
    </div>
    <div class="mx-auto">
      <input
        class="form-cell mt-2"
        type="text"
        name="title"
        v-model="blogPost.title"
        id="title"
        placeholder="Title"
      />
      <textarea
        class="form-cell"
        v-model="blogPost.content"
        name="content"
        id="content"
        cols="30"
        rows="10"
        placeholder="Your text goes here"
      ></textarea>
      <div class="flex justify-center mt-2">
        <button class="btn mr-4" @click="postBlog(false)">Save blog</button>
        <button class="btn" @click="postBlog(true)">
          Post blog
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["backLog"],
  data() {
    return {
      checkedBlogs: [],
      blogPost: {
        content: "",
        title: "",
        author: this.$auth.user._id,
        posted: false
      }
    };
  },
  head() {
    return {
      script: [
        {
          src: "https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js",
          referrerpolicy: "origin"
        }
      ]
    };
  },
  methods: {
    async submitBlogPosts() {
      const res = await this.$axios.$patch(`blogs/${this.checkedBlogs}`, {
        posted: true
      });
      return res;
    },
    async postBlog(bool) {
      this.blogPost.posted = bool;
      const res = await this.$axios.$post(`blogs/`, this.blogPost);
      return res;
    },
    async getBlog(id) {
      const res = await this.$axios.$get(`blogs/${id}`);
      console.log(res);
      this.blogPost.title = res.title;
      this.blogPost.content = res.content;
    }
  }
};
</script>
<style></style>
