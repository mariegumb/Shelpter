<template>
  <ion-page>
    <Header/>
    <ion-content :fullscreen="true">
      <div class="h-full flex items-center">
          <div class="w-full grid grid-cols-2">
            <div :class="{'col-span-2 text-center' : alerts.length % 2 === 1 && index === alerts.length -1}" v-for="(alert, index) in alerts" v-bind:key="index">
              <button @click="activateAlert(alert)" type="button" class="rounded-full w-40 h-40 focus:outline-none text-white text-2xl my-3 mx-3" :class="alert.color + ' focus:' + alert.color.replace('500','600')">
                {{alert.name}}
              </button>
            </div>
          </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/Header';
import {get} from '@/composables/storage'
import { emitter } from '@/emitter';
import { socket } from '@/composables/useSocket'

export default  {
  name: 'Accueil',
  components: { IonPage, Header, IonContent },
  data(){
    return {
      alerts: []
    }
  },
  async created(){
    const login = await get('login');
    socket.emit('login',login);
    this.fetchAlerts()
  },
  updated(){
      this.fetchAlerts()
  },
  methods:{
    async fetchAlerts(){
      this.alerts = await get('alerts')
    },
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