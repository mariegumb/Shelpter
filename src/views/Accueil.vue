<template>
  <ion-page>
    <Header/>
    <ion-content :fullscreen="true">
      <div class="h-full flex items-center">
          <div class="w-full">
            <div class="flex justify-center">
              <button type="button"  class="rounded-full bg-purple-500 w-40 h-40 focus:outline-none focus:bg-purple-600 text-white text-2xl my-3 mx-3">
                Alerte 1
              </button>
              <button type="button" class="rounded-full bg-pink-500 w-40 h-40 focus:outline-none focus:bg-pink-600 text-white text-2xl my-3 mx-3">
                Alerte 2
              </button>
            </div>
            <div class="flex justify-center">
              <button type="button" class="rounded-full bg-blue-500 w-40 h-40 focus:outline-none focus:bg-blue-600 text-white text-2xl my-3 mx-3">
                Alerte 3
              </button>
            </div>
          </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonTitle , IonContent } from '@ionic/vue';
import * as allIcons from 'ionicons/icons';
import Header from '@/components/Header.vue';

export default  {
  name: 'Accueil',
  components: { IonPage, Header, IonContent,  }
}
</script>