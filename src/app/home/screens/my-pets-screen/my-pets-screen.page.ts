import { Component, Input, OnInit } from '@angular/core';
import { ModalCreatePetComponent } from 'src/app/shared/components/modal-create-pet/modal-create-pet.component';
import { ModalEditPetComponent } from 'src/app/shared/components/modal-edit-pet/modal-edit-pet.component';
import { ModalController } from '@ionic/angular';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { User } from 'src/app/schemas/iuser';
import { Pet } from 'src/app/schemas/ipet';


@Component({
  selector: 'app-my-pets-screen',
  templateUrl: './my-pets-screen.page.html',
  styleUrls: ['./my-pets-screen.page.scss'],
})
export class MyPetsScreenPage implements OnInit {
  user: User;
  pets: Pet[];

  constructor(
    public modalController: ModalController,
    private petService: PetService,
    private sharedDataService: SharedDataService,
  ) { }

  ngOnInit() {
    this.sharedDataService.getCurrentUser().subscribe(user => this.user = user);
    // eslint-disable-next-line no-underscore-dangle
    this.getPets((this.user as any)._id);
  }

  async getPets(userId: string) {
    const pets = await this.petService.getOwnerPets(userId);
    this.sharedDataService.setPets(pets.data.values);
    this.sharedDataService.getCurrentPets().subscribe((petsArray) => this.pets = petsArray);
  }

  async deletePet(pet: Pet) {
    // eslint-disable-next-line no-underscore-dangle
    const deleted =  await this.petService.deletePet((pet as any)._id);
    if (deleted) {
      // eslint-disable-next-line no-underscore-dangle
      this.getPets((this.user as any)._id);
    }
  }

  async createPet(petData: Pet) {
    return await this.petService.createPet(petData);
  }

  async openModalEdit( pet: any) {
    const modal = await this.modalController.create({
      component: ModalEditPetComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        pet,
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
}
