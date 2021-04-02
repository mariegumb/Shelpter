<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div style="display:flex;justify-content:center;">
            <ion-button @click="onCancel" color="light">Cancel</ion-button>
            <ion-button @click="onApply">Apply</ion-button>
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
        },
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton },
    data(){
        return{

        }
    },
    methods:{
        onCancel(){
            //si cest annule
            this.onDismiss("cancel")
        },
        onApply(){
            //si cest valider
            this.onDismiss("apply")
        },
        onDismiss(result){
            modalController.dismiss(result);
        },
    }
});
</script>