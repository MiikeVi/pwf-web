import { Component, OnInit } from '@angular/core';
import { ModalCreatePetComponent } from 'src/app/shared/components/modal-create-pet/modal-create-pet.component';
import { ModalEditPetComponent } from 'src/app/shared/components/modal-edit-pet/modal-edit-pet.component';
import { ModalController } from '@ionic/angular';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/schemas/ipet';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-my-pets-screen',
  templateUrl: './my-pets-screen.page.html',
  styleUrls: ['./my-pets-screen.page.scss'],
})
export class MyPetsScreenPage implements OnInit {
  pets: Pet[];

  constructor(
    public modalController: ModalController,
    private petService: PetService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
  ) { }

  ngOnInit() {
    this.getPets();
    this.sharedDataService.getCurrentPets().subscribe((pets) => {
      this.pets = pets;
    });
    // eslint-disable-next-line no-underscore-dangle

  }

  async getPets() {
    const pets = await this.petService.getOwnerPets(this.authService.getUser().sub);
    this.pets  = pets.data.values;
  }

  async deletePet(pet: Pet) {
    // eslint-disable-next-line no-underscore-dangle
    const deleted =  await this.petService.deletePet((pet as any)._id);
    if (deleted) {
      // eslint-disable-next-line no-underscore-dangle
      this.getPets();
    }
  }

  async createPet(petData: Pet) {
    const created = await this.petService.createPet(petData);
    if (created) {
      this.getPets();
    }
  }

  async openModalEdit(pet: any) {
    const petClone = JSON.parse(JSON.stringify(pet));
    const modal = await this.modalController.create({
      component: ModalEditPetComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        pet,
        petClone,
      }
    });

    modal.present();
  }

  async openModalCreate() {
    const modal = await this.modalController.create({
      component: ModalCreatePetComponent,
      cssClass: 'my-custom-class',
      componentProps: {

      }
    });

    modal.present();
  }
}
