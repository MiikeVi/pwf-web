import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit-pet',
  templateUrl: './modal-edit-pet.component.html',
  styleUrls: ['./modal-edit-pet.component.scss'],
})
export class ModalEditPetComponent implements OnInit {

  @Input() pet;

  constructor(private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  onSubmitTemplate() {
    console.log(this.pet);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'La mascota ha sido actualizada',
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
}
