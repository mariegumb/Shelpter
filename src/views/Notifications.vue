<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <div v-for="alert in JSON.parse(JSON.stringify(alerts)).reverse()" v-bind:key="alert.id">
                <div className="m-2" v-if="alert.user != this.user">
                    <!-- status 1 : alerte en cours -->
                    <div class="p-3 w-full rounded-lg bg-red-300 text-red-900 text-center" v-if="alert.status === 1" @click="clickAlert(alert)">
                        <div class="font-bold">{{alert.user}} a besoin d'aide !</div>
                        <div class="italic">"{{alert.message}}"</div>
                    </div>
                    <!-- status 2 : alerte passee pour garder une trace -->
                    <div class="p-3 w-full rounded-lg bg-gray-300 text-gray-700 text-center" v-if="alert.status === 0">
                        <div class="italic mb-2 text-md">Alerte terminée</div>
                        <div class="text-xs">{{alert.user}} a besoin d'aide</div>
                        <div class="text-xs italic">"{{alert.message}}"</div>
                    </div>
                </div>
            </div>
            <ion-button @click="this.getAlerts" color="purple" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-purple-600 hover:bg-purple-50">Refresh</ion-button>
            <!--<ion-button  @click="sendNotif" color="purple">Send a notification</ion-button>-->
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import Header from '@/components/Header';
import { getAllAlerts } from '@/composables/mongoApi';
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
                this.alerts = await getAllAlerts();
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
        await this.getAlerts();
        this.user = await get('login');
    },
    async updated(){
        await this.getAlerts();
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
</style>