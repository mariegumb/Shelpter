<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
<!-- This example requires Tailwind CSS v2.0+ -->
        <div class="place-items-stretch">
            <div class="flex-col items-center">
                <div class="mt-3 flex justify-center">
                    <img v-if="photoUrl !== '' && photoUrl !== 'photoNotFound'" v-bind:src="photoUrl" class="rounded-full h-40 w-40"/>
                    <span v-else class="z-0 inline-block h-40 w-40 rounded-full overflow-hidden bg-gray-100">
                        <svg class="h-full w-full text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                </div>
                <div class="flex justify-center mt-4 text-purple-500">
                    <label for="photo">changer de photo</label>
                    <input type="file" class="hidden" name="photo" id="photo" capture="camera" accept="image/*" @change="onPhotoTaken"/>
                </div>
            </div>
        </div>
        <div class="mt-10 sm:mt-0">
            <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
                <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">

                        <div class="col-span-6 sm:col-span-3">
                            <label for="login" class="block text-sm font-medium text-purple-600">Login</label>
                            <input v-bind:disabled="!modify" v-model="dataMe.login" type="text" name="login" id="login" class="mt-1 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="Login" autocomplete="given-name">
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="first_name" class="block text-sm font-medium text-purple-600">Prenom</label>
                            <input v-bind:disabled="!modify" v-model="dataMe.prenom" type="text" name="first_name" id="first_name" autocomplete="given-name" class="mt-1 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="First Name">
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="last_name" class="block text-sm font-medium text-purple-600">Nom</label>
                            <input v-bind:disabled="!modify" v-model="dataMe.nom" type="text" name="last_name" id="last_name" autocomplete="family-name" class="mt-1 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="Last Name">
                        </div>

                        <div class="col-span-6 sm:col-span-4">
                            <label for="email_address" class="block text-sm font-medium text-purple-600">Email</label>
                            <input v-bind:disabled="!modify" v-model="dataMe.mail" type="text" name="email_address" id="email_address" autocomplete="email" class="mt-1 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="Email">
                        </div>
<!--
                        <div class="col-span-6 sm:col-span-4">
                            <label for="phone" class="block text-sm font-medium text-purple-600">Telephone*</label>
                            <input type="tel" pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}" name="phone" id="phone" autocomplete="phone" class="mt-1 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="+33">
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="mdp" class="block text-sm font-medium text-purple-600">Mot de passe*</label>
                            <input type="text" name="mdp" id="mdp" autocomplete="given-name" class="mt-1 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="****">
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="mdp" class="block text-sm font-medium text-purple-600">Confirmation du mot de passe*</label>
                            <input type="text" name="mdp" id="mdp" autocomplete="given-name" class="mt-1 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="****">
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="country" class="block text-sm font-medium text-purple-600">Country / Region</label>
                            <select id="country" name="country" autocomplete="country" class="mt-1 block w-full py-2 px-3 border border-purple-600 bg-purple-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option>France</option>
                            <option>Canada</option>
                            <option>United States</option>
                            </select>
                        </div>

                        <div class="col-span-6">
                            <label for="street_address" class="block text-sm font-medium text-purple-600">Adresse</label>
                            <input type="text" name="street_address" id="street_address" autocomplete="street-address" class="mt-1 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="Adress">
                        </div>

                        <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                            <label for="city" class="block text-sm font-medium text-purple-600">Ville</label>
                            <input type="text" name="city" id="city" class="mt-1 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="City">
                        </div>

                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label for="state" class="block text-sm font-medium text-purple-600">Département / State</label>
                            <input type="text" name="state" id="state" class="mt-1 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="State">
                        </div>

                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label for="postal_code" class="block text-sm font-medium text-purple-600">ZIP / Code Postal</label>
                            <input type="text" name="postal_code" id="postal_code" autocomplete="postal-code" class="mt-1 mb-2 w-full px-2  py-2 text-gray-700 bg-gray-200 rounded" placeholder="Code Postal">
                        </div>

                        -->

                    </div>
                    <div v-if="!modify" class="flex justify-center mt-4">
                        <ion-button @click="onModifyClick" color="purple">Modifier</ion-button>
                    </div>
                    <div v-else class="flex justify-center mt-4">
                        <ion-button @click="onClickAnnuler" color="light">Annuler</ion-button>
                        <ion-button @click="onClickApply" color="purple">Appliquer</ion-button>
                    </div>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
        <div class="flex justify-center mt-3">
            <ion-button @click="onClose" color="light">Fermer</ion-button>
        </div>
        <ion-button color="red-400" class="flex m-5 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-red-400 hover:bg-red-500">Supprimer son compte</ion-button>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController } from '@ionic/vue';
import { defineComponent } from "vue";

import { getPhotoUrl, changePhoto, getUserByLogin } from '@/composables/mongoApi';

export default defineComponent({
    name: 'ModalProfilSettings',
    props: {
        title: {
            type: String,
            default: 'Modal'
        },
        me: {},
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton },
    data(){
        return{
            photoUrl: '',
            dataMe: {},
            modify: false,
        }
    },
    methods:{
        onClose(){
            //si cest annule
            this.onDismiss("close")
        },
        onDismiss(result){
            modalController.dismiss(result);
        },
        async onPhotoTaken(event){
            if(event.target.files.length > 0 && event.target.files[0] !== null){
                await changePhoto(this.me.login, event.target.files[0]);
                await this.reloadPhoto();
            }
        },
        async reloadPhoto(){
            const newMe = await getUserByLogin(this.me.login);
            this.photoUrl = getPhotoUrl(newMe);
        },
        onModifyClick(){
            this.modify = true;
        },
        onClickAnnuler(){
            this.modify = false;
            this.dataMe = this.me;
        },
        onClickApply(){
            console.log(this.dataMe)
        }
    },
    async beforeMount(){
        this.photoUrl = getPhotoUrl(this.me);
        this.dataMe = JSON.parse(JSON.stringify(this.me));
    }
});
</script>