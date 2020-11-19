<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <ion-title>Map</ion-title>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonTitle } from '@ionic/vue';
import Header from '@/components/Header.vue';

export default {
    name:"Map",
    components: {IonPage, IonContent, Header, IonTitle }
}
</script>