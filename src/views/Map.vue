<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">

            <div id="map" style="height:500px" class="mt-5"></div>

            <div class="flex justify-center">
              <ion-button @click="centerMap" color="purple">Recentrer la carte sur moi</ion-button>
            </div>
            <div class="mt-3">
              
              
              <div class="text-sm text-center text-purple-600 mt-3 flex items-center justify-between px-4">
                  <ion-label>Avertir de ma présence en tant que Justicier</ion-label>
                  <ion-toggle v-model="this.showMyPos"/>
              </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton, IonToggle, IonLabel } from '@ionic/vue';
import Header from '@/components/Header';
import { Plugins } from '@capacitor/core';
import { socket } from '@/composables/useSocket'
import { Map, tileLayer, marker, icon, popup } from 'leaflet';
import { defineComponent } from 'vue';
import { get, remove } from '@/composables/storage'
const { Geolocation } = Plugins;

export default defineComponent({
    name:"Map",
    components: {IonPage, IonContent, Header, IonButton, IonToggle, IonLabel },
    props: ['long','lat'],
    data(){
      return {
        coords: null,
        map: null,
        myPos: null,
        users: [],
        watch: null,
        showMyPos: false,
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
          this.myPos = this.getMyMarker(data.coords.latitude,data.coords.longitude);
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
          this.myPos = this.getMyMarker(data.coords.latitude,data.coords.longitude);
          this.myPos.addTo(this.map);
          this.map.setView([data.coords.latitude,data.coords.longitude], 15);
        })
      },

      initMap(){
        const location = { latitude: 46.866573725968756, longitude: 2.673486775390641}
        const zoom = 5;
        console.log()
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

      async ionViewDidEnter(){
        this.followLocation();
        const alert = await get('help');
        if(alert != null){
          console.log('helping '+alert.user+' '+alert.lat+' '+alert.long);
          await remove('help');
          this.map.setView([alert.lat,alert.long]);
          this.getMarkerHelp(alert.lat,alert.long)
          .bindPopup(popup()
          .setContent(alert.user+' is here'))
          .openPopup()
          .addTo(this.map);
        }
      },

      getMyMarker(lat,long){
        const myIcon = icon({
          iconUrl: 'assets/icon/marker_person_map.png',
          iconSize: [50,50],
          iconAnchor: [25,50]
        });
        return marker([lat,long],{icon: myIcon})
      },

      getMarkerHelp(lat,long){
        const myIcon = icon({
          iconUrl: 'assets/icon/marker_help_map.png',
          iconSize: [50,50],
          iconAnchor: [25,50],
          popupAnchor: [0,-25]
        });
        return marker([lat,long],{icon: myIcon})
      }
    },

    async mounted(){
      await this.initMap();
      this.map.invalidateSize();
    },

    updated(){
      if(this.map != null){
        this.map.invalidateSize();
      }
    }
})
</script>