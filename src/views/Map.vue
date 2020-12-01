<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <div>
              <ion-button  @click="getLocation" color="purple">Voir ma localisation</ion-button>
              <div v-if="loading">
                <ion-progress-bar type="indeterminate" color="purple"></ion-progress-bar>
                <p>Recuperation de la position...</p>
              </div>
              <div v-if="coords">
                <p class="pl-3 pt-2">longitude: {{coords.longitude}}</p>
                <p class="pl-3">latitude: {{coords.latitude}}</p>
              </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonProgressBar, IonButton } from '@ionic/vue';
import Header from '@/components/Header.vue';
import { Geolocation } from '@ionic-native/geolocation';

export default {
    name:"Map",
    components: {IonPage, IonContent, Header, IonProgressBar, IonButton },
    data(){
      return {
        coords: null,
        loading: false
      }
    },
    methods:{
      async getLocation(){
        this.loading = true
        try{
          const res = await Geolocation.getCurrentPosition()
          this.coords = res.coords
        } catch (e){
          console.error(e)
        }
        this.loading = false

        const watch = Geolocation.watchPosition();
        watch.subscribe((data) => {
          this.coords = data.coords
        });
      }
  }

}
</script>