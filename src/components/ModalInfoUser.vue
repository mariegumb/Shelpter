<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div>
            <div>
                <div>
                    <img v-if="user.photo !== 'photoNotFound'" v-bind:src="user.photo" class="rounded-full h-24 w-24"/>
                    <svg v-else class="h-24 w-24 text-purple-600 rounded-full" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <div>
                    {{user.login}}
                </div>
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