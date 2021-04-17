<template>
  <ion-page> 
    <ion-content>
      <div class="background-image">
        <div class="logo">
          <img src="../../public/assets/image/Logo-ecrit.jpg" class="position-logo">
        </div>
        <ion-card class="m-5 my-5">
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
              <ion-label >Utilisateur introuvable</ion-label>
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
            </div>
          </ion-card-content>
        </ion-card>
      </div>       
    </ion-content>
  </ion-page>
  
</template>

<script>
import { IonPage, IonContent, IonInput,
 IonItem, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLabel, loadingController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { checkCred } from '@/composables/mongoApi';
import { get, set } from '@/composables/storage';


export default  {
  name: 'Login',
  components: { IonContent, IonPage, IonInput,
   IonItem, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLabel},

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
        const loading = await this.startLoading();
        try{
            const valid = await checkCred(this.inptLogin,this.inptMdp);
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
        this.stopLoading(loading);  
      }
      else{
        this.wrongCred = true;
      }
    },

    async startLoading(){
      const loading = await loadingController.create({
        message: 'Veuillez patienter pendant la connexion'
      })

      await loading.present()

      return loading
    },

    stopLoading(loading){
      if(loading !== null){
        loading.dismiss()
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
    if(!login && !mdp){
      const loading = await this.startLoading();
      try{
        const valid = await checkCred(login,mdp);
        if(valid){
          this.router.push('/tabs/accueil')
        }
        else{
          this.wrongCred = true;
        }
      }catch(err){
        console.error(err);
      }
      this.stopLoading(loading);
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

.background-image{
  background-image: url("../../public/assets/image/rue.jpg") ;
  background-size: cover;
  height: 1000px;
}


.logo {
    height: 250px;
    position: center;
}

.position-logo{
  height: 200px;
  margin-left: 80px;
  border-radius: 100px;
}

.ion-color-purpledark {
  --ion-color-base: #553c9a;
  --ion-color-base-rgb: 85, 60, 154;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #553c9a;
  --ion-color-tint: #553c9a;
}
</style>