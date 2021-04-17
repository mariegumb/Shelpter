<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div class="background-image rounded-lg">

            <div class="flex flex-wrap justify-center">
                <div class="w-7/12 sm:w-4/12 px-4 pt-4">
                    <img src="../../public/assets/image/Logo-ecrit.jpg" alt="..." class="shadow rounded-full max-w-full h-auto align-middle border-none" />
                </div>
            </div>

            <div class="leading-loose">
                <form class="max-w-xl m-4 pr-8 pl-8 pt-5 pb-5  bg-white rounded-lg shadow-xl">
                    <p class="text-gray-800 font-bold pb-2 text-3xl text-center"> Faites un don à SHELPTER! </p>
                    <p class="text-gray-800 font-medium pb-2">Informations Donateur :</p>
                    <div class="">
                        <label class="block text-sm text-gray-00" for="cus_name">Nom</label>
                         <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Votre Nom" aria-label="Name">
                    </div>
                    <div class="mt-2">
                        <label class="block text-sm text-gray-600" for="cus_email">E-mail</label>
                        <input class="w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Votre Email" aria-label="Email">
                    </div>
                    <div class="mt-2">
                        <label class=" block text-sm text-gray-600" for="cus_email">Adresse</label>
                        <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Pays" aria-label="Email">
                    </div>
                    <div class="mt-2">
                        <label class="hidden text-sm block text-gray-600" for="cus_email">Rue</label>
                        <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Rue" aria-label="Email">
                    </div>
                    <div class="inline-block mt-2 w-1/2 pr-1">
                        <label class="hidden block text-sm text-gray-600" for="cus_email">Ville</label>
                        <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Ville" aria-label="Email">
                    </div>
                    <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
                        <label class="hidden block text-sm text-gray-600" for="cus_email">Code Postal</label>
                        <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email"  name="cus_email" type="text" required="" placeholder="Code Postal" aria-label="Email">
                    </div>
                    <p class="mt-4 text-gray-800 font-medium">Montant de la donation :</p>
                    <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
                        <label class="hidden block text-sm text-gray-600" for="cus_email">Amount</label>
                        <input class="px-4 py-1 text-white text-center font-light tracking-wider rounded" id="cus_email"  name="cus_email" type="text" required="" placeholder="00.00€" aria-label="Email">
                    </div>

                    <p class="mt-4 text-gray-800 font-medium">Moyen de payment :</p>
                    
                    <div class="inline-flex space-x-8">
                        <label class="flex  mt-3">
                            <input type="radio" class="form-radio h-5 w-5 text-gray-600">
                                <span class="ml-2 text-gray-700"><img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" alt="PayPal" /></span>
                        </label>

                        <label class="flex  mt-3">
                            <input type="radio" class="form-radio h-5 w-5 text-gray-600">
                                <span class="ml-2 text-gray-700"><img class="h-96 w-20" src="https://1000logos.net/wp-content/uploads/2017/06/VISA-logo.png" alt="Visa" /></span>
                        </label>
                    </div>

                </form>
            </div>
            <div class="flex flex-wrap justify-center">
                <ion-button @click="onCancel" color="light">Annuler</ion-button>
                <ion-button @click="onApply" color="logo">Appliquer</ion-button>
            </div>

        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController } from '@ionic/vue';
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ModalDonation',
    props: {
        title: {
            type: String,
            default: 'Modal'
        },
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton },
    data(){
        return{

        }
    },
    methods:{
        onCancel(){
            //si cest annule
            this.onDismiss("cancel")
        },
        onApply(){
            //si cest valider
            this.onDismiss("apply")
        },
        onDismiss(result){
            modalController.dismiss(result);
        },
    }
});
</script>

<style>

.background-image{
    background-image: url("../../public/assets/image/rue.jpg") ;
    background-size: cover;
    height: 1000px;
  }

  .ion-color-logo {
    --ion-color-base: #655EA9;
    --ion-color-base-rgb: 101, 94, 169;
    --ion-color-contrast: #FFFFF;
    --ion-color-contrast-rgb: 0,0,0;
    --ion-color-shade: #553c9a;
    --ion-color-tint: #553c9a;
  }

</style>