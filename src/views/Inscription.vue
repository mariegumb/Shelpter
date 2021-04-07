<template>
  <ion-page>
    <ion-content>
      <div class="background-image">
        <div class="logo">
          <img src="../../public/assets/image/Logo-ecrit.jpg" class="position-logo">
        </div>
        <ion-card class="m-3">
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
             <div class="mt-8 flex justify-between items-center">
               <div>Carte d'identité : </div>
              <div>
                <label @click="this.fileId=null" for="pdf" class="hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white py-1 px-2 rounded bg-purple-500 text-white">Carte d'identité</label>
                <input class="hidden" id="pdf" type="file" accept="image/*,.pdf" name="photo" @change="previewId" />
                <div v-if="this.fileId===null">
                  Aucun fichier selectionné
                </div>
                <div v-if="this.fileId!==null">
                  {{this.fileId.name}}
                </div>
              </div>
             </div>
             <div class="mt-6 flex justify-between items-center">
              <div>Photo : </div>
              <div>
                <label @click="this.filePhoto=null" for="picture" class="hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white py-1 px-2 rounded bg-purple-500 text-white">Appareil photo</label>
                <input class="hidden" id="picture" type="file" accept="image/*" capture="camera" @change="previewPhoto"/>
                <div v-if="this.filePhoto===null">
                  Aucun fichier selectionné
                </div>
                <div v-if="this.filePhoto!==null">
                  {{this.filePhoto.name}}
                </div>
              </div>
            </div>
            <div class="text-right mt-8">
              <ion-button @click="register" color="purple" >S'inscrire</ion-button>
              <router-link to="/login">
                <div class="text-right" >
                  <span class="text-purple-6git00">Déjà un compte ?</span>
                </div>
              </router-link>
            </div>
            
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent,
 IonItem, IonLabel, IonButton, IonInput, IonCardContent, IonCard } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { storeNewUser, sendFilesToMongo } from '@/composables/mongoApi';

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
      errorMsg: "",
      fileId: null,
      filePhoto: null,
    }
  },

  methods:{
    async register(){
      //TO DO : ajouter la verification pour savoir si le login est deja pris
      try{
        if(this.nom != "" && this.prenom != "" && this.login != "" && this.mail != "" && this.mdp != "" && this.confirm != ""){
          if(this.mdp == this.confirm){
            if(this.filePhoto !== null && this.fileId !== null){
              const { fileIdId, filePhotoId } = await sendFilesToMongo(this.fileId, this.filePhoto);
              const user = {
                login: this.login,
                mdp: this.mdp,
                nom: this.nom,
                prenom: this.prenom,
                mail: this.mail,
                fileId: fileIdId,
                filePhoto: filePhotoId,
              };
              await storeNewUser(user);
              this.router.go(-1);
            }
            else{
              this.error = true;
              this.errorMsg = "Veuillez joindre les fichiers demandés"
            }
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
    },
    previewId(event){
      if(event.target.files.length > 0 && event.target.files[0] !== null){
        this.fileId = event.target.files[0]
        console.log(this.fileId)
      }
      else{
        this.fileId = null
      }
    },
    previewPhoto(event){
      if(event.target.files.length > 0 && event.target.files[0] !== null){
        this.filePhoto = event.target.files[0]
        console.log(this.filePhoto)
      }
      else{
        this.filePhoto = null
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