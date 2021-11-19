import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Order, OrderStatus, OrderType } from 'src/app/schemas/iorder';
import { Pet } from 'src/app/schemas/ipet';
import { Days, User, WalkPaths } from 'src/app/schemas/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { PetService } from 'src/app/services/pet.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';
import { JSONPatch } from 'src/app/types/json-patch.types';

@Component({
  selector: 'app-modal-create-order',
  templateUrl: './modal-create-order.component.html',
  styleUrls: ['./modal-create-order.component.scss'],
  providers: [SharedDataService]
})
export class ModalCreateOrderComponent implements OnInit {
  @Input() caretaker: User;
  currentDate;
  data: any = {} as any;
  userClone: User;
  user: User;
  orderTypes = Object.values(OrderType);
  orderStatus = Object.values(OrderStatus);
  pets: Pet[];
  days = Object.values(Days);
  userId = '';
  routes: any;
  selectedRoute: WalkPaths;
  selectedPet: Pet;
  daysRaw = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
  daysEnableds = [];
  price: number;
  sharedOptions: boolean[];

  newOrder: any = {
    charge: 0,
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
    private navController: NavController,
  ) { }

  ngOnInit() {
    this.getUser();
    this.userClone = JSON.parse(JSON.stringify(this.data));
    this.getPets();
    this.userId = this.authService.getUser().sub;
    this.sharedDataService.getCurrentPets().subscribe((pets) => {
      this.pets= pets;
    });
    if (this.caretaker?.petCareData?.type === 'Cuidador')
    {
      this.newOrder.orderType = 'Cuidado';
    }
    if (this.caretaker?.petCareData?.type === 'Paseador')
    {
      this.newOrder.orderType = 'Paseo';
    }

    this.routes = this.caretaker?.petCareData?.walkerData?.walkPaths;
    this.daysEnableds = this.caretaker?.petCareData?.careTakerData?.daysEnabled || [];
  }

  onChangeRoute(selectedRoute) {
    this.selectedRoute = selectedRoute;
    if(this.selectedRoute.shared) {
      this.sharedOptions = [];
      this.sharedOptions.push(true);
      this.sharedOptions.push(false);
    }
    if(!this.selectedRoute.shared) {
      this.sharedOptions = [];
      this.sharedOptions.push(false);
    }
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

  formatedDate(date){
    return `${this.daysRaw[new Date (date).getDay()]} ${new Date (date).toISOString().slice(0, 10).split('-').reverse().join('/')}`;
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
        // eslint-disable-next-line no-underscore-dangle
        pet: (this.selectedPet as any)._id,
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
        // eslint-disable-next-line no-underscore-dangle
        pet: (this.selectedPet as any)._id,
        orderType: this.newOrder.orderType,
        shared: this.newOrder.shared,
        walkPath: this.selectedRoute,
        description: this.newOrder.description || '',
      };

      // eslint-disable-next-line max-len
      const actualWalkPaths = this.caretaker.petCareData.walkerData.walkPaths.filter((walkPath) => walkPath.id !== this.selectedRoute.id);

      if(this.selectedRoute.pets.length < this.selectedRoute.maxPets) {
        // eslint-disable-next-line no-underscore-dangle
        this.selectedRoute.pets.push((this.selectedPet as any)._id);
        const patchPet: JSONPatch = [
          {
            op: 'replace',
            path: '/isActive',
            value: false,
          }
        ];
        // eslint-disable-next-line no-underscore-dangle
        this.petService.patchPet((this.selectedPet as any)._id, patchPet);
      }

      if(this.selectedRoute.pets.length === this.selectedRoute.maxPets || this.newOrder.shared === false) {
        this.selectedRoute.available = false;
      }
      const careTakerCopy = JSON.parse(JSON.stringify(this.caretaker));
      careTakerCopy.petCareData.walkerData.walkPaths = [...actualWalkPaths, this.selectedRoute ];
      const patchRoute: JSONPatch = [
        {
          op: 'replace',
          path: '/petCareData',
          value: careTakerCopy.petCareData,
        }
      ];
      // eslint-disable-next-line no-underscore-dangle
      await this.userService.patchUser((this.caretaker as any)._id, patchRoute);
    }
    await this.orderService.createOrder(order);

    if (this.daysEnableds.length && this.newOrder.orderType === OrderType.care) {
      this.daysEnableds[this.currentDate].ordered = true;
      this.data.petCareData.careTakerData.daysEnabled = this.daysEnableds;
      const patchCare: JSONPatch = [
        {
          op: 'replace',
          path: '/petCareData',
          value: this.data.petCareData,
        },
      ];
      // eslint-disable-next-line no-underscore-dangle
      await this.userService.patchUser((this.data as any)._id, patchCare as any);
    }

    this.navController.navigateRoot('/home');
    this.router.navigateByUrl('home/ordenes');
    this.dismiss();
  }

  setCurrentDay(i){
    this.currentDate = i;
  }

  onChangeMode(value: boolean) {
    if (value) {
      this.price = this.selectedRoute.sharedPrice;
    } else {
      this.price = this.selectedRoute.price;
    }
    this.newOrder.charge = this.price;
  }

  async getUser() {
    // eslint-disable-next-line no-underscore-dangle
    this.data = (await this.userService.getUser(this.authService.getUser().sub)).data;
  }
}
