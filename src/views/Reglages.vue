<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
          <div class="w-full px-6 py-10 grid grid-rows-1 gap-5">
            <div v-for="(pref, index) in prefs" v-bind:key="pref.name">
              <button-alerte v-bind:alert="pref" v-bind:index="index" v-bind:refresh="this.getPrefs"></button-alerte>
            </div>
            <button @click="newAlert" class="bg-gray-300 w-full h-20 rounded-full flex items-center justify-center text-4xl focus:outline-none">
              <ion-icon :icon="addOutline"></ion-icon>
            </button>
          </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonIcon, modalController } from '@ionic/vue';
import Header from '@/components/Header';
import ButtonAlerte from "@/components/buttonAlerte";
import {addOutline} from 'ionicons/icons';
import {get, set} from '@/composables/storage';
import ModalAlertProperty from '@/components/ModalAlertProperty'

export default {
  name:"Reglages",
  components: {ButtonAlerte, IonPage, IonContent, Header, IonIcon },
  data(){
    return{
      prefs: []
    }
  },
  setup() {
    return {
      addOutline,
    }
  },
  beforeMount(){
    this.getPrefs();
  },
  methods:{
    async getPrefs(){
      this.prefs = await get('alerts');
    },

    async newAlert(){
      const modal = await modalController.create({
        component: ModalAlertProperty,
        componentProps:{
          title: 'Nouvelle alerte'
        }
      });

      await modal.present();

      const result = await modal.onDidDismiss();
      this.closedModalHandler(result);
    },

    closedModalHandler(result){
      if(result.data === "cancel"){
        console.log("cancelled");
      }
      else{
        this.prefs.push(result.data);
        set('alerts',this.prefs);
      }
    }
  }

}
</script>