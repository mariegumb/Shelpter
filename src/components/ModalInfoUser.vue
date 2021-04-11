<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div>
            <div>
                {{user.login}}
            </div>
            <div>
                <ion-button color="primary" @click="supprimerRole">supprimer le {{role}}</ion-button>
            </div>
        </div>
        <div class="flex justify-center">
            <ion-button @click="onCancel" color="light">Cancel</ion-button>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController } from '@ionic/vue';
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ModalInfoUser',
    props: {
        title: String,
        user: {},
        role: String
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton },
    data(){
        return{
            users: [],
            usersFiltred: [],
        }
    },
    methods:{
        onCancel(){
            this.onDismiss("cancel")
        },
        onApply(){
            this.onDismiss("apply")
        },
        onDismiss(result){
            modalController.dismiss(result);
        },
        supprimerRole(){
            this.onDismiss({action: 'supprimer', role: this.role, login: this.user.login})
        }
    },
});
</script>