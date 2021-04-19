<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div class="m-7 mt-8">
            <div class="px-3">
                <span>
                    Veuillez entrer le login de l'utilisateur qui vous est venu en aide
                </span>
            </div>
            <div>
                <ion-item class="text-purple-600">
                    <ion-label position="floating">Login</ion-label>
                    <ion-input type="search" @ionChange="onChangeSearch"/>
                </ion-item>
            </div>
            <ion-list>
                <ion-item @click="onApply(user.login)" v-for="user in usersFiltred" v-bind:key="user.id">
                    <ion-label>{{user.login}}</ion-label>
                </ion-item>
            </ion-list>
            <div class="flex justify-center mt-5">
                <ion-button @click="onCancel" color="light">Fermer</ion-button>
            </div>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController, IonInput, IonLabel, IonItem } from '@ionic/vue';
import { defineComponent } from "vue";
import { getUsers } from '@/composables/mongoApi';

export default defineComponent({
    name: 'ModalAddProtect',
    props: {
        title: String,
        role: String,
        myLogin: String,
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton, IonInput, IonLabel, IonItem },
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
        onApply(login){
            this.onDismiss({login: login})
        },
        onDismiss(result){
            modalController.dismiss(result);
        },
        onChangeSearch(event){
            if(event.detail.value === ''){
                this.usersFiltred = [];
            }
            else{
                const filtred = [];
                for(const user of this.users){
                    if(user.login.includes(event.detail.value) && user.login !== this.myLogin){
                        filtred.push(user)
                    }
                }
                this.usersFiltred = filtred;
            }
        },
    },
    async beforeMount(){
        this.users = await getUsers();
    }
});
</script>