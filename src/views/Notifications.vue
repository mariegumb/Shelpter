<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <div v-for="alert in alerts" v-bind:key="alert.id">
                <div className="btnAlert" v-if="alert.user != this.user">
                    <div className="status1" v-if="alert.status === 1" @click="clickAlert(alert)">
                        <div>{{alert.user}} need some help</div>
                        <div>{{alert.message}}</div>
                    </div>
                    <div className="status2" v-if="alert.status === 2">
                        <div>{{alert.user}} need some help</div>
                        <div>{{alert.message}}</div>
                    </div>
                </div>
            </div>
            <ion-button @click="this.getAlerts" color="purple">Refresh</ion-button>
            <!--<ion-button  @click="sendNotif" color="purple">Send a notification</ion-button>-->
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import Header from '@/components/Header';
import axios from 'axios';
import { getAddAlertUrl } from '@/composables/mongoApi';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { get, set } from '@/composables/storage';
import { useRouter } from 'vue-router';

export default {
    name:"Notifications",
    components: {IonPage, IonContent, Header, IonButton },
    data(){
        return{
            user: null,
            alerts: []
        }
    },
    setup(){
        const localNotifications = LocalNotifications;
        const router = useRouter();
        return {
            localNotifications,
            router
        }
    },
    methods:{
        async getAlerts(){
            try{
                this.alerts = await (await axios.get(getAddAlertUrl())).data;
                this.alerts.push({user: 'test', message: 'test', status: 2})
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
        },
        async clickAlert(alert){
            console.log(alert)
            await set('help',alert);
            this.router.replace('/tabs/map')
        }
    },
    async created(){
        this.getAlerts();
        this.user = await get('login');
    },
    updated(){
        this.getAlerts();
    }
}
</script>
<style scoped>
.btnAlert{
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 10px;
    box-shadow: 1px 1px grey;
    border-radius: 10px;
}

.status1{
    background-color: #d9b5e6;
    width:100%;
    border-radius: 10px;
}

.status2{
    background-color: #b5e6c5;
    width: 100%;
    border-radius: 10px;
}
</style>