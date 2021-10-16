import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderStatus, OrderType } from 'src/app/schemas/iorder';
import { Pet } from 'src/app/schemas/ipet';
import { User } from 'src/app/schemas/iuser';
import { PetService } from 'src/app/services/pet.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-modal-create-order',
  templateUrl: './modal-create-order.component.html',
  styleUrls: ['./modal-create-order.component.scss'],
  providers: [SharedDataService]
})
export class ModalCreateOrderComponent implements OnInit {
  user: User;
  orderTypes = Object.values(OrderType);
  orderStatus = Object.values(OrderStatus);
  pets: Pet[];

  newOrder: any = {
    charge: '0',
    startDateService: Date,
    endDateService: Date,
    orderStatus: undefined,
    orderType: '',
    pet: undefined,
  }

  constructor(
    private modalController: ModalController,
    private sharedDataService: SharedDataService,
    private petService: PetService
  ) { }

  ngOnInit() {
    this.sharedDataService.getCurrentUser().subscribe(user => this.user = user);
    this.getPets((this.user as any)._id);
  }

  async getPets(userId: string) {
    const pets = await this.petService.getOwnerPets(userId);
    this.sharedDataService.setPets(pets.data.values);
    this.sharedDataService.getCurrentPets().subscribe((petsArray) => this.pets = petsArray);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  checkValue(event){
    console.log(event.detail.value);
  }

}