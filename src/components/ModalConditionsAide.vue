<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div>
            <div class="font-bold text-center text-xl mb-6">Conditions de Sécurité</div>
            
            <div class="m-3 font-bold text-center">SHELPTER a mis tout en œuvre afin de garantir la sécurité de tous les utilisateurs.</div>
            <div class="m-3"></div>
            
            <div class="m-3">
                 <div class="font-bold text-center text-sm">Points importants</div>
                    <li class="ml-10"> Ne prenez aucun risque pour vous</li>
                        SHELPTER vous met en relation avec des personnes à proximité lorsque vous le désirez mais vous laisse initialement choisir en qui vous avez confiance concernant l’envoi de votre position, l’envoi d’un message ou autre.
                        Nous conseillons à nos utilisateurs de bien prendre le temps de parler avec les personnes avant de les inviter à vous protéger ou d'accepter de les protéger. En effet, SHELPTER se veut être un outil qui permet de mieux vous rapprocher et de vous apporter une assistance mutuelle.
                    <li class="ml-10">Si vous acceptez ces conditions de sécurité :</li>
                        <li class="ml-15">Vous êtes conscient des risques que vous prenez</li>
                        <li class="ml-15">Vous vous engagez à apporter votre aide après l'aggression</li>
                        <li class="ml-15">Vous ne prenez aucun risque et appelez la police en cas de problème</li>
                        <li class="ml-15">Vous ne pouvez pas accepter les conditions si vous êtes mineur</li>
            </div>

            <div class="m-3">
                <div class="font-bold text-center text-sm">Protection de votre identité</div>
                    <li class="ml-10">En cas de problème avec la justice </li>
                        Shelpter n'est responsable d'aucun de vos actes et des conséquences de vos actes.
                        Il va de soit que les utilisateurs prennent des risque de leurs pleins gré.
                    <li class="ml-10">Inscription</li>
                        Pour créer un compte, SHELPTER a seulement besoin de deux informations : une adresse e-mail et un mot de passe de connexion.
                        Ensuite afin de vérifier que vous êtes bien le ou la propriétaire de l'e-mail renseigné, un lien de confirmation sera envoyé à cette même adresse. Sans confirmation de votre part, vous ne serez pas inscrit et ne pourrez pas accéder à l’application ni ses fonctionnalités.
                        Nous souhaitons garantir la sécurité maximum de nos utilisateurs, c’est pourquoi nous demandons une preuve d’identité afin de rassurer les utilisateurs des personnes malveillantes et qui s'inscrivent sur l’application à des fins autres que celles de SHELPTER. Cela empêchera ces personnes de vouloir installer l’application car nous pouvons récupérer leurs informations en cas de problèmes.
            </div>
            
            <div class="m-3"></div>
            <div class="font-bold text-center text-sm">Protection de vos données</div>
            <div class="m-3">
                SHELPTER sauvegarde et sécurise vos données.
                Chaque utilisateur pourra à tout moment se déconnecter et se reconnecter sur un autre téléphone. Les paramètres de comptes et les données d'alerte sont sauvegardés en continu sur nos serveurs.
                Si vous souhaitez rapporter la preuve d'une violence, mais votre téléphone est cassé ou volé vous pourrez vous connecter directement depuis le téléphone de votre interlocuteur pour retrouver toutes les données de votre compte.
                Vos données d'alerte sont conservées 15 jours sur nos serveurs avant d'être complètement détruites. Vous pouvez télécharger ces enregistrements pour les conserver plus longtemps et/ou les partager pour constituer des éléments de preuves.
                Ainsi SHELPTER sauvegarde les données de votre compte et de vos alertes mais sécurise également vos données sur des serveurs sécurisés aux communications chiffrées.

            </div>
        </div>

        
        <div class="flex flex-wrap justify-center">
            <ion-button @click="onCancel" color="light">Fermer</ion-button>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController } from '@ionic/vue';
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ModalConditionsAide',
    props: {
        title: {
            type: String,
            default: 'Modal'
        },
    },
    components:{ IonContent,IonHeader,IonTitle,IonToolbar, IonButton },
    data(){
        return{

        }
    },
    methods:{
        onCancel(){
            //si cest annule
            this.onDismiss("cancel")
        },
        onDismiss(result){
            modalController.dismiss(result);
        },
    }
});
</script>

<style>

.background-image{
    background-image: url("../../public/assets/image/rue.jpg") ;
    background-size: cover;
    height: 1000px;
  }

  .ion-color-logo {
    --ion-color-base: #655EA9;
    --ion-color-base-rgb: 101, 94, 169;
    --ion-color-contrast: #FFFFF;
    --ion-color-contrast-rgb: 0,0,0;
    --ion-color-shade: #553c9a;
    --ion-color-tint: #553c9a;
  }

</style>