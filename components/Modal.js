Vue.component('Modal',{
    props: ['modal'],
    template:
    `
        <section class="modal-dialog" :class="{'modal-show' : modal.show}">
            <article class="modal">
                <header class="modal-header">
                    <span class="close" @click.prevent="closeModal">&times;</span>
                   <h2>{{ modal.title }}</h2>                    
                </header>
                <section class="modal-body">
                    <slot name="modal-body">Slot body</slot>
                </section>
             </article>
        </section>
    `,
    methods:{
        closeModal(){
            this.modal.show = false;
            el('body').classList.remove('modal-open');
        }
    }
});