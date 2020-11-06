<template>
  <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full relative">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <font-awesome-icon :icon="['fas', 'times']" class="header-btn absolute top-0 right-0 mt-2 mr-2" @click="toggleSignup" />
                    <form action="/users/signup" method="POST">
                                        <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Username" />

                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="passwordConfirm"
                        placeholder="Confirm Password" />

                    <button
                        type="submit"
                        class="w-full text-center py-3 rounded bg-green btn hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>

                    </form>

                    <div class="text-center text-xs text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-gray-400 mt-2">
                    Already have an account? 
                    <div class="no-underline border-b border-gray-200 text-gray-200 cursor-pointer inline-block" @click="toggle">
                        Log in
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    props: ["toggleSignup", "toggleLogin"],
    methods: {
        toggle() {
            this.toggleLogin()
            this.toggleSignup()
        }
    }
}
</script>

<style>

</style>