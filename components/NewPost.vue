<template>
    <div class="flex">
        <div class="w-1/3 md:w-1/5 flex flex-col px-4">
            <h2 class="text-green-600  border-b-2 font-bold text-2xl">Back Log</h2>
            <div v-for="blogPost in backLog.data" :key="blogPost.id" class="my-2">
                <span class="cursor-pointer hover:underline" @click="getBlog(blogPost.id)">
                    {{ blogPost.title }}
                </span>
                <input type="radio" :id="blogPost.id" :value="blogPost.id" v-model="checkedBlogs" />
            </div>
            <span class="my-3" v-if="!backLog.data">No blogs available</span>
            <button class="btn w-1/2 mx-auto" @click="submitBlogPosts">
                Submit Blogs
            </button>
        </div>
        <div class="mx-auto flex flex-col w-7/11 sm:w-1/2">
            <div class="flex">
                <input
                    class="form-cell mt-2"
                    type="text"
                    name="title"
                    v-model="blogPost.title"
                    id="title"
                    placeholder="Title"
                />
                <button v-if="blogPost.title || blogPost.content" class="btn my-auto" @click="clear">
                    Clear
                </button>
            </div>

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
                <div v-if="!editPostId">
                    <button class="btn mr-4" @click="postBlog(false)">Save blog</button>
                    <button class="btn" @click="postBlog(true)">
                        Post blog
                    </button>
                </div>
                <button class="btn" v-else @click="editPost">Edit Post</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['backLog'],
    data() {
        return {
            checkedBlogs: [],
            editPostId: '',
            blogPost: {
                content: '',
                title: '',
                author: this.$auth.user._id,
                posted: false,
            },
        };
    },

    methods: {
        async submitBlogPosts() {
            const res = await this.$axios.$patch(`blogs/${this.checkedBlogs}`, {
                posted: true,
            });
            this.backLog = await this.$axios.$get(`users/me/blogs`);
            clear();
            return res;
        },
        async postBlog(bool) {
            this.blogPost.posted = bool;
            const res = await this.$axios.$post(`blogs/`, this.blogPost);
            this.backLog = await this.$axios.$get(`users/me/blogs`);

            return res;
        },
        async getBlog(id) {
            const res = await this.$axios.$get(`blogs/${id}`);
            this.blogPost.title = res.title;
            this.blogPost.content = res.content;
            this.editPostId = id;
        },
        async editPost() {
            const res = await this.$axios.$patch(`blogs/${this.editPostId}`, this.blogPost);
            this.backLog = await this.$axios.$get(`users/me/blogs`);

            return res;
        },
        clear() {
            this.editPostId = '';
            this.blogPost.title = '';
            this.blogPost.content = '';
        },
    },
};
</script>
<style></style>
