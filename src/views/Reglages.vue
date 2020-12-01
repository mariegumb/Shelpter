<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
          <div class="w-full px-6 py-10 grid grid-rows-1 gap-5">
            <button-alerte chip="bg-purple-500">Alerte 1</button-alerte>
            <button-alerte chip="bg-pink-500">Alerte 2</button-alerte>
            <button-alerte chip="bg-blue-500">Alerte 3</button-alerte>
            <button class="bg-gray-300 w-full h-20 rounded-full flex items-center justify-center text-4xl focus:outline-none">
              <ion-icon :icon="addOutline"></ion-icon>
            </button>
          </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonTitle } from '@ionic/vue';
import Header from '@/components/Header.vue';
import ButtonAlerte from "@/components/buttonAlerte";
import {addOutline} from 'ionicons/icons';


export default {
    name:"Reglages",
    components: {ButtonAlerte, IonPage, IonContent, Header,  },
  setup() {
    return {
      addOutline,
    }
  }
}
</script>