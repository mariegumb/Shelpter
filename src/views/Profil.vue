<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
          <div class="bg-purple-600">
            <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
              <div class="flex items-center justify-between flex-wrap">
                <div class="w-0 flex-1 flex items-center">
                  <span class="flex p-2 rounded-lg bg-indigo-800">
                    <!-- Heroicon name: outline/speakerphone -->
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </span>
                  <p class="ml-3 font-medium text-white truncate">
                    <span class="md:hidden">
                      Soutenez nous ! 
                    </span>
                  </p>
                </div>
                <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                  <a @click="openDonation" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-purple-600 bg-white hover:bg-purple-50">
                    Faire un don
                  </a>
                </div>
                <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                  <button type="button" class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                    <!-- Heroicon name: outline/x -->
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex w-full">
              <div class="rounded-full h-24 w-24 bg-center bg-cover mt-3 ml-3" id="profil">
              </div>
              <div class="flex-grow px-1 py-3">
                  <div class="flex justify-center">
                    <div CLASS="w-1/12"></div>
                    <div CLASS="w-10/12 text-center">
                      <span class="text-xl inline-block bg-purple-100 text-yellow-500 py-1 px-2 rounded-lg ">
                      Mini Justicier
                    </span>
                    </div>
                    <div class="w-1/12 mr-2 flex justify-end">
                    <button @click="openSettings" type="button" class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                      <svg class="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    </div>
                  </div>
                <div class="flex pt-4 justify-center">
                  <div class="mx-2 text-center">
                    <span>Aidés</span>
                    <span class="block">4</span>
                  </div>
                  <div class="mx-2 text-center">
                    <span>Protégés</span>
                    <span class="block ">2</span>
                  </div>
                  <div class="mx-2 text-center">
                    <span>Protecteurs</span>
                    <span class="block ">5</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-purple-800 text-xl pl-4">
              <span>Caroline</span>
            </div>
          </div>
          <ion-button @click="deconnect" color="purple" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-purple-600 hover:bg-purple-50">Déconnexion</ion-button>         
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton, modalController } from '@ionic/vue';
import Header from '@/components/Header';
import {brushOutline} from "ionicons/icons";
import { remove } from '@/composables/storage';
import { useRouter } from 'vue-router';

import {addNewToGallery} from '../services/camera'
import ModalProfilSettings from '@/components/ModalProfilSettings.vue';
import ModalDonation from '@/components/ModalDonation.vue';



export default {
    name:"Profil",
    components: {IonPage, IonContent, Header, IonButton },
  setup() {
    const router = useRouter();
    return {
      brushOutline,
      router
    };
  },
  created(){
    addNewToGallery()
  },

  methods:{
    async deconnect(){
      await remove('login');
      await remove('mdp');
      this.router.go('/login')
    },

    async openSettings(){
      const modal = await modalController.create({
        component: ModalProfilSettings,
        componentProps:{
          title: 'Modifier le profil'
        }
      });

      await modal.present();

      const result = await modal.onDidDismiss();
      this.closedModalSettingsHandler(result);
    },

    closedModalSettingsHandler(result){
      if(result.data === "cancel"){
        console.log("cancelled");
      }
      else{
        console.log(result)
      }
    },

    async openDonation(){
      const modal = await modalController.create({
        component: ModalDonation,
        componentProps:{
          title: 'Donation'
        }
      });

      await modal.present();

      const result = await modal.onDidDismiss();
      this.closedModalDonationHandler(result);
    },

    closedModalDonationHandler(result){
      if(result.data === "cancel"){
        console.log("cancelled");
      }
      else{
        console.log(result)
      }
    },

  }
}
</script>


<style>
#profil{
  background-image: url("../../public/assets/image/Profil.png");
}



</style>