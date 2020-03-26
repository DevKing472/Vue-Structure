const MovementView = {
    template:
        `
    <section class="container">
        <div class="row a-center">
            <h2>Movements</h2>
            <div class="ml-auto">
                <button class="btn btn-success" @click.prevent="showModal">Create</button>
                <button class="btn btn-outline-danger ml-auto" @click.prevent="back">Back</button>
            </div>            
        </div>        
        
        <div class="row movements-panel">
            <div class="information-movements">
                <h3>Dinero disponible</h3>
                <p>{{avaiableMoney }}</p>
                <!-- Revisar filters en Vue Js -->
            </div>
            <div class="movements">
                <div class="filter row">                
                <a href="#" class="item-filter" @click="filter(undefined)">All</a>                    
                <a href="#"
                    @click="filter(t.name)" 
                    v-for="t in typesMovement" :class="{'entry-class' : t.id == 1, 'spending-class' : t.id == 2, 'i-owe' : t.id == 3, 'lend' : t.id == 4}" class="item-filter">{{t.name}}</a>                                    
                </div>             
                <div class="form-group ml">
                    <label for="date">Date</label>
                    <input type="date" v-model="movementFilter" id="date" class="form-control">
                </div>      
                <Movement
                    v-for="movement in filterMovements"
                    :key="movement.id"
                    :movement="movement"
                    @delete-movement="deleteMovement"
                ></Movement>
            </div>
        </div>
        
        <Modal 
            :modal="modal">            
            <form @submit.prevent="registerMovement" slot="modal-body">
                <div class="form-group">
                    <label for="amount">*Amount</label>
                    <input type="number" v-model="newMovement.amount" required placeholder="0.00$" class="form-control" id="amount">
                </div>
                <div class="form-group">
                    <label for="type">*Type</label>
                    <select v-model="newMovement.type_movement_id" required class="form-control" id="type">
                        <option disabled value="">-- Select type --</option>                                        
                        <option v-for="type in types_movement" :key="type.id" :value="type.id">{{ type.name }}</option>
                    </select>
                </div>
                <div v-if="newMovement.type_movement_id == 4" class="lend_information">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" v-model="newMovement.lend_information.name" required>
                    </div>
                    <div class="form-group">
                        <label for="number_payments">Number of payments</label>
                        <input type="number" class="form-control" id="number_payments" v-model="newMovement.lend_information.number_payments" required>
                    </div>
                    <div class="form-group">
                        <label for="date">Payment day</label>
                        <input type="date" class="form-control" id="name" v-model="newMovement.lend_information.payment_day" required>
                    </div>                    
                </div>
                <div class="form-group">
                    <label for="commentary">Commentary</label>
                    <textarea type="text" v-model="newMovement.commentary" required placeholder="Buy trash..." class="form-control" id="commentary"></textarea>
                </div>                
                <div class="form-group">
                    <label for="category">Category</label>
                    <select v-model="newMovement.category_id" class="form-control" id="category">
                        <option disabled value="">-- Select category --</option>                        
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>   
                </div>
                <div class="form-group">
                    <button class="btn btn-success">Register</button>
                </div>
            </form>                               
        </Modal>
    </section>
    `,
    data() {
        return {
            movementsInformation: {
                availableMoney: 0,
            },
            movements: [],
            categories: [],
            types_movement: [],
            modal: {
                show: false,
                title: "Create movement"
            },
            newMovement: {
                amount: '',
                type_movement_id: '',
                commentary: '',
                category_id: '',
                lend_information: {
                    name: '',
                    number_payments: '1',
                    payment_day: '',
                }
            },
            movementFilter: '',
        }
    },
    methods: {
        getMovements() {
            this.movements = [
                {
                    amount: '20000',
                    type_movement_id: 1,
                    commentary: 'Example movement',
                    category_id: 1,
                    type: {
                        name: 'type 1'
                    }
                },
                {
                    amount: '50000',
                    type_movement_id: 2,
                    commentary: 'Example movement',
                    category_id: 1,
                    type: {
                        name: 'type 2'
                    }
                },
                {
                    amount: '7000',
                    type_movement_id: 3,
                    commentary: 'Example movement',
                    category_id: 1,
                    type: {
                        name: 'type 3'
                    }
                }
            ];

            this.types_movement = [
                {
                    id: 1,
                    name: 'type 1'
                },
                {
                    id: 2,
                    name: 'type 2'
                },
                {
                    id: 3,
                    name: 'type 3'
                }
            ];

            this.categories = [
                {
                    id: 1,
                    name: 'category 1'
                },
                {
                    id: 2,
                    name: 'category 2'
                },
                {
                    id: 3,
                    name: 'category 3'
                }
            ]
        },
        back() {
            this.$router.push({name: 'wallets'});
        },
        showModal() {
            this.modal.show = true;
            el('body').classList.add('modal-open');
        },
        registerMovement() {
            this.modal.show = false;
            this.movements.push({...this.newMovement, type: {name: `type ${this.newMovement.type_movement_id}`}});
            this.newMovement = {
                amount: '',
                type_movement_id: '',
                commentary: '',
                category_id: ''
            };
            el('body').classList.remove('modal-open');
        },
        filter(id) {
            this.movementFilter = id;
        },
        deleteMovement(movement) {
            this.movements.splice(this.movements.indexOf(movement), 1);

        }
    },
    computed: {
        avaiableMoney() {
            let available = 0;
            this.movements.map(m => available += m.type_movement_id == 2 ? -float(m.amount) : int(m.amount));
            return available;
        },
        typesMovement() {
            let types_movement = [];
            this.movements.forEach(e => !types_movement.find(t => e.type.name == t.name) ? types_movement.push(e.type) : null);
            return types_movement;
        },
        filterMovements() {
            if (!this.movementFilter) return this.movements;
            if (this.movementFilter.includes('-')) return this.movements.filter(m => new Date(m.created_at).getTime() >= new Date(this.movementFilter).getTime());
            return this.movements.filter(m => m.type.name.includes(this.movementFilter));
        }
    },
    created() {
        this.getMovements();
    }
};
