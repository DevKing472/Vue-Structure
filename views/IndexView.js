
const IndexView = {
    template: 
    `
    <section class="container">
        <h2>Hola mundo index view</h2>
    </section>
    `,
    data(){
        return {

        }
    },
    methods: {
        
    },
    created(){
        if(store.token) this.$router.push({name: 'wallets'});
    }
}