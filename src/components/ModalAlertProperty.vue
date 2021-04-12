<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div style="display:flex;justify-content:flex-end;">
            <ion-button @click="deleteAlert" color="danger">Supprimer</ion-button>
        </div>
        <ion-item>
            <ion-label style="color:grey" position="stacked">Nom</ion-label>
            <ion-input v-model="this.name" placeholder="Name here"/>
        </ion-item>
        <ion-item>
            <ion-label style="color:grey" posistion="stacked">Color</ion-label>
            <ion-select v-model="this.color" ok-text="Choose" cancel-text="Cancel">
                <ion-select-option value="bg-red-500">Rouge</ion-select-option>
                <ion-select-option value="bg-purple-500">Violet</ion-select-option>
                <ion-select-option value="bg-blue-500">Bleu</ion-select-option>
                <ion-select-option value="bg-pink-500">Rose</ion-select-option>
                <ion-select-option value="bg-orange-500">Orange</ion-select-option>
                <ion-select-option value="bg-yellow-500">Jaune</ion-select-option>
                <ion-select-option value="bg-green-500">Vert</ion-select-option>
                <ion-select-option value="bg-gray-900">Gris</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label style="color:grey">Fake call</ion-label>
            <ion-toggle v-model="this.tel"/>
        </ion-item>
        <ion-item>
            <div style="display:flex;flex-direction:column;margin:10px 0px;width:100%;">
                <div style="display:flex;justify-content:space-between;">
                    <ion-label style="color:grey">Share position with users</ion-label>
                    <ion-toggle v-model="this.map"/>
                </div>
                <ion-radio-group v-if="map" style="width:100%;margin-top:10px;" @ionChange="onChangeSharePos" v-bind:value="sharePosInfo">
                    <ion-item>
                        <ion-label style="color:grey">Send to your protectors only</ion-label>
                        <ion-radio value="protectors"/>
                    </ion-item>
                    <ion-item>
                        <ion-label style="color:grey">Send to all users of the app</ion-label>
                        <ion-radio value="everyone"/>
                    </ion-item>
                </ion-radio-group>
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
                    <div style="width:100%;display:flex;justify-content:space-between;margin:10px 0px">
                        <ion-label style="color:grey">Send to 114 (police)</ion-label>
                        <ion-toggle v-model="this.send114"/>
                    </div>
                </ion-item>
                <ion-item>
                    <div style="display:flex;flex-direction:column;width:100%;margin:10px 0px">
                        <div style="display:flex;flex-direction:row;justify-content:space-between;width:100%;align-items:center;">
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
            <div style="display:flex;flex-direction:column;margin:10px 0px;width:100%;">
                <div style="display:flex;justify-content:space-between;width:100%;align-items:center;">
                    <ion-label style="color:grey">Call</ion-label>
                    <ion-toggle v-model="this.call"/>
                </div>
                <ion-radio-group v-if="call" style="width:100%;margin-top:10px;" @ionChange="onChangeCall" v-bind:value="callInfo">
                    <ion-item>
                        <ion-label style="color:grey">Call 17</ion-label>
                        <ion-radio value="police"/>
                    </ion-item>
                    <ion-item @click="chooseCaller">
                        <ion-label style="color:grey">Call {{ contactToCall.name }}</ion-label>
                        <ion-radio value="contact"/>
                    </ion-item>
                </ion-radio-group>
            </div>
        </ion-item>
        <ion-item>
            <div style="display:flex;flex-direction:column;margin:10px 0px;width:100%;">
                <div style="display:flex;justify-content:space-between;width:100%;align-items:center;">
                    <ion-label style="color:grey">Recording</ion-label>
                    <ion-toggle v-model="this.record"/>
                </div>
                <ion-radio-group v-if="record" style="width:100%;margin-top:10px;" @ionChange="onChangeRecord" v-bind:value="recordInfo">
                    
                    <ion-item>
                        <ion-label style="color:grey">Record only microphone</ion-label>
                        <ion-radio value="mic"/>
                    </ion-item>
                    <ion-item>
                        <ion-label style="color:grey">Record camera and microphone</ion-label>
                        <ion-radio value="cam"/>
                    </ion-item>
                </ion-radio-group>
            </div>
        </ion-item>


        <div style="display:flex;justify-content:center;">
            <ion-button @click="onCancel" color="light">Cancel</ion-button>
            <ion-button @click="onApply">Apply</ion-button>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonToggle, IonLabel,
 IonItem, IonInput, IonSelect, IonSelectOption, modalController, IonTextarea, IonRadio, IonRadioGroup } from '@ionic/vue';
import { defineComponent } from "vue";
import { Contacts } from '@ionic-native/contacts';

export default defineComponent({
    name: 'ModalAlertProperty',
    props: {
        title: {type: String, default: 'Modal'},
        alert: {default: null}
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton, IonToggle, IonItem,
    IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea, IonRadio, IonRadioGroup },
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
            record: false,
            recordInfo: 'mic',
            send114: false,
            sharePosInfo: 'protectors',
            call: false,
            callInfo: 'police',
            contactToCall: { name: 'someone', tel: 'none'}
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
                this.record = this.alert.record;
                this.recordInfo = this.alert.recordInfo
                this.send114 = this.alert.send114;
                this.sharePosInfo = this.alert.sharePosInfo;
                this.call = this.alert.call;
                this.callInfo = this.alert.callInfo;
                this.contactToCall = this.alert.contactToCall;
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
                record: this.record,
                recordInfo: this.recordInfo,
                send114: this.send114,
                sharePosInfo: this.sharePosInfo,
                call: this.call,
                callInfo: this.callInfo,
                contactToCall: this.contactToCall,
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
        },
        onChangeRecord(event){
            this.recordInfo = event.detail.value
        },
        onChangeSharePos(event){
            this.sharePosInfo = event.detail.value
            console.log(this.sharePosInfo)
        },
        onChangeCall(event){
            this.callInfo = event.detail.value
        },
        async chooseCaller(){
            const contact = await this.contacts.pickContact();
            this.contactToCall = { name: contact.displayName, tel: contact.phoneNumbers[0].value }
        }
    }
});
</script>