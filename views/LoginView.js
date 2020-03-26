const LoginView = {
    template:
        `
    <section class="container">    
        <div class="login-panel">
            <h2>Login</h2>
            <form method="post"  @submit.prevent="validLogin">
            <article class="form-group">
                <label>Username</label>
                <input type="text" v-model="login.username" class="form-control" autofocus>            
            </article>
            <article class="form-group">
                <label>Password</label>
                <input type="password" v-model="login.password" class="form-control">            
            </article>
            <article class="form-group">
                <button class="btn btn-success" id="btn-login">Login</button>
            </article>
            </form>
        </div>
    </section>
    `,
    data() {
        return {
            login: {
                username: undefined,
                password: undefined,
            }
        }
    },
    methods: {
        validLogin() {
            el('#btn-login').disabled = true;
            if (this.login.username === 'admin' && this.login.password === 'admin') {
                this.$emit('update-login', true);
                store.token = 'admin';
                localStorage.token = 'admin';
                this.$router.push({name: 'wallets'});
                el('#btn-login').disabled = true;
            } else {
                alert("Datos de acceso incorrectos");
                el('#btn-login').disabled = false;
            }
        }

    }
}
