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
import { Plugins } from '@capacitor/core';
import { socket } from '@/composables/useSocket'
import { Map, tileLayer, marker, icon } from 'leaflet';
const { Geolocation } = Plugins;

export default {
    name:"Map",
    components: {IonPage, IonContent, Header, /*IonProgressBar,*/ IonButton },
    data(){
      return {
        coords: null,
        loading: false,
        map: null,
        myPos: null,
        users: []
      }
    },
    methods:{
      getLocation(){
        const watch = Geolocation.watchPosition({enableHighAccuracy: true}, (data,err) => {
          if(err){
            throw err;
          }
          console.log(data)
          socket.emit('watchPosition',data.coords.longitude,data.coords.latitude);
          this.coords = data.coords

          this.map.removeLayer(this.myPos);
          this.myPos = marker([data.coords.latitude,data.coords.longitude]);
          this.map.addLayer(this.myPos);
        });
      },

      initPosMap(){
        const getPos = Geolocation.watchPosition({enableHighAccuracy: true}, (data,err) => {
          if(err){
            throw err;
          }
          Geolocation.clearWatch({id: getPos});
          console.log(data);
          this.myPos = marker([data.coords.latitude,data.coords.longitude]);
          this.myPos.addTo(this.map);
          this.map.setView([data.coords.latitude,data.coords.longitude], 15);
        })
      },

      initMap(){
        const location = { latitude: 46.866573725968756, longitude: 2.673486775390641}
        const zoom = 5;
        this.map = new Map('map').setView([location.latitude,location.longitude], zoom);
        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.initPosMap();
      },

      async sendPos(){
        console.log('searching');
        const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
        console.log('founded');
        const location = position.coords;
        socket.emit('sendPos',location.latitude,location.longitude);
      }

    },

    mounted(){
      this.initMap();
      socket.on('receivePos',(id,lat,long)=>{
        console.log("receive : "+lat+" "+long);
        marker([lat,long]).addTo(this.map)
      });
      this.map.invalidateSize();
    },

    updated(){
      this.map.invalidateSize();
    }
}
</script>