<template>
  <ion-page>
    <Header/>
      <ion-content :fullscreen="true">
        <div v-if="!alertEnCours" class="h-full flex items-center">
            <div  class="w-full grid grid-cols-2">
              <div :class="{'col-span-2 text-center' : alerts.length % 2 === 1 && index === alerts.length -1}" v-for="(alert, index) in alerts" v-bind:key="index">
                <button @click="activateAlert(alert)" type="button" class="rounded-full w-40 h-40 focus:outline-none text-white text-2xl my-3 mx-3" :class="alert.color + ' focus:' + alert.color.replace('500','600')" v-if="alert!==null">
                  {{alert.name}}
                </button>
              </div>
            </div>              
        </div>
        <div v-else class="h-full flex p-4">
          <div class="text-red-500 font-bold">
              Vous avez une alerte en cours !
              <p>
              {{alertEnCours}}
              </p>
              <button class="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600" @click="cancelAlert()">terminer l'alerte</button>
            </div>
        </div>
      </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/Header';
import {get,set} from '@/composables/storage'
import { emitter } from '@/emitter';
import { socket } from '@/composables/useSocket'
import { getAllAlerts, updateAlert } from '@/composables/mongoApi';
import { getUserByLogin } from '@/composables/mongoApi';


export default  {
  name: 'Accueil',
  components: { IonPage, Header, IonContent },
  data(){
    return {
      alerts: [],
      notifications: [],
      currentUser: null
    }
  },
  async created(){
    const login = await get('login');
    socket.emit('login',login);
    if(login){
      this.currentUser = await getUserByLogin(login);
    }
    this.fetchAlerts()
    this.getNotifications();
  },
  computed:{
    alertEnCours(){
      if(this.notifications.length > 0 && this.currentUser){
        return this.notifications.find(a => a.status === 1 && a.user === this.currentUser.login)
      } else {
        return null
      }
    } 
  },
  updated(){
      this.fetchAlerts()
  },
  methods:{
    async fetchAlerts(){
      this.alerts = await get('alerts')
    },
    async getNotifications(){
      try{
          this.notifications = await getAllAlerts();
      }
      catch(err){
          console.log(err);
          throw err;
      }
    },
    async cancelAlert(){
      const res = await updateAlert({alertId : this.alertEnCours._id, status: 0})
      console.log(res)
    }
  },
  setup(){
    const activateAlert = (alert) => {
      emitter.emit('alert', alert)
    }

    return{
      activateAlert,
    }
  },
}
</script>