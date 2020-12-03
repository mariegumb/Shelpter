<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <ion-title @click="getUsers">Notifications</ion-title>
            <div v-for="user in users" v-bind:key="user.id">{{user}}</div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonTitle } from '@ionic/vue';
import Header from '@/components/Header.vue';
import axios from 'axios';

export default {
    name:"Notifications",
    components: {IonPage, IonContent, Header, IonTitle },
    setup(){
        return axios
    },
    data(){
        return{
            users: null
        }
    },
    methods:{
        async getUsers(){
            try{
                this.users = await axios.get('localhost:8080/users',{
  mode: 'cors',
  credentials: 'include'
});
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