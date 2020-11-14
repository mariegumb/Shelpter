<template>
  <ion-page>
    <ion-header >
      <ion-toolbar >
          <ion-title >Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class="text-purple-600 text-center pt-2">Localiz'</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Connexion</ion-card-subtitle>
          <ion-card-title color="purpledark">Vos Identifiants</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item class="ion-no-padding">
            <ion-input class="pl-0" placeholder="Mail"></ion-input>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-input placeholder="Mot de passe" type="password"></ion-input>
          </ion-item>
          <div class="mt-4 p-2">
            <router-link to="/inscription">
              <div class="text-right" >
                <span class="text-purple-6git00">Pas encore de compte ?</span>
              </div>
            </router-link>
            <div class="mt-4 text-right">
              <router-link to="/accueil">
                <ion-button expand="block" color="purple">Se connecter</ion-button>
              </router-link>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';

export default  {
  name: 'Login',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonInput, IonItem, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle }
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


.ion-color-purpledark {
  --ion-color-base: #553c9a;
  --ion-color-base-rgb: 85, 60, 154;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #553c9a;
  --ion-color-tint: #553c9a;
}

</style>