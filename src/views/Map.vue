<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <div>
              <div v-if="coords">
                <p class="pl-3 pt-2">longitude: {{coords.longitude}}</p>
                <p class="pl-3">latitude: {{coords.latitude}}</p>
              </div>
            </div>

            <div id="map" style="height:400px"></div>

            <ion-button @click="centerMap" color="purple">Recentrer la carte</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import Header from '@/components/Header';
import { Plugins } from '@capacitor/core';
import { socket } from '@/composables/useSocket'
import { Map, tileLayer, marker } from 'leaflet';
import { defineComponent } from 'vue';
const { Geolocation } = Plugins;

export default defineComponent({
    name:"Map",
    components: {IonPage, IonContent, Header, IonButton },
    data(){
      return {
        coords: null,
        map: null,
        myPos: null,
        users: [],
        watch: null
      }
    },
    methods:{
      followLocation(){
        this.watch = Geolocation.watchPosition({enableHighAccuracy: true}, (data,err) => {
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
          this.coords = data.coords;
          this.myPos = marker([data.coords.latitude,data.coords.longitude]);
          this.myPos.addTo(this.map);
          this.map.setView([data.coords.latitude,data.coords.longitude], 15);
          //this.followLocation();
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

      /*async sendPos(){
        console.log('searching');
        const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
        console.log('founded');
        const location = position.coords;
        socket.emit('sendPos',location.latitude,location.longitude);
      },*/

      centerMap(){
        this.map.setView([this.coords.latitude,this.coords.longitude]);
      },

      ionViewWillLeave(){
        if(this.watch != null){
          Geolocation.clearWatch({id: this.watch});
        }
      },

      ionViewDidEnter(){
        this.followLocation();
      }
    },

    mounted(){
      this.initMap();
      socket.on('receivePos',(id,login,lat,long)=>{
        console.log("receive : "+lat+" "+long);
        marker([lat,long]).addTo(this.map)
      });
      this.map.invalidateSize();
      //this.followLocation();
    },

    updated(){
      this.map.invalidateSize();
    }
})
</script>