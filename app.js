const app = new Vue({
    el: '#app',
    data() {
        return {
            login: store.login,
        }
    },
    methods: {
        changeStateLogin(e) {
            this.login = e;
        }
    },
    router,
});
