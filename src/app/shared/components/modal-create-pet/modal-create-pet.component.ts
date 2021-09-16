import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-create-pet',
  templateUrl: './modal-create-pet.component.html',
  styleUrls: ['./modal-create-pet.component.scss'],
})
export class ModalCreatePetComponent implements OnInit {

  newPet = {
    name: '',
    age: '',
    type:'',
    sex: '',
    weight: '',
    breed: '',
    medication: '',
    medicationDetails: '',
    features: [{
      name: 'Esterelizado',
      selected: false
    },
    {
      name: 'Entrenado',
      selected: false
    },
    {
      name: 'Vacunado contra la rabia',
      selected: false
    },
    {
      name: 'Amistoso con perros',
      selected: false
    },
    {
      name: 'Amistoso con gatos',
      selected: false
    },
  ]
  }
  index: number = 0;

  constructor(private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  onSubmitTemplate() {
    console.log(this.newPet);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Su mascota ha sido agregada',
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
