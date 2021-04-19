<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div>
            <div>
                <div class="flex justify-center">
                    <img v-if="user.photo !== 'photoNotFound'" v-bind:src="user.photo" class="rounded-full h-40 w-40"/>
                    <svg v-else class="h-24 w-24 text-purple-600 rounded-full" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <div class="text-center text-purple-800 font-bold text-3xl">
                    {{user.login}}
                </div>
            </div>

            <div class="flex-grow mt-2 px-1 py-3">
                <div class="flex justify-center">
                    <div class="w-1/12"></div>
                    <div class="w-10/12 text-center">
                      <span class="text-xl inline-block bg-yellow-500 text-black font-bold py-1 px-6 rounded-lg ">
                        <svg width="23" height="30" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block">
                          <path d="M10.5461 2.36102C10.8398 1.42801 12.1602 1.42801 12.4539 2.36102L13.5856 5.95646L14.5394 5.65622L13.5856 5.95646C13.9789 7.2059 15.1373 8.05573 16.4472 8.05573H20.2412C21.2023 8.05573 21.6101 9.27913 20.8412 9.85574L17.6637 12.2389C16.6454 13.0025 16.2199 14.3256 16.602 15.5396L17.7898 19.3131C18.0816 20.24 17.0134 20.9964 16.2359 20.4133L13.3 18.2114C12.2333 17.4114 10.7667 17.4114 9.70003 18.2114L6.76406 20.4133C5.98664 20.9964 4.91844 20.24 5.21021 19.3131L6.39796 15.5396C6.78011 14.3256 6.35458 13.0025 5.33635 12.2389L2.15877 9.85574C1.38994 9.27913 1.79774 8.05573 2.75876 8.05573H6.55283C7.8627 8.05573 9.02113 7.2059 9.41441 5.95646L10.5461 2.36102Z" fill="#DBFF00" stroke="black" stroke-width="2"/>
                        </svg>
                        Mini Justicier
                      </span>
                    </div>
                </div>
            </div>
            <div class="flex pt-4 justify-center mt-2 text-xl font-bold">
                  <div class="mx-2 text-center">
                    <span>Aidés</span>
                    <span class="block">{{ mesAides.length }}</span>
                  </div>
                  <div class="mx-2 text-center">
                    <span>Protégés</span>
                    <span class="block">{{mesProteges.length}}</span>
                  </div>
                  <div class="mx-2 text-center">
                    <span>Protecteurs</span>
                    <span class="block">{{mesProtecteurs.length}}</span>
                  </div>
            </div>

            <div class="mt-5">
                <ion-button class="flex m-5 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-red-400 hover:bg-red-500" color="red-400" @click="supprimerRole">Supprimer le {{role}}</ion-button>
            </div>
        </div>
        <div class="flex justify-center">
            <ion-button @click="onCancel" color="light">Cancel</ion-button>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController } from '@ionic/vue';
import { defineComponent } from "vue";
import { getHelpedByLogin, getMesProtecteurs, getMesProteges } from '@/composables/mongoApi'

export default defineComponent({
    name: 'ModalInfoUser',
    props: {
        title: String,
        user: {},
        role: String
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton },
    data(){
        return{
            mesProtecteurs: [],
            mesProteges: [],
            mesAides: [],
        }
    },
    methods:{
        onCancel(){
            this.onDismiss("cancel")
        },
        onApply(){
            this.onDismiss("apply")
        },
        onDismiss(result){
            modalController.dismiss(result);
        },
        supprimerRole(){
            this.onDismiss({action: 'supprimer', role: this.role, login: this.user.login})
        },
        async loadProtect(){
            const mesProtecteurs = await getMesProtecteurs(this.user.login);
            this.mesProtecteurs = mesProtecteurs;
            const mesProteges = await getMesProteges(this.user.login);
            this.mesProteges = mesProteges;
            const mesAides = await getHelpedByLogin(this.user.login);
            this.mesAides = mesAides;
        },
    },
    mounted(){
        this.loadProtect();
    }
});
</script>