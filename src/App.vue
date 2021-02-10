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

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    FakeCall
  },
  setup()
    {
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

    emitter.on('alert', (alert) => {
      if(alert.tel){
        play()
      }
    })

    return{
      stop,
      play,
      socket,
      display,
    }
  },
});
</script>

<style scoped>
#wallpaper{
  background-image: url('../public/assets/image/wallpaper.jpg');
  filter: blur(15px);
  transform: scale(1.1); 
}
</style>