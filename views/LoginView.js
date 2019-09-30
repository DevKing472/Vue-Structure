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
    data(){
        return {
            login: {
                username: undefined,
                password: undefined,
            }
        }
    },
    methods: {
        validLogin(){
            el('#btn-login').disabled = true;

            ajax('login', 'POST', this.login)
            .then(async r => {
                let data = await r.json();
                if(r.status == 200){
                    this.$emit('update-login', true);
                    store.token = data.token;
                    localStorage.token = data.token;
                    this.$router.push({name: 'wallets'});
                    el('#btn-login').disabled = false;
                }else{
                    alert(data.message);
                    el('#btn-login').disabled = false;
                }

            })
        }
        
    }
}