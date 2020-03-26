const store = {
    token: localStorage.token ? localStorage.token : undefined,
    login: !!localStorage.token,
    logout() {
        localStorage.removeItem('token');
        return this.token = undefined;
    }
};
