Vue.component('Wallet', {
    props: ['wallet'],
    template: `
        <section class="wallet" @click.prevent="redirect(wallet.id)">
            <h3>{{ wallet.name }}</h3>
            <p>{{ wallet.description }}</p>
            <p>{{ wallet.created_at }}</p>
        </section>
    `,
    methods: {
        redirect(id){
             this.$router.push({name: 'movements', params: {id: id}});
        }
    }
})