<template>
    <div>
        <div class="flex justify-center">
            <button class="tab" :class="{ focused: profile }" @click="profile = true">
                Profile
            </button>
            <button class="tab" :class="{ focused: !profile }" @click="profile = false">
                Blog Posts
            </button>
        </div>
        <Profile v-if="profile" :getMe="_loggedIn" />
        <NewPost v-else :backLog="backLog" />
    </div>
</template>

<script>
import Profile from '~/components/Profile.vue';
export default {
    components: { Profile },
    async asyncData({ $axios }) {
        // const getMe = await $axios.$get(`users/me`);
        const backLog = await $axios.$get(`users/me/blogs`);
        return { backLog };
    },
    data() {
        return {
            profile: true,
        };
    },
    methods: {
        toggle() {
            this.profile = !this.profile;
        },
    },
};
</script>

<style>
.tab {
    @apply border-2 text-green-600 border-green-200  p-2 transition ease-in-out duration-700 box-border;
}

.tab:hover {
    @apply bg-green-200;
}
.tab:focus {
    @apply outline-none;
}

.focused {
    @apply bg-green-200;
}
</style>
