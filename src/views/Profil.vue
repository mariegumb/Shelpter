<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <ion-title>Profil</ion-title>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonTitle } from '@ionic/vue';
import Header from '@/components/Header.vue';

export default {
    name:"Profil",
    components: {IonPage, IonContent, Header, IonTitle }
}
</script>