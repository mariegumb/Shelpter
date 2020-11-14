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
          <ion-title size="large">Securi'tel</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Connexion</ion-card-subtitle>
          <ion-card-title>Vos Identifiants</ion-card-title>
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
              <div class="text-right">
                <span class="text-blue-500">Pas encore de compte ?</span>
              </div>
            </router-link>
            <div class="mt-4 text-right">
              <router-link to="/accueil">
                <ion-button expand="block">Se connecter</ion-button>
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