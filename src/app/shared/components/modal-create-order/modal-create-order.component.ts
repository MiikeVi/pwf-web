import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Order, OrderStatus, OrderType } from 'src/app/schemas/iorder';
import { Pet } from 'src/app/schemas/ipet';
import { Day, Days, User, WalkPaths } from 'src/app/schemas/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
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
  @Input() caretaker: User;
  user: User;
  orderTypes = Object.values(OrderType);
  orderStatus = Object.values(OrderStatus);
  pets: Pet[];
  days = Object.values(Days);
  userId = '';
  routes: any;
  selectedRoute: WalkPaths;
  selectedPet: Pet;

  newOrder: any = {
    charge: '0',
    startDateService: Date,
    endDateService: Date,
    orderStatus: undefined,
    orderType: '',
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
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
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
    this.routes = this.caretaker.petCareData.walkerData.walkPaths;
  }

  onChangeRoute(selectedRoute) {
    this.selectedRoute = selectedRoute;
  }

  onChangePet(selectedPet) {
    this.selectedPet = selectedPet;
  }

  async getPets() {
    const pets = await this.petService.getOwnerPets(this.authService.getUser().sub);
    this.pets  = pets.data.values;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async createOrder() {
    let order: Order;

    if (this.newOrder.orderType === OrderType.care) {
      order = {
        charge: this.newOrder.charge,
        createdAt: new Date(),
        startDateService: this.newOrder.startDateService,
        endDateService: this.newOrder.endDateService,
        dayService: this.newOrder.dayService,
        userId: this.userId,
        // eslint-disable-next-line no-underscore-dangle
        careTakerId: (this.caretaker as any)._id,
        orderStatus: OrderStatus.pending,
        pet: this.selectedPet,
        orderType: this.newOrder.orderType,
      };
    } else {
      order = {
        charge: this.newOrder.charge,
        createdAt: new Date(),
        userId: this.userId,
        // eslint-disable-next-line no-underscore-dangle
        careTakerId: (this.caretaker as any)._id,
        orderStatus: OrderStatus.pending,
        pet: this.selectedPet,
        orderType: this.newOrder.orderType,
        shared: this.newOrder.shared,
        walkPath: this.selectedRoute,
        description: this.newOrder.description || '',
      };
    }
    console.log(order);
    await this.orderService.createOrder(order);
    this.router.navigateByUrl('home/');
    this.router.navigateByUrl('home/ordenes');
    this.dismiss();

  }
}
