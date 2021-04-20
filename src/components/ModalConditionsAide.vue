<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">


        <div class="flex flex-wrap justify-center">
            <ion-button @click="onCancel" color="light">Fermer</ion-button>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController } from '@ionic/vue';
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ModalConditionsAide',
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
        onDismiss(result){
            modalController.dismiss(result);
        },
    }
});
</script>

<style>

.background-image{
    background-image: url("../../public/assets/image/rue.jpg") ;
    background-size: cover;
    height: 1000px;
  }

  .ion-color-logo {
    --ion-color-base: #655EA9;
    --ion-color-base-rgb: 101, 94, 169;
    --ion-color-contrast: #FFFFF;
    --ion-color-contrast-rgb: 0,0,0;
    --ion-color-shade: #553c9a;
    --ion-color-tint: #553c9a;
  }

</style>