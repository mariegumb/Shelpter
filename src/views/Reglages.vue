<template>
    <ion-page>
        <Header/>
        <ion-content :fullScreen="true">
            <ion-title>Reglages</ion-title>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonTitle } from '@ionic/vue';
import Header from '@/components/Header.vue';

export default {
    name:"Reglages",
    components: {IonPage, IonContent, Header, IonTitle }
}
</script>