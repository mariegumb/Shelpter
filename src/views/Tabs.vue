<template>
  <ion-page>
    <ion-tabs >
      <ion-tab-bar slot="bottom" >
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


<style>

.ion-color-purple {
  --ion-color-base: #805ad5;
  --ion-color-base-rgb: 107, 70, 193;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0, 0, 0;
  --ion-color-shade: #6b46c1;
  --ion-color-tint: #6b46c1;
}

ion-tab-button {
  --color-selected: #805ad5;
}

.ion-color-purpledark {
  --ion-color-base: #553c9a;
  --ion-color-base-rgb: 85, 60, 154;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #4c1e94;
  --ion-color-tint: #4c1e94;
}

.ion-color-purplelight {
  --ion-color-base: #c4b6fd;
  --ion-color-base-rgb: 196, 182, 253;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #805ad5;
  --ion-color-tint: #805ad5;
}

</style>