export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
    async nuxtServerInit(store) {
        const token = this.$cookies.get('token');
        if (token) {
            try {
                const { data } = await this.$axios.$get('/users/me');
                await store.commit('auth/SET_TOKEN', token);
                await store.commit('auth/SET_USER', data.user);
            } catch (e) {
                await store.commit('auth/LOGOUT');
                console.log(e);
            }
        } else {
            await store.commit('auth/LOGOUT');
        }
    },
};
