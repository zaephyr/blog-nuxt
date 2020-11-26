<template>
    <div :class="[{ 'w-20 mr-1': loginShow }]">
        <transition name="mainHeader">
            <div v-if="!loginShow" class=" slidein text-xl text-center flex items-center w-16 justify-between mr-5">
                <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="header-btn" @click="toggleLogin" />
                <font-awesome-icon :icon="['fas', 'user-plus']" class="header-btn" @click="toggleSignup" />
            </div>
        </transition>
        <transition name="loginForm">
            <form
                v-if="loginShow"
                class=" slidein flex absolute top-0 right-0 w-1/2 sm:w-1/3 mt-4 h-16 "
                @submit.prevent="onLogin()"
            >
                <div class="ml-auto w-40">
                    <input
                        v-model="userInfo.username"
                        class="form-cell h-6"
                        id="username"
                        name="username"
                        required
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        v-model="userInfo.password"
                        class="form-cell h-6 mr-2"
                        id="password"
                        name="password"
                        required
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="********"
                    />
                    <font-awesome-icon
                        v-if="showPassword"
                        class="eyes text-xs text-green-300"
                        :icon="['fas', 'eye']"
                        @click="showPassword = !showPassword"
                    />
                    <font-awesome-icon
                        v-if="!showPassword"
                        class="eyes text-xs  text-green-300"
                        :icon="['fas', 'eye-slash']"
                        @click="showPassword = !showPassword"
                    />
                    <span v-if="errors"> {{ errors }}</span>
                </div>
                <button class="btn" type="submit">
                    Login
                </button>
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="header-btn" @click="toggleLogin" />
            </form>
        </transition>
        <transition name="signup_form">
            <SignUpForm
                v-if="signupShow"
                :toggleLogin="toggleLogin"
                :toggleSignup="toggleSignup"
                class="absolute top-0 left-0 mx-auto w-screen h-screen bg-green-700 bg-opacity-75 "
            />
        </transition>
    </div>
</template>

<script>
import { required, username, minLength } from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            showPassword: false,
            loginShow: false,
            signupShow: false,
            userInfo: {
                username: 'zaephyr',
                password: '00zero00',
            },
            loading: false,
            errors: false,
        };
    },
    validations: {
        userInfo: {
            username: {
                required,
                username,
                minLength: minLength(3),
            },
            password: {
                required,
                minLength: minLength(8),
            },
        },
    },
    methods: {
        toggleLogin() {
            this.loginShow = !this.loginShow;
        },
        toggleSignup() {
            this.signupShow = !this.signupShow;
        },

        async onLogin() {
            try {
                const { data, token } = await this.$axios.$post('/auth/login', {
                    username: this.userInfo.username,
                    password: this.userInfo.password,
                });
                await this.$store.commit('auth/SET_TOKEN', token);
                await this.$store.commit('auth/SET_USER', data.user);
                const { form } = this.$route.query;
                if (form) {
                    await this.$router.push({ path: '/blogs' });
                } else {
                    await this.$router.push({
                        path: '/users/me',
                        params: {
                            user: {
                                id: data.user._id,
                                username: data.user.username,
                            },
                        },
                    });
                }
            } catch (e) {
                alert('Error!');
            }
        },
    },
};
</script>

<style lang="scss">
$t-duration: 800ms;
$t-delay: 300ms;

.eyes {
    transform: translate(3px, -37px);
}

input[type='text'] {
    padding-left: 20px;
    max-width: calc(100% - 20px);
}

input[type='password'] {
    padding-left: 20px;
    max-width: calc(100% - 20px);
}

.slidein {
    z-index: 100;
    transition: all 0.7s ease-in-out;
}

.loginForm-enter,
.loginForm-leave-active {
    right: -100%;
}

.mainHeader-leave,
.mainHeader-enter-active {
    top: -100%;
}

.signup_form-enter-active,
.signup_form-leave-active {
    transition-duration: $t-duration * 2;

    &::before,
    &::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
        display: block;
        width: 100%;
        height: 50%;
        transition-property: opacity, transform;
        transition-timing-function: ease-in-out;
    }

    &::before {
        background-color: #c6f6d5;
        opacity: 0.8;
    }

    &::after {
        top: 50%;
        background-color: #c6f6d5;
        opacity: 0.8;
    }
}

.signup_form-leave {
    &::before,
    &::after {
        transform: scaleX(0);
    }
}

.signup_form-leave-active {
    &::before {
        transition-duration: $t-duration;
    }

    &::after {
        transition-duration: $t-duration - $t-delay;
        transition-delay: $t-delay;
    }
}

.signup_form-leave-to {
    &::before,
    &::after {
        transform: scale(1);
        transform-origin: left;
    }
}

.signup_form-enter {
    &::before,
    &::after {
        transform: scaleX(1);
    }
}

.signup_form-enter-active {
    &::before {
        transition-duration: $t-duration;
    }

    &::after {
        transition-duration: $t-duration - $t-delay;
        transition-delay: $t-delay;
    }
}

.signup_form-enter-to {
    &::before,
    &::after {
        transform: scaleX(0);
        transform-origin: right;
    }
}
</style>
