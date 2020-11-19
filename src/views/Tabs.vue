<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="map" href="/tabs/map">
          <ion-icon :icon="location" />
          <ion-label>Map</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="notifications" href="/tabs/notifications">
          <ion-icon :icon="notifications" />
          <ion-label>Notifications</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="accueil" href="/tabs/accueil">
          <ion-icon :icon="home" />
          <ion-label>Accueil</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="reglages" href="/tabs/reglages">
          <ion-icon :icon="options" />
          <ion-label>Réglages</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profil" href="/tabs/profil">
          <ion-icon :icon="person" />
          <ion-label>Profil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { home, options, person, notifications, location } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      home, 
      options, 
      person,
      notifications,
      location
    }
  }
}
</script>