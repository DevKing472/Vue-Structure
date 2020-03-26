const routes = [
    {
        path: '/',
        component: IndexView,
        name: 'index'
    },
    {
        path: '/login',
        component: LoginView,
        name: 'login'
    },
    {
        path: '/register',
        component: RegisterView,
        name: 'register'
    },
    {
        path: '/wallets',
        component: WalletsView,
        name: 'wallets'
    },
    {
        path: '/movements/:id',
        component: MovementView,
        name: 'movements'
    }
];

const router = new VueRouter({
    routes,
});
