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
                <ion-select-option value="bg-purple-500">Purple</ion-select-option>
                <ion-select-option value="bg-blue-500">Blue</ion-select-option>
                <ion-select-option value="bg-pink-500">Pink</ion-select-option>
                <ion-select-option value="bg-orange-500">Orange</ion-select-option>
                <ion-select-option value="bg-yellow-500">Yellow</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label style="color:grey">Fake call</ion-label>
            <ion-toggle v-model="this.tel"/>
        </ion-item>
        <ion-item>
            <div style="display:flex;flex-direction:column;width:100%">
                <div style="display:flex;justify-content:space-between;margin:10px 0px">
                    <ion-label style="color:grey">Share position with users</ion-label>
                    <ion-toggle v-model="this.map"/>
                </div>
                <div v-if="map" style="width:100%">
                    <ion-item>
                        <ion-label style="color:grey" position="stacked">Custom message</ion-label>
                        <ion-textarea v-model="this.message"></ion-textarea>
                    </ion-item>
                </div>
            </div>
        </ion-item>
        <ion-item>
            <ion-label style="color:grey">Send a sms</ion-label>
            <ion-toggle v-model="this.sendSms"/>
        </ion-item>
        <ion-item v-if="sendSms">
            <div style="width:100%">
                <ion-item>
                    <div style="width:100%;display:flex;justify-content:space-between;margin:10px 0px">
                        <ion-label style="color:grey">Share position in sms</ion-label>
                        <ion-toggle v-model="this.sendPosInSms"/>
                    </div>
                </ion-item>
                <ion-item>
                    <div style="display:flex;flex-direction:column;width:100%;margin:10px 0px">
                        <div style="display:flex;flex-direction:row;justify-content:space-between;width:100%;">
                            <ion-label style="color:grey">Choose contacts</ion-label>
                            <ion-button color="primary" @click="pickContact">Add a contact</ion-button>
                        </div>
                        <div style="display:flex;flex-direction:column;">
                            <div v-for="(contact, i) in contactsSelected" v-bind:key="i" style="margin:5px;display:flex;justify-content:space-between;with:100%;align-items:center;">
                                    <div>{{contact.name}}</div>
                                    <div>{{contact.tel}}</div>
                                    <ion-button @click="removeContact(i)">X</ion-button>
                            </div>
                        </div>
                    </div>
                </ion-item>
                <ion-item>
                    <ion-label style="color:grey" position="stacked">Custom your sms</ion-label>
                    <ion-textarea v-model="sms"></ion-textarea>
                </ion-item>
            </div>
        </ion-item>
        <ion-item>
            <ion-label style="color:grey">Record microphone</ion-label>
            <ion-toggle v-model="this.recMic"/>
        </ion-item>


        <div style="display:flex;justify-content:center;">
            <ion-button @click="onCancel" color="light">Cancel</ion-button>
            <ion-button @click="onApply">Apply</ion-button>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonToggle, IonLabel,
 IonItem, IonInput, IonSelect, IonSelectOption, modalController, IonTextarea } from '@ionic/vue';
import { defineComponent } from "vue";
import { Contacts } from '@ionic-native/contacts';

export default defineComponent({
    name: 'ModalAlertProperty',
    props: {
        title: {type: String, default: 'Modal'},
        alert: {default: null}
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton, IonToggle, IonItem,
    IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea },
    data(){
        return{
            content: 'Content',
            
            name: 'alert',
            color: 'bg-red-500',
            tel: false,
            map: false,
            message: "Your message here",
            sendSms: false,
            sms: 'your custom sms here',
            contactsSelected: [],
            sendPosInSms: false,
            recMic:false,
        }
    },
    setup(){
        const contacts = new Contacts();
        return {
            contacts
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
                this.message = this.alert.message;
                this.sendSms = this.alert.sendSms;
                this.sms = this.alert.sms;
                this.contactsSelected = this.alert.contactsSelected;
                this.sendPosInSms = this.alert.sendPosInSms;
                this.recMic = this.alert.recMic;
            }
        },
        onCancel(){
            this.onDismiss("cancel")
        },
        onApply(){
            this.onDismiss({
                name:this.name,
                color:this.color,
                tel:this.tel,
                map:this.map,
                message: this.message,
                sendSms: this.sendSms,
                sms: this.sms,
                contactsSelected: this.contactsSelected,
                sendPosInSms: this.sendPosInSms,
                recMic: this.recMic
            })
        },
        onDismiss(result){
            //console.log({name:this.name, color:this.color, tel:this.tel, map:this.map});
            modalController.dismiss(result);
        },
        deleteAlert(){
            //TO DO : USE ALERET TO ASK TO THE USER IF HE IS SURE TO DELETE
            this.onDismiss("delete");
        },

        async pickContact(){
            const contact = await this.contacts.pickContact();
            this.contactsSelected.push({name: contact.displayName, tel: contact.phoneNumbers[0].value})
        },
        removeContact(i){
            console.log(i)
            this.contactsSelected.splice(i,1);
        }
    }
});
</script>