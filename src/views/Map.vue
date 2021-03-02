<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <div>
              <ion-button  @click="getLocation" color="purple">Voir ma localisation</ion-button>
              <!--<div v-if="loading">
                <ion-progress-bar type="indeterminate" color="purple"></ion-progress-bar>
                <p>Recuperation de la position...</p>
              </div>-->
              <div v-if="coords">
                <p class="pl-3 pt-2">longitude: {{coords.longitude}}</p>
                <p class="pl-3">latitude: {{coords.latitude}}</p>
              </div>
            </div>

            <div id="map" style="height:400px"></div>

            <ion-button @click="sendPos" color="purple">Envoyer sa position</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, /*IonProgressBar,*/ IonButton } from '@ionic/vue';
import Header from '@/components/Header';
import { Geolocation } from '@ionic-native/geolocation';
import { socket } from '@/composables/useSocket'
import { Map, tileLayer, marker, icon } from 'leaflet';

export default {
    name:"Map",
    components: {IonPage, IonContent, Header, /*IonProgressBar,*/ IonButton },
    data(){
      return {
        coords: null,
        loading: false,
        map: null
      }
    },
    methods:{
      getLocation(){
        /*this.loading = true
        try{
          const res = await Geolocation.getCurrentPosition()
          console.log(res);
          this.coords = res.coords
        } catch (e){
          console.error(e)
        }
        this.loading = false*/

        const watch = Geolocation.watchPosition();
        watch.subscribe((data) => {
          console.log(data)
          socket.emit('watchPosition',data.coords.longitude,data.coords.latitude);
          this.coords = data.coords
        });
      },

      async initMap(){
        const location = (await Geolocation.getCurrentPosition()).coords
        this.map = new Map('map').setView([location.latitude,location.longitude], 13);
        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        marker([location.latitude,location.longitude]).addTo(this.map);
      },

      async sendPos(){
        const location = (await Geolocation.getCurrentPosition()).coords;
        socket.emit('sendPos',location.latitude,location.longitude);
      }

    },

    mounted(){
      this.initMap();
      socket.on('receivePos',(id,lat,long)=>{
        console.log("receive : "+lat+" "+long);
        marker([lat,long]).addTo(this.map)
      });
    }
}
</script>