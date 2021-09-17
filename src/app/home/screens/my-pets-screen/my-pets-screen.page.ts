import { Component, OnInit } from '@angular/core';
import { ModalCreatePetComponent } from 'src/app/shared/components/modal-create-pet/modal-create-pet.component';
import { ModalEditPetComponent } from 'src/app/shared/components/modal-edit-pet/modal-edit-pet.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-my-pets-screen',
  templateUrl: './my-pets-screen.page.html',
  styleUrls: ['./my-pets-screen.page.scss'],
})
export class MyPetsScreenPage implements OnInit {

  pets = [{
    name: 'Pequita',
    age: '12 años',
    type: 'Gato',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,g=0.5x0.5,f=auto/b5bd34054bc849159d949d50021d8926.png',
    },
    {
      name: 'Luna',
      age: '12 meses',
      type: 'Gato',
      image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,g=0.5x0.5,f=auto/b5bd34054bc849159d949d50021d8926.png',
    },
    {
      name: 'Ladridos',
      age: '2 años',
      type: 'Perro',
      image: 'https://images.emojiterra.com/openmoji/v12.2/512px/1f436.png',
    }
  ]

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async openModalEdit( pet: any) {
    const modal = await this.modalController.create({
      component: ModalEditPetComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        pet: pet,
      }
    });
    return await modal.present();
  }

  async openModalCreate() {
    const modal = await this.modalController.create({
      component: ModalCreatePetComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        
      }
    });
    return await modal.present();
  }

  deletePet() {
    console.log('eliminado');
  }

}
