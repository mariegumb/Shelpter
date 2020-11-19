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
          <ion-title size="large" class="text-purple-600 text-center">Inscription</ion-title>
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
          <ion-button @click="()=>router.go(-1)" color="purple" >S'inscrire</ion-button>
        </ion-card-content>

      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
 IonItem, IonLabel, IonButton, IonInput, IonCardContent, IonCard } from '@ionic/vue';
import { useRouter } from 'vue-router';

export default  {
  name: 'Inscription',
  components: { IonHeader, IonToolbar, IonTitle, IonContent,
   IonPage, IonItem, IonButton, IonInput, IonCardContent, IonCard},
  
  setup(){
    const router = useRouter();
    
    return {
      router
    }
  }
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

</style>