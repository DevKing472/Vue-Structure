const WalletsView = {
    template: 
    `
    <section class="container">
        <h2>Wallets</h2>
        <Wallet
        v-for="wallet in wallets"
        :key="wallet.id"
        :wallet="wallet"
        ></Wallet>        
    </section>
    `,
    data(){
        return {
            wallets: [],
        }
    },
    created(){
        ajax(`wallets?token=${store.token}`)
        .then(async r => this.wallets = await r.json());
    },
}