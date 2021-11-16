import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderStatus, OrderType } from 'src/app/schemas/iorder';
import { Pet } from 'src/app/schemas/ipet';
import { Day, Days, User } from 'src/app/schemas/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-create-order',
  templateUrl: './modal-create-order.component.html',
  styleUrls: ['./modal-create-order.component.scss'],
  providers: [SharedDataService]
})
export class ModalCreateOrderComponent implements OnInit {
  @Input() caretaker: any;
  user: User;
  orderTypes = Object.values(OrderType);
  orderStatus = Object.values(OrderStatus);
  pets: Pet[];
  days = Object.values(Days);
  userId = '';

  newOrder: any = {
    charge: '0',
    startDateService: Date,
    endDateService: Date,
    orderStatus: undefined,
    orderType: '',
    pet: undefined,
    walkpath: undefined,
    dayService: undefined,
    shared: undefined,
    day: '',
    description: ''
  };

  constructor(
    private modalController: ModalController,
    private sharedDataService: SharedDataService,
    private petService: PetService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getPets();
    this.userId = this.authService.getUser().sub;
    this.sharedDataService.getCurrentPets().subscribe((pets) => {
      this.pets= pets;
    });
    if (this.caretaker.petCareData.type === 'Cuidador')
    {
      this.newOrder.orderType = 'Cuidado';
    }
    if (this.caretaker.petCareData.type === 'Paseador')
    {
      this.newOrder.orderType = 'Paseo';
    }
  }

  async getPets() {
    const pets = await this.petService.getOwnerPets(this.authService.getUser().sub);
    this.pets  = pets.data.values;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  createOrder() {
    console.log(this.newOrder);
  }
}
