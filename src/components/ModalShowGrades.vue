<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">



        <div class="flex justify-center mt-3">
            <ion-button @click="onClose" color="light">Fermer</ion-button>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController } from '@ionic/vue';
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ModalProfilSettings',
    props: {
        title: {
            type: String,
            default: 'Modal'
        }
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton },
    data(){
        return{
            
        }
    },
    methods:{
        onClose(){
            //si cest annule
            this.onDismiss("close")
        },
        onDismiss(result){
            modalController.dismiss(result);
        },
    },
});
</script>