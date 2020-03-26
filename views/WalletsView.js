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
    data() {
        return {
            wallets: [],
        }
    },
    created() {
        this.wallets = [
            {
                name: 'Wallet 1',
                description: 'example',
                created_at: '26-03-2020'
            },
            {
                name: 'Wallet 2',
                description: 'example',
                created_at: '26-03-2020'
            }
        ]
    },
};
