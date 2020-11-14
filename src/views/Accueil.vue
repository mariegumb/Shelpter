<template>
  <ion-app>
    <ion-menu side="start" content-id="main-content" >
      <ion-header>
        <ion-toolbar translucent class="text-purple-600 ">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-icon name="mail" slot="start"></ion-icon>
            <ion-label>Mon Compte</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon name="paper-plane" slot="start"></ion-icon>
            <ion-label>Parainage</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon name="heart" slot="start"></ion-icon>
            <ion-label>Régalges</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon name="archive" slot="start"></ion-icon>
            <ion-label>Mes préférences</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon name="trash" slot="start"></ion-icon>
            <ion-label>Mon bracelet</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div class="ion-page" id="main-content">
      <ion-header collapse="condense">
        <ion-toolbar >
          <ion-buttons slot="start">
            <ion-menu-button color="purple"></ion-menu-button>
          </ion-buttons>
          <ion-title size="large" color="purple" class=" text-center">Localiz'</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      </ion-content>
    </div>
  </ion-app>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import * as allIcons from 'ionicons/icons';

export default  {
  name: 'Accueil',
  components: { IonHeader, IonToolbar, IonTitle, IonContent,  }
}

</script>

<style>

.ion-color-purple {
  --ion-color-base: #805ad5;
  --ion-color-base-rgb: 107,70,193;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #6b46c1;
  --ion-color-tint: #6b46c1;
}

.ion-color-purplelight {
  --ion-color-base: #9f7aea;
  --ion-color-base-rgb: 159,122,234;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #6b46c1;
  --ion-color-tint: #6b46c1;
}

</style>

