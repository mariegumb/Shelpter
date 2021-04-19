<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div class="m-7 mt-8">
            <div class="px-3 text-center">
                <span>
                    Veuillez entrer les logins des utilisateurs qui vous sont venus en aide
                </span>
            </div>
            <div>
                <ion-item class="text-purple-600">
                    <ion-label position="floating">Login</ion-label>
                    <ion-input type="search" @ionChange="onChangeSearch" v-model="searchValue"/>
                </ion-item>
            </div>
            <ion-list>
                <ion-item @click="addHelper(user.login)" v-for="user in usersFiltred" v-bind:key="user.id">
                    <ion-label>{{user.login}}</ion-label>
                </ion-item>
            </ion-list>
            <div class="flex justify-center text-xl mt-8">
                <div v-if="helpers.length === 0">
                    Aucun utilisateur selectionné
                </div>
                <ul v-else class="list-disc">
                    <li v-for="(loginHelper,i) in helpers" v-bind:key="loginHelper">
                        <div class="flex justify-between items-center">
                            <div>
                                {{loginHelper}}
                            </div>
                            <ion-button color="purple" class="ml-4 w-3 h-6" @click="removeHelper(i)">
                                X
                            </ion-button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="flex justify-center mt-5">
                <ion-button @click="onCancel" color="light">Annuler</ion-button>
                <ion-button @click="onApply" color="purple">Valider</ion-button>
            </div>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController, IonInput, IonLabel, IonItem } from '@ionic/vue';
import { defineComponent } from "vue";
import { getUsers } from '@/composables/mongoApi';

export default defineComponent({
    name: 'ModalAddProtect',
    props: {
        title: String,
        myLogin: String,
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton, IonInput, IonLabel, IonItem },
    data(){
        return{
            users: [],
            usersFiltred: [],
            helpers: [],
            searchValue: '',
        }
    },
    methods:{
        onCancel(){
            this.onDismiss("cancel")
        },
        onApply(){
            this.onDismiss({logins: this.helpers})
        },
        onDismiss(result){
            modalController.dismiss(result);
        },
        onChangeSearch(event){
            if(event.detail.value === ''){
                this.usersFiltred = [];
            }
            else{
                const filtred = [];
                for(const user of this.users){
                    if(user.login.includes(event.detail.value) && user.login !== this.myLogin){
                        filtred.push(user)
                    }
                }
                this.usersFiltred = filtred;
            }
        },
        addHelper(login){
            this.searchValue = '';
            if(!this.helpers.includes(login)){
                this.helpers.push(login)
            }
        },
        removeHelper(i){
            this.helpers.splice(i,1)
        }
    },
    async beforeMount(){
        this.users = await getUsers();
    }
});
</script>