Vue.component('Movement', {
    props: ['movement'],
    template: 
    `
    <section class="movement">
        <span class="movement-delete" @click.prevent="$emit('delete-movement', movement)">&times;</span>
        <h3 v-if="movement.lend_information">{{movement.type.name}}<span class="lend-name"> a {{movement.lend_information.name}}</span></h3>
        <h3 v-else>{{movement.type.name}}</h3>
        <h2 :class="{
        'entry-class': movement.type_movement_id == 1, 
        'spending-class' : movement.type_movement_id == 2, 
        'i-owe' : movement.type_movement_id == 3,
        'lend' : movement.type_movement_id == 4}">{{movement.amount}}</h2>
        <p v-if="movement.category" class="movement-category">{{movement.category.name}}</p>
        <p v-if="movement.commentary" class="movement-commentary">{{movement.commentary}}</p>
        <p class="movement-date">{{movement.created_at}}</p>
        <div class="movement-lend-information" v-if="movement.lend_information">           
                        
            <p><strong>Paga el </strong>{{movement.lend_information.payment_day}}</p>
        </div>
    </section>
    `
})

