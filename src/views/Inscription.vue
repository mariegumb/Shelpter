<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inscription</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Inscription</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>

        <ion-card-content>
          <ion-item class="ion-no-padding">
            <ion-input class="pl-0" placeholder="Nom"></ion-input>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-input class="pl-0" placeholder="Prénom"></ion-input>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-input class="pl-0" placeholder="Numero de téléphone"></ion-input>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-input class="pl-0" placeholder="Mail"></ion-input>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-input placeholder="Mot de passe" type="password"></ion-input>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-input placeholder="Confirmation mot de passe" type="password"></ion-input>
          </ion-item>
          <router-link to="/login">
            <ion-button>S'inscrire</ion-button>
          </router-link>
        </ion-card-content>

      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonInput, IonCardContent } from '@ionic/vue';

export default  {
  name: 'Inscription',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonButton, IonInput, IonCardContent}
}
</script>