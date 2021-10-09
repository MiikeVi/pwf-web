import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Behavior, Behaviors, Breed, Pet, PetType } from 'src/app/schemas/ipet';
import { User } from 'src/app/schemas/iuser';
import { PetService } from 'src/app/services/pet.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-modal-create-pet',
  templateUrl: './modal-create-pet.component.html',
  styleUrls: ['./modal-create-pet.component.scss'],
})
export class ModalCreatePetComponent implements OnInit {
  owner: User;
  types = Object.values(PetType);
  breeds = Object.values(Breed);
  behaviors: Behavior[] = Object.values(Behaviors).map((behavior) =>  ({ behavior, selected: false }));
  alert;

  newPet: any = {
    name: '',
    age: '0',
    type: undefined,
    sex: '',
    weight: '0',
    breed: undefined,
    medication: undefined,
    behaviors: this.behaviors,
  };

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private petService: PetService,
    private sharedDataService: SharedDataService,
  ) { }

  ngOnInit() {
    this.sharedDataService.getCurrentUser().subscribe((user) => this.owner = user);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async onSubmitTemplate() {
    const petAge = parseInt(this.newPet.age, 10);
    const petMedication = this.newPet.medication === 'true';
    const petWeight = parseInt(this.newPet.weight, 10);
    const petBehaviors = this.newPet.behaviors.map((behavior) => {
      if (behavior.selected) {
        return behavior.behavior;
      }
    }).filter((behavior) => behavior);

    delete this.newPet.age;
    delete this.newPet.medication;
    delete this.newPet.weight;
    delete this.newPet.behaviors;

    const petClone: Pet = {
      ...this.newPet,
      age: petAge,
      medication: petMedication,
      weight: petWeight,
      behaviors: petBehaviors,
      owner: this.owner,
    };
    const createdPet = await this.petService.createPet(petClone);

    if (createdPet) {
      // eslint-disable-next-line no-underscore-dangle
      const fetchPets = await this.petService.getOwnerPets((this.owner as any)._id);
      this.sharedDataService.setPets(fetchPets.data.values);

      this.alert = await this.alertController.create({
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
    } else {
      this.alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        message: 'No se pudo agregar mascota',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
    }
    await this.alert.present();
  }

  presentAlertConfirm() {}
}
