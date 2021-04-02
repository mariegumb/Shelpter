<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
          <div>
            <div class="flex w-full">
              <div class="rounded-full h-24 w-24 bg-center bg-cover mt-3 ml-3" id="profil">
              </div>
              <div class="flex-grow px-1 py-3">
                  <div class="flex justify-center">
                    <div CLASS="w-1/12"></div>
                    <div CLASS="w-10/12 text-center">
                      <span class="text-xl inline-block bg-purple-100 text-purple-600 py-1 px-2 rounded-lg ">
                      Mini Justicier
                    </span>
                    </div>
                    <div class="w-1/12 flex justify-end">
                      <svg class="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
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
          <ion-button  @click="deconnect" color="purple">Déconnexion</ion-button>
          
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import Header from '@/components/Header';
import {brushOutline} from "ionicons/icons";
import { remove } from '@/composables/storage';
import { useRouter } from 'vue-router';

import {addNewToGallery} from '../services/camera'



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
    }
  }
}
</script>


<style>
#profil{
  background-image: url("../../public/assets/image/Profil.png");
}



</style>