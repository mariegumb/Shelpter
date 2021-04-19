<template>
  <ion-page>
    <Header/>
      <ion-content :fullscreen="true">
        <div v-if="!alertEnCours && alerts" class="h-full flex items-center">
            <div  class="w-full grid grid-cols-2">
              <div :class="{'col-span-2 text-center' : alerts.length % 2 === 1 && index === alerts.length -1}" v-for="(alert, index) in alerts" v-bind:key="index">
                <button @click="activateAlert(alert)" type="button" class="rounded-full w-40 h-40 focus:outline-none text-white text-2xl my-3 mx-3" :class="alert.color + ' focus:' + alert.color.replace('500','600')" v-if="alert!==null">
                  {{alert.name}}
                </button>
              </div>
            </div>              
        </div>
        <div v-else class="h-full flex p-4">
          <div class="text-red-500 font-bold w-full">
              Vos coordonnée ainsi que le message suivant on été transmis à la communauté :
              <div class="w-full my-2 px-3 py-2 rounded bg-red-200 text-red-600 font-italic">      
                "{{alertEnCours.message}}"
              </div>
              <button class="w-full bg-purple-500 text-white rounded px-2 py-1 hover:bg-purple-600" @click="cancelAlert()">Marquer cette alerte comme terminée</button>
            </div>
        </div>
      </ion-content>
    </ion-page>
</template>

<script>
import { loadingController, toastController, modalController } from '@ionic/vue';
import ModalAddHelper from '@/components/ModalAddHelper.vue'
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/Header';
import {get} from '@/composables/storage'
import { emitter } from '@/emitter';
import { socket } from '@/composables/useSocket'
import { throwAlert, getAllAlerts, updateAlert, getUserByLogin, addHelper } from '@/composables/mongoApi';
import { Plugins } from '@capacitor/core';
import { computed, ref } from '@vue/runtime-core';
import { SMS } from '@ionic-native/sms'
import { CallNumber } from '@ionic-native/call-number'
import { MediaCapture } from '@ionic-native/media-capture'
const { Geolocation } = Plugins;

export default  {
  name: 'Accueil',
  // eslint-disable-next-line vue/no-unused-components
  components: { IonPage, Header, IonContent, ModalAddHelper },
  updated(){
      this.fetchAlerts()
  },
  setup(){
    const notifications = ref([])
    const currentUser = ref(null)
    const alerts = ref([])

    const alertEnCours = computed(() => {

      if(notifications.value.length > 0 && currentUser.value){
        return notifications.value.find(a => a.status === 1 && a.user === currentUser.value.login)
      } else {
        return null
      }
    })

    const fetchAlerts =  async () => {
      alerts.value = await get('alerts')
    }

    const getNotifications = async () => {
          notifications.value = await getAllAlerts();
    }

    const openModal = async () => {
      const modal = await modalController
        .create({
          component: ModalAddHelper,
          componentProps: {
            title: 'Qui vous a aider ?'
          },
        })
        modal.present();

      const {data:{login}} = await modal.onDidDismiss()
      if(login){
        await addHelper( alertEnCours.value._id, login)
        await updateAlert({alertId : alertEnCours.value._id, status: 0})
        notifications.value = await getAllAlerts();
        const toast = await toastController.create({
          message: 'Alerte terminée.',
          duration: 3000
        })
        await toast.present();
      }
    }

    const cancelAlert = async () => {
      openModal()
      //await updateAlert({alertId : alertEnCours.value._id, status: 0})
      //notifications.value = await getAllAlerts();
    }

    const sendPos = async (alert) => {
      const loading = await loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Alerte en cours d\'envoi',
          duration: 0,
        });

      await loading.present();

      loading.value = true
      try{
        const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
        const location = position.coords;
        socket.emit('sendPos',location.latitude,location.longitude);
        const user = await get('login');
        const body = {user: user, message: alert.message, lat: location.latitude, long: location.longitude};
        await throwAlert(body);
        notifications.value = await getAllAlerts();
        loading.dismiss()
      } catch (e){
        console.log(e)
        loading.dismiss()
      }
    }
    
    const sendSms = async (alert) => {
      console.log(alert.sms + ' ' + JSON.stringify(alert.contactsSelected) + ' ' + alert.sendPosInSms + ' ' + alert.send114)
      for(const contact of alert.contactsSelected){
        console.log(contact.name + ' ' + contact.tel)
        await SMS.send(contact.tel,alert.sms)
        if(alert.sendPosInSms){
          const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
          const { latitude, longitude } = position.coords;
          await SMS.send(contact.tel,'https://www.google.fr/maps/search/'+latitude+','+longitude+'/@'+latitude+','+longitude+',14z')
        }
      }
      if(alert.send114){
        console.log('sending sms to the police')
      }
    }

    const call = (alert) => {
      if(alert.callInfo === 'police'){
        console.log('calling the police')
      }
      else if(alert.callInfo === 'contact'){
        console.log(JSON.stringify(alert.contactToCall))
        CallNumber.callNumber(alert.contactToCall.tel,true)
      }
    }

    const recordMic = async () => {
      const audio = await MediaCapture.captureAudio()
      console.log(JSON.stringify(audio))
    }

    const recordCam = async () => {
      const video = await MediaCapture.captureVideo()
      console.log(JSON.stringify(video))
    }

    const activateAlert = async (alert) => {
      if(alert.tel){
        emitter.emit('phone')
      }
      if(alert.map){
        await sendPos(alert)
      }
      if(alert.sendSms){
        sendSms(alert)
      }
      if(alert.call){
        call(alert)
      }
      if(alert.record){
        if(alert.recordInfo === 'mic'){
          recordMic()
        }
        else if(alert.recordInfo === 'cam'){
          recordCam()
        }
      }
      const toast = await toastController.create({
        message: 'l\'alerte a bien été lancée',
        duration: 3000
      })
      await toast.present();
    }

    const fetchLogin = async () => {
      const login = await get('login');
      socket.emit('login',login);
      if(login){
        currentUser.value = await getUserByLogin(login);
      }
      getNotifications()
      fetchAlerts()
    }
    
    fetchLogin()

    return{
      activateAlert,
      notifications,
      getNotifications,
      cancelAlert,
      fetchAlerts,
      currentUser,
      alertEnCours,
      alerts,
    }
  },
}
</script>