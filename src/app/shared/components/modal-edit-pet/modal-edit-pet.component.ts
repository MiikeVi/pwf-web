import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { createPatch } from 'rfc6902';
import { Behavior, Behaviors, Breed, Pet, PetType } from 'src/app/schemas/ipet';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-modal-edit-pet',
  templateUrl: './modal-edit-pet.component.html',
  styleUrls: ['./modal-edit-pet.component.scss'],
})
export class ModalEditPetComponent implements OnInit {

  @Input() pet: any;
  @Input() petClone: any;

  ownerId;
  alert;
  types = Object.values(PetType);
  breeds = Object.values(Breed);
  behaviors: Behavior[] = Object.values(Behaviors).map((behavior) =>  ({ behavior, selected: false }));

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private petService: PetService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
  ) { }

  ngOnInit() {
    this.behaviors.forEach((element, index) => {
      if (this.pet.behaviors.includes(element.behavior)) {
        this.behaviors[index].selected = true;
      }
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async onSubmitTemplate() {
    this.petClone.age = parseInt(this.petClone.age, 10);
    this.petClone.weight = parseInt(this.petClone.weight, 10);
    this.petClone.medication = this.petClone.medication;
    this.petClone.behaviors = this.behaviors.map((behavior) => {
      if (behavior.selected) {
        return behavior.behavior;
      }
    }).filter((behavior) => behavior);

    const patch = createPatch(this.pet, this.petClone);

    // eslint-disable-next-line no-underscore-dangle
    const patchedPet = await this.petService.patchPet((this.pet as any)._id, patch as any);

    if (patchedPet) {
      this.ownerId = this.authService.getUser().sub;
      // eslint-disable-next-line no-underscore-dangle
      const fetchPets = await this.petService.getOwnerPets(this.ownerId);
      this.sharedDataService.setPets(fetchPets.data.values);

      this.alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        message: 'Su mascota ha sido actualizada',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
            }
          }
        ]
      });
    } else {
      this.alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        message: 'No se pudo actualizar la mascota',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
            }
          }
        ]
      });
    }
    await this.alert.present();
  }

  async presentAlertConfirm() {}
}
