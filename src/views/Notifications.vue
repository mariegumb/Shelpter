<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <ion-title @click="getUsers">Notifications</ion-title>
            <div v-for="user in users" v-bind:key="user.id">{{user.login}}</div>
            <ion-button  @click="sendNotif" color="purple">Send a notification</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonTitle, IonButton } from '@ionic/vue';
import Header from '@/components/Header';
import axios from 'axios';
import { getUsers } from '@/composables/mongoApi';
import { LocalNotifications } from '@ionic-native/local-notifications';

export default {
    name:"Notifications",
    components: {IonPage, IonContent, Header, IonTitle, IonButton },
    data(){
        return{
            users: null
        }
    },
    setup(){
        const localNotifications = LocalNotifications;
        return {
            localNotifications
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
        },
        sendNotif(){
            this.localNotifications.schedule({
                id: 1,
                title: 'Mon titre',
                text: 'Mon texte'
            })
            console.log(this.localNotifications);
        }
    },
    created(){
        this.getUsers();
    }
}
</script>