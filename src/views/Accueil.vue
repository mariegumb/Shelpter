<template>
  <ion-page>
    <Header/>
    <ion-content :fullscreen="true">
      <ion-title>Accueil</ion-title>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonTitle , IonContent } from '@ionic/vue';
import * as allIcons from 'ionicons/icons';
import Header from '@/components/Header.vue';

export default  {
  name: 'Accueil',
  components: { IonPage, Header, IonContent, IonTitle }
}
</script>