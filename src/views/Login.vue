<template>
  <ion-page> 
    <Header/>
    <ion-content>
      <div id="background-image"></div>
      <div class="logo">
        <ion-icon color="light" name="contact"></ion-icon>
      </div>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Connexion</ion-card-subtitle>
          <ion-card-title color="purpledark">Vos Identifiants</ion-card-title>
      </ion-card-header>

        <ion-card-content>
          <ion-item class="ion-no-padding">
            <ion-input v-model="inptLogin" class="pl-0" placeholder="Mail ou Login"></ion-input>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-input v-model="inptMdp" placeholder="Mot de passe" type="password"></ion-input>
          </ion-item>
          <div v-if="wrongCred">
            <ion-label >Wrong credentials</ion-label>
          </div>
          <div class="mt-4 p-2">
            <router-link to="/inscription">
              <div class="text-right" >
                <span class="text-purple-6git00">Pas encore de compte ?</span>
              </div>
            </router-link>
            <div class="mt-4 text-right">
              <ion-button @click="checkCredentials" expand="block" color="purple">Se connecter</ion-button>
            </div>
          <ion-item lines="none">
            <ion-label color="purpledark text-center">Ou connectez-vous avec</ion-label>
          </ion-item>
            <div class="flex">
              <ion-button color="facebook" shape="round">
                <ion-icon name="logo-facebook"></ion-icon>
                Facebook
              </ion-button>
              <ion-button color="google" shape="round">
                <ion-icon name="logo-google"></ion-icon>
                Google
              </ion-button>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonInput,
 IonItem, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonLabel } from '@ionic/vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { getCheckCred } from '@/composables/mongoApi';
import { get, set } from '@/composables/storage';
import Header from '@/components/Header';


export default  {
  name: 'Login',
  components: { IonContent, IonPage, IonInput,
   IonItem, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonLabel, Header},

  data(){
    return{
      inptLogin: "",
      inptMdp: "",
      wrongCred: false
    }
  },

  methods:{
        async checkCredentials(){
          if(this.inptLogin != "" && this.inptMdp != ""){
            try{
                const addr = getCheckCred(this.inptLogin,this.inptMdp);
                const valid = await (await axios.get(addr)).data;
                if(valid){
                  set('login',this.inptLogin);
                  set('mdp',this.inptMdp);
                  this.router.push('/tabs/accueil')
                }
                else{
                  this.wrongCred = true;
                }
            }
            catch(err){
                console.log(err);
                throw err;
            }
          }
          else{
            this.wrongCred = true;
          }
        }
    },
    
  setup(){
    const router = useRouter();
    return {router};
  },

  async mounted(){
    const login = await get('login');
    const mdp = await get('mdp');
    if(login!=null && mdp!=null){
      // eslint-disable-next-line no-useless-catch
      try{
        const addr = getCheckCred(login,mdp);
        const valid = await (await axios.get(addr)).data;
        if(valid){
          this.router.push('/tabs/accueil')
        }
        else{
          this.wrongCred = true;
        }
      }
      catch(err){
          throw err;
      }
    }
  }
}
</script>

<style>

.ion-color-purple {
  --ion-color-base: #805ad5;
  --ion-color-base-rgb: 107, 70, 193;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0, 0, 0;
  --ion-color-shade: #6b46c1;
  --ion-color-tint: #6b46c1;
}

#background-image{
  background-image: url("../../public/assets/image/rue.jpg") ;
}

.logo {
    position: relative;
    height: 250px;
}

.logo ion-icon{
    font-size: 9em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.flex {
    display: flex;
    justify-content: space-between;
}

.ion-color-purpledark {
  --ion-color-base: #553c9a;
  --ion-color-base-rgb: 85, 60, 154;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #553c9a;
  --ion-color-tint: #553c9a;
}

.ion-color-facebook {
  --ion-color-base: var(--ion-color-facebook) !important;
  --ion-color-base-rgb: var(--ion-color-facebook-rgb) !important;
  --ion-color-contrast: var(--ion-color-facebook-contrast) !important;
  --ion-color-contrast-rgb: var(--ion-color-facebook-contrast-rgb) !important;
  --ion-color-shade: var(--ion-color-facebook-shade) !important;
  --ion-color-tint: var(--ion-color-facebook-tint) !important;
}
.ion-color-google {
  --ion-color-base: var(--ion-color-google) !important;
  --ion-color-base-rgb: var(--ion-color-google-rgb) !important;
  --ion-color-contrast: var(--ion-color-google-contrast) !important;
  --ion-color-contrast-rgb: var(--ion-color-google-contrast-rgb) !important;
  --ion-color-shade: var(--ion-color-google-shade) !important;
  --ion-color-tint: var(--ion-color-google-tint) !important;
}
</style>