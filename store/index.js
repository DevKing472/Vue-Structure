const store = { 
    token: localStorage.token ? localStorage.token : undefined,
    login: localStorage.token ? true : false,
    logout(){
        localStorage.removeItem('token');
        return this.token = undefined;
    }
}