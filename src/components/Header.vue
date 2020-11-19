<template>
    <ion-header collapse="condense">
        <ion-toolbar>
        <ion-title size="large" color="purple" class=" text-center">Localiz'</ion-title>
        </ion-toolbar>
    </ion-header>
</template>

<script lang="ts">
import { IonHeader, IonToolbar, IonTitle } from '@ionic/vue';

export default {
    name:"Header",
    components: { IonHeader, IonToolbar, IonTitle }
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

.ion-color-purplelight {
  --ion-color-base: #9f7aea;
  --ion-color-base-rgb: 159,122,234;
  --ion-color-contrast: #FFFFF;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #6b46c1;
  --ion-color-tint: #6b46c1;
}

</style>