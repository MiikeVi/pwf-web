import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalSendRequestComponent } from 'src/app/shared/components/modal-send-request/modal-send-request.component';

@Component({
  selector: 'app-my-profile-screen',
  templateUrl: './my-profile-screen.page.html',
  styleUrls: ['./my-profile-screen.page.scss'],
})
export class MyProfileScreenPage implements OnInit {

  data = {
    name: 'carlitos',
    address: '',
    email:'holi@holi.com',
    address2: '',
    city: '',
    numberPhone:'',
    numberPhone2:'',
    birthday: Date,
    postalCode: '',
  }

  constructor(public alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
  }

  onSubmitTemplate() {
    console.log(this.data);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Su perfil ha sido actualizado',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async openModalSendRequest() {
    const modal = await this.modalController.create({
      component: ModalSendRequestComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        
      }
    });
    return await modal.present();
  }

}
