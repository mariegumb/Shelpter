<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div style="display:flex;justify-content:flex-end;">
            <ion-button @click="deleteAlert" color="danger">Delete</ion-button>
        </div>
        <ion-item>
            <ion-label style="color:grey" position="stacked">Name</ion-label>
            <ion-input v-model="this.name" placeholder="Name here"/>
        </ion-item>
        <ion-item>
            <ion-label style="color:grey" posistion="stacked">Color</ion-label>
            <ion-select v-model="this.color" ok-text="Choose" cancel-text="Cancel">
                <ion-select-option value="bg-red-500">Red</ion-select-option>
                <ion-select-option value="bg-purple-500">Puple</ion-select-option>
                <ion-select-option value="bg-blue-500">Blue</ion-select-option>
                <ion-select-option value="bg-pink-500">Pink</ion-select-option>
                <ion-select-option value="bg-orange-500">Orange</ion-select-option>
                <ion-select-option value="bg-yellow-500">Yellow</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label style="color:grey" posistion="stacked">Telephone</ion-label>
            <ion-toggle v-model="this.tel"/>
        </ion-item>
        <ion-item>
            <ion-label style="color:grey" posistion="stacked">Share position on map</ion-label>
            <ion-toggle v-model="this.map"/>
        </ion-item>
        <div style="display:flex;justify-content:center;">
            <ion-button @click="onCancel" color="light">Cancel</ion-button>
            <ion-button @click="onApply">Apply</ion-button>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonToggle, IonLabel,
 IonItem, IonInput, IonSelect, IonSelectOption, modalController } from '@ionic/vue';
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ModalAlertProperty',
    props: {
        title: {type: String, default: 'Modal'},
        alert: {default: null}
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton, IonToggle, IonItem,
    IonLabel, IonInput, IonSelect, IonSelectOption},
    data(){
        return{
            content: 'Content',
            
            name: '',
            color: 'bg-red-500',
            tel: false,
            map: false
        }
    },
    beforeMount(){
        this.loadData();
    },
    methods:{
        loadData(){
            if(this.alert != null){
                this.name = this.alert.name;
                this.color = this.alert.color;
                this.tel = this.alert.tel;
                this.map = this.alert.map;
            }
        },
        onCancel(){
            this.onDismiss("cancel")
        },
        onApply(){
            this.onDismiss({name:this.name, color:this.color, tel:this.tel, map:this.map})
        },
        onDismiss(result){
            console.log({name:this.name, color:this.color, tel:this.tel, map:this.map});
            modalController.dismiss(result);
        },
        deleteAlert(){
            //TO DO : USE ALERET TO ASK TO THE USER IF HE IS SURE TO DELETE
            this.onDismiss("delete");
        }
    }
});
</script>