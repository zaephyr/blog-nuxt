<template>
  <div class="mx-auto w-4/5 md:w-2/3 lg:w-1/2 mb-12">
    <h1
      class="text-2xl md:text-3xl mx-auto w-2/3 text-center uppercase text-green-500 font-bold"
    >
      {{ blog_post.title }}
    </h1>
    <p class=" text-sm text-right font-light text-gray-500 my-5">
      {{ formatDate(blog_post.createdAt) }}
    </p>
    <p class="border-2 p-8 bg-green-100 shadow-2xl text-gray-600 ">
      {{ blog_post.content }}
    </p>
    <h3 class="text-green-500 text-bold mt-12">Comments:</h3>
    <div
      v-for="message in blog_post.messages"
      class="mt-4 shadow bg-green-100 w-11/12 sm:w-2/3"
      :key="message.createdAt"
    >
      <p class="text-gray-600">{{ message.message }}</p>
      <div class="flex justify-between items-center mt-2">
        <button class="text-xs p-1 btn">Reply</button>
        <p class="text-xs font-light text-right text-gray-500">
          by {{ message.user.username }} on
          {{ formatDate(message.createdAt) }} at
          {{ formatTime(message.createdAt) }}
        </p>
      </div>
    </div>
    <div>
      <h3 class="mt-4 mb-2">Add a new comment</h3>
      <form method="POST" class="flex flex-col sm:flex-row relative">
        <textarea
          name="coment"
          id="comment"
          cols="50"
          rows="5"
          class=" border-2 border-green-500 bg-green-100"
          placeholder="Your comment goes here..."
        ></textarea>
        <div class="mt-4 sm:mt-0 flex flex-col justify-center">
          <div class="ml-3 flex flex-col" v-if="!$auth.loggedIn">
            <input
              v-model="userInfo.username"
              class="form-cell h-6  "
              id="username"
              name="username"
              required
              type="text"
              placeholder="Username"
            />
            <input
              v-model="userInfo.username"
              class="form-cell h-6"
              id="password"
              name="password"
              required
              type="password"
              placeholder="******************"
            />
          </div>
          <button
            :class="{
              'mx-auto': !$auth.loggedIn,
              'my-auto sm:ml-2': $auth.loggedIn
            }"
            class="btn"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
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
  data() {
    return {
      userInfo: {
        username: "zaephyr",
        password: "00zero00"
      }
    };
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "PP");
    },
    formatTime(date) {
      return format(new Date(date), "HH:mm");
    }
  }
};
</script>

<style></style>
