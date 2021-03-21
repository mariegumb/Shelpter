<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <ion-title @click="getUsers">Notifications</ion-title>
            <div v-for="user in users" v-bind:key="user.id">{{user.login}}</div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonTitle } from '@ionic/vue';
import Header from '@/components/Header';
import axios from 'axios';
import { getUsers } from '@/composables/mongoApi';

export default {
    name:"Notifications",
    components: {IonPage, IonContent, Header, IonTitle },
    data(){
        return{
            users: null
        }
    },
    methods:{
        async getUsers(){
            try{
                this.users = await (await axios.get(getUsers())).data;
            }
            catch(err){
                console.log(err);
                throw err;
            }
        }
    },
    created(){
        this.getUsers();
    }
}
</script>