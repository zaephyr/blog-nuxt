<template>
    <div class="mx-auto w-4/5 md:w-2/3 lg:w-1/2 mb-12">
        <h1 class="text-2xl md:text-3xl mx-auto w-2/3 text-center uppercase text-green-500 font-bold">
            {{ blog_post.title }}
        </h1>
        <p class=" text-sm text-right font-light text-gray-500 my-5">
            {{ formatDate(blog_post.createdAt) }}
        </p>

        <ProfilePic class="float-right" :profile_img="blog_post.author.profile_img" />

        <p class="border-2 p-8 bg-green-100 shadow-2xl text-gray-600 ">
            {{ blog_post.content }}
        </p>
        <h3 class="text-green-500 text-bold mt-12">Comments:</h3>
        <div
            v-for="message in blog_post.messages"
            class="mt-4 shadow bg-green-100 w-11/12 sm:w-3/4 relative"
            :key="message.createdAt"
        >
            <div class=" min-h-65">
                <ProfilePic :profile_img="message.user.profile_img" class="profile_img" />

                <p class="text-gray-600 ">{{ message.message }}</p>
            </div>
            <div class="flex  items-center justify-end">
                <p class="text-xs font-light text-right text-gray-500 self-end">
                    by {{ message.user.username }} on {{ formatDate(message.createdAt) }} at
                    {{ formatTime(message.createdAt) }}
                </p>
            </div>
            <div v-if="_loggedIn" class="delete-btn" @click="deleteMsg(message.id)">
                <font-awesome-icon
                    v-if="message.user.username == _user.username || _user.isAdmin"
                    :icon="['fas', 'trash-alt']"
                />
            </div>
        </div>
        <div>
            <h3 class="mt-4 mb-2">{{ _loggedIn ? 'Add a new comment' : 'To comment you need to log in' }}</h3>
            <form class="flex flex-col sm:flex-row relative">
                <textarea
                    v-if="_loggedIn"
                    v-model="userInfo.message"
                    name="coment"
                    id="comment"
                    cols="50"
                    rows="5"
                    class=" border-2 border-green-500 bg-green-100"
                    placeholder="Your comment goes here..."
                ></textarea>
                <div class="mt-4 sm:mt-0 flex flex-col justify-center">
                    <div class="ml-3 flex flex-col" v-if="!_loggedIn">
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
                            v-model="userInfo.password"
                            class="form-cell h-6"
                            id="password"
                            name="password"
                            required
                            type="password"
                            placeholder="******************"
                        />
                    </div>
                    <button v-if="_loggedIn" class="btn my-auto sm:ml-2" @click="postMsg">
                        Submit Post
                    </button>
                    <button v-else class="btn mx-auto" @click="onLogin">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns';
import { _user } from '~/plugins/global-mixins';

export default {
    props: {
        blog_post: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            userInfo: {
                username: '',
                password: '',
                message: '',
            },
        };
    },
    methods: {
        formatDate(date) {
            return format(new Date(date), 'PP');
        },
        formatTime(date) {
            return format(new Date(date), 'HH:mm');
        },
        async onLogin() {
            try {
                const { data, token } = await this.$axios.$post('/auth/login', {
                    username: this.userInfo.username,
                    password: this.userInfo.password,
                });
                await this.$store.commit('auth/SET_TOKEN', token);
                await this.$store.commit('auth/SET_USER', data.user);
            } catch (e) {
                alert('Error!: ' + e);
            }
        },
        async postMsg() {
            let params = {
                message: this.userInfo.message,
                blogPost: this.blog_post._id,
                user: this._loggedIn._id,
            };
            await this.$axios.$post(`blogs/${this.blog_post._id}/messages`, params);
            this.$router.push({ path: `/blogs/${this.blog_post._id}` });
        },
        async deleteMsg(id) {
            await this.$axios.$delete(`blogs/${this.blog_post._id}/messages/${id}`).then(() => {
                this.$router.push({ path: `/blogs/${this.blog_post._id}` });
            });
        },
    },
};
</script>

<style>
.profile_img {
    height: 100% !important;
    min-width: 65px !important;
    float: left;
    top: 10px;
    left: -5px;
    -webkit-shape-outside: circle(50% at 50% 50%);
    shape-outside: circle(50% at 50% 50%);
    -webkit-clip-path: circle(50% at 50% 50%);
    clip-path: circle(50% at 50% 50%);

    position: relative;
}

.delete-btn {
    top: 15px;
    right: -50px;
    @apply text-xl text-white bg-red-500 absolute px-1 rounded-md cursor-pointer;
}
</style>
