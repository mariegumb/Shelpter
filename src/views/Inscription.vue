<template>
  <ion-page>
    <ion-content>
      <div class="background-image">
        <div class="logo">
          <img src="../../public/assets/image/Logo-ecrit.jpg" class="position-logo">
        </div>
        <ion-card class="m-5">
          <ion-card-header>
            <ion-card-title color="purpledark">Vos Identifiants</ion-card-title>
          </ion-card-header>
          <ion-card-content class="m-2 my-5">
            <ion-item class="ion-no-padding">
              <ion-input v-model="nom" class="pl-0" placeholder="Nom"></ion-input>
            </ion-item>
            <ion-item class="ion-no-padding">
              <ion-input v-model="prenom" class="pl-0" placeholder="Prénom"></ion-input>
            </ion-item>
            <ion-item class="ion-no-padding">
              <ion-input v-model="login" class="pl-0" placeholder="Login"></ion-input>
            </ion-item>
            <ion-item class="ion-no-padding">
              <ion-input v-model="mail" class="pl-0" placeholder="Mail"></ion-input>
            </ion-item>
            <ion-item class="ion-no-padding">
              <ion-input v-model="mdp" placeholder="Mot de passe" type="password"></ion-input>
            </ion-item>
            <ion-item class="ion-no-padding">
              <ion-input v-model="confirm" placeholder="Confirmation mot de passe" type="password"></ion-input>
            </ion-item>
            <div v-if="error">
              <ion-label>{{errorMsg}}</ion-label>
            </div>
            <ion-button @click="register" color="purple" >S'inscrire</ion-button>
          </ion-card-content>
          <div class="mt-4 p-2">
            <router-link to="/login">
              <div class="text-right" >
                <span class="text-purple-6git00">Déjà un compte ?</span>
              </div>
            </router-link>
          </div>  
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent,
 IonItem, IonLabel, IonButton, IonInput, IonCardContent, IonCard } from '@ionic/vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { postUser } from '@/composables/mongoApi';

export default  {
  name: 'Inscription',
  components: { IonContent,
   IonPage, IonItem, IonButton, IonInput, IonCardContent, IonCard, IonLabel},
  
  data(){
    return{
      nom: "",
      prenom: "",
      login: "",
      mail: "",
      mdp: "",
      confirm: "",
      error: false,
      errorMsg: ""
    }
  },

  methods:{
    async register(){
      //TO DO : ajouter la verification pour savoir si le login est deja pris
      try{
        if(this.nom != "" && this.prenom != "" && this.login != "" && this.mail != "" && this.mdp != "" && this.confirm != ""){
          if(this.mdp == this.confirm){
            const user = {
              login: this.login,
              mdp: this.mdp,
              nom: this.nom,
              prenom: this.prenom,
              mail: this.mail
            };
            await axios.post(postUser(),user);
            this.router.go(-1);
          }
          else{
            this.error = true;
            this.errorMsg = "Les mot de passe et la confirmation ne coresspondent pas";
          }
        }
        else{
          this.error = true;
          this.errorMsg = "Veuillez renseigner tout les champs";
        }
      }
      catch(err){
        console.log(err);
        throw(err);
      }
    }
  },

  setup(){
    const router = useRouter();
    
    return {
      router
    }
  }
}
</script>

<style>

.ion-color-purple {
  --ion-color-base: #805ad5;
  --ion-color-base-rgb: 107,70,193;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #6b46c1;
  --ion-color-tint: #6b46c1;
}

.background-image{
  background-image: url("../../public/assets/image/rue.jpg") ;
  background-size: cover;
  height: 1000px;
}

.logo {
    height: 200px;
    position: center;
}

.position-logo{
  height: 200px;
  margin-left: 80px;
  border-radius: 100px;
}
</style>