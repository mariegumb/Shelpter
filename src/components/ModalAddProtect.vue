<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div class="m-7 mt-8">
            <div>
                <ion-item class="text-purple-600">
                    <ion-label position="floating">Login</ion-label>
                    <ion-input type="search" @ionChange="onChangeSearch"/>
                </ion-item>
            </div>
            <div v-for="user in usersFiltred" v-bind:key="user.id">
                <button @click="onApply(user.login)">{{user.login}}</button>
            </div>
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
        already: []
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
            this.onDismiss({role: this.role, login: login})
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
                    if(user.login.includes(event.detail.value) && user.login !== this.myLogin && !this.already.includes(user.login)){
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