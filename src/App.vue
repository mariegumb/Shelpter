<template>
  <fake-call :display="display" @stop="stop"></fake-call>
  <ion-app >
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { socket } from '@/composables/useSocket';
import { emitter } from './emitter'
import FakeCall from './components/fakeCall.vue';
import { Plugins } from '@capacitor/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { get } from '@/composables/storage'
const { Geolocation } = Plugins;

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    FakeCall
  },
  setup(){
    const display = ref(false)
    const audio = new Audio(require('../public/assets/iphone.mp3'))

    const play = () => {
      display.value = true
      audio.play()
    }

    const stop = () => {
      display.value = false
      audio.pause()
      audio.currentTime = 0
    }
    

    emitter.on('phone', () => {
      play()
    })

    const localNotifications = LocalNotifications;

    socket.on('receivePos', (id,login,lat,long)=>{
        console.log("app : receive : "+lat+" "+long);
        localNotifications.schedule({
          id: 1,
          title: login+' need help',
          text: 'Click here to help '+login+' now'
        })
    });

    return{
      stop,
      play,
      socket,
      display,
    }
  },
  created(){
    const getPos = Geolocation.watchPosition({enableHighAccuracy: true}, (data,err) => {
      if(err){
        throw err;
      }
      Geolocation.clearWatch({id: getPos});
      console.log(data.coords.latitude+' '+data.coords.longitude);
    });
  }
});
</script>

<style scoped>
#wallpaper{
  background-image: url('../public/assets/image/wallpaper.jpg');
  filter: blur(15px);
  transform: scale(1.1); 
}
</style>