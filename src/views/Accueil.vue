<template>
  <ion-page>
    <Header/>
    <ion-content :fullscreen="true">
      <div class="h-full flex items-center">
          <div class="w-full">
            <div v-for="pair in prefs" v-bind:key="pair">
              <div class="flex justify-center">
                <div v-for="pref in pair" v-bind:key="pref.name">
                  <button type="button" class="rounded-full w-40 h-40 focus:outline-none text-white text-2xl my-3 mx-3" :class="pref.color + ' focus:' + pref.color.replace('500','600')">
                    {{pref.name}}
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/Header';
import {get, set} from '@/composables/storage'

export default  {
  name: 'Accueil',
  components: { IonPage, Header, IonContent },
  
  data(){
    return{
      prefs: []
    }
  },

  beforeMount(){
    this.separatePrefs();
  },

  methods:{
    async separatePrefs(){
      /*await set('alerts',[
        {name:'Alerte 1',color:'bg-purple-500',tel:false,map:false},
        {name:'Alerte 2',color:'bg-pink-500',tel:true,map:true},
        {name:'Alerte 3',color:'bg-blue-500',tel:true,map:false}
      ]);*/

      //Separate the alerts in pairs for display in different divs
      const tempPref = await get('alerts');
      let pair = false;
      for(let i=0;i<tempPref.length;i++){
        if(pair){
          this.prefs[this.prefs.length-1]=[this.prefs[this.prefs.length-1][0],tempPref[i]];
          pair = false;
        }
        else{
          this.prefs[this.prefs.length]=[tempPref[i]];
          pair = true;
        }
      }
    }
  }
}
</script>