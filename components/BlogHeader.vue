<template>
    <div class="w-full bg-green-200 h-24 flex sm:justify-between text-green-700 items-center">
        <NuxtLink to="/blogs" class="ml-4 "
            ><font-awesome-icon :icon="['fas', 'home']" class="text-3xl header-btn"
        /></NuxtLink>
        <NuxtLink to="/blogs" class="absolute logo"
            ><font-awesome-icon :icon="['fas', 'wind']" class="text-6xl header-btn no-border hidden sm:block"
        /></NuxtLink>
        <div v-if="_loggedIn" class="text-xl flex items-center">
            <p>
                Hello,
                <NuxtLink
                    to="/users/me"
                    class="transition  duration-500 ease-in cursor-pointer transform  hover:underline focus:underline"
                    >{{ _user.username }}</NuxtLink
                >
            </p>
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="header-btn" @click="$logout()" />
        </div>
        <LoggedOut v-else />
    </div>
</template>

<script>
export default {};
</script>

<style>
.logo {
    left: 46%;
}
.header-btn {
    @apply border-2 border-green-200 h-auto p-2 box-content cursor-pointer rounded-lg;
}

.header-btn:hover {
    @apply border-green-800 ease-linear duration-700 rotate-12;
}
</style>
