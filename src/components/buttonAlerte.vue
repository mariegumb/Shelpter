<template>
  <div @click="openProperty" class="bg-gray-300 w-full h-20 rounded-full flex items-center text-2xl">
    <div class="w-1/6">
      <div class="ml-6 w-6 h-6 rounded-full mr-24" :class="alert.color"></div>
    </div>
    <div class="w-4/6 text-center">
      {{alert.name}}
    </div>
    <div class="w-1/6 text-right">
      <!--<button class="-mt-10 -ml-5 absolute focus:outline-none">
        <span class="text-sm">
          <svg class="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </span>
      </button>-->
    </div>
  </div>
</template>

<script>
import {brushOutline} from 'ionicons/icons';
import { modalController } from '@ionic/vue';
import ModalAlertProperty from '@/components/ModalAlertProperty';
import {get, set} from '@/composables/storage';

export default {
  name: "buttonAlerte",
  props: ['alert','index','refresh'],
  setup() {
    return {
      brushOutline,
    }
  },
  methods:{
    async openProperty(){
      const modal = await modalController.create({
        component: ModalAlertProperty,
        componentProps:{
          title: this.alert.name,
          alert: this.alert
        }
      });

      await modal.present();

      const result = await modal.onDidDismiss();
      this.closedModalHandler(result);
    },

    async closedModalHandler(result){
      if(result.data === "cancel"){
        console.log("cancelled");
      }
      else if(result.data === "delete"){
        const alerts = await get('alerts');
        console.log(this.index)
        alerts.splice(this.index,1);
        set('alerts',alerts);
        this.refresh();
      }
      else{
        const alerts = await get('alerts');
        alerts[this.index] = result.data;
        set('alerts',alerts);
        this.refresh();
      }
    }
  }
}
</script>

<style scoped>

</style>