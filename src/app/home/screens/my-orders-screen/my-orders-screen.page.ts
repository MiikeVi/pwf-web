import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { createPatch } from 'rfc6902';
import { Order, OrderStatus, OrderType } from 'src/app/schemas/iorder';
import { User } from 'src/app/schemas/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';
import { ModalViewOrderComponent } from 'src/app/shared/components/modal-view-order/modal-view-order.component';
import { JSONPatch } from 'src/app/types/json-patch.types';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-my-orders-screen',
  templateUrl: './my-orders-screen.page.html',
  styleUrls: ['./my-orders-screen.page.scss'],
})
export class MyOrdersScreenPage implements OnInit {

  selectedTab;
  userClone: User;
  user: User;
  statusAccepted = OrderStatus.accepted;
  statusPending = OrderStatus.pending;
  statusCancelled = OrderStatus.cancelled;
  statusFinished = OrderStatus.finished;
  statusInProgress = OrderStatus.inProgress;
  selectedOrder: Order;

  selectedOrders: Order[];

  orders;

  careTakerOrders;

  constructor(
    public modalController: ModalController,
    private ordersService: OrderService,
    private authService: AuthService,
    private userService: UserService,
    private petService: PetService,
  ) {}

  async ngOnInit() {
    await this.getUser();
    this.userClone = JSON.parse(JSON.stringify(this.user));
    this.ordersService.getUserOrders(this.authService.getUser().sub).then((orders) => {
      this.orders = orders.data.values;
      this.selectedOrders = orders.data.values;

    });
    if (this.user?.careTakerEnabled) {
      this.ordersService.getCareTakerOrders(this.authService.getUser().sub).then((careTakerOrders) => {
        this.careTakerOrders = careTakerOrders.data.values;
      });
    }
  }

  tabChanged(tab) {
    this.selectedTab = tab.detail.value;
    if (!(this.selectedTab === 'ordenes')) {
      this.selectedOrders = this.careTakerOrders;
    } else {
      this.selectedOrders = JSON.parse(JSON.stringify(this.orders));
    }
  }

  async openModalViewOrder(order: Order) {
    const modal = await this.modalController.create({
      component: ModalViewOrderComponent,
      cssClass: 'my-custom-class',
      componentProps: { order }
    });

    modal.present();
  }

  onClickOrder(order) {
    this.openModalViewOrder(order);
  }

  onAcceptOrder(order) {
    const patch: JSONPatch = [
      {
        op: 'replace',
        path: '/orderStatus',
        value: OrderStatus.accepted,
      }
    ];
    // eslint-disable-next-line no-underscore-dangle
    this.ordersService.patchOrder((order as any)._id, patch).then(async () => {
      // eslint-disable-next-line no-underscore-dangle
      this.selectedOrders =  (await this.ordersService.getCareTakerOrders((this.user as any)._id)).data.values;
    });
    //TO-DO notify to userId of the order
  }

  onFinishOrder(order) {
    const patch: JSONPatch = [
      {
        op: 'replace',
        path: '/orderStatus',
        value: OrderStatus.finished,
      }
    ];
    // eslint-disable-next-line no-underscore-dangle
    this.ordersService.patchOrder((order as any)._id, patch).then(async () => {
      // eslint-disable-next-line no-underscore-dangle
      this.selectedOrders =  (await this.ordersService.getCareTakerOrders((this.user as any)._id)).data.values;
    });
    this.ordersService.desactivateGeolocation();
    // TO-DO notify to userId
  }

  onCancelOrder(order) {

    const patch: JSONPatch = [
      {
        op: 'replace',
        path: '/orderStatus',
        value: OrderStatus.cancelled,
      }
    ];

    // eslint-disable-next-line no-underscore-dangle
    this.ordersService.patchOrder((order as any)._id, patch).then(async () => {

    const patchPet: JSONPatch = [
      {
        op: 'replace',
        path: '/isActive',
        value: true,
      }
    ];

    if (order.walkPath){
      //update walkPath
      const actualWalkPaths = this.user.petCareData.walkerData.walkPaths.filter((walkPath) => {
        // eslint-disable-next-line no-underscore-dangle
        if (!walkPath.pets.includes((order.pet as any)._id)) {
          return true;
        }
        return false;
      });

      const orderWalkPath = JSON.parse(JSON.stringify(order.walkPath));
      const newPets = orderWalkPath.pets.filter((pet) => pet !== order.pet);
      orderWalkPath.pets = newPets;

      const userCopy = JSON.parse(JSON.stringify(this.user));

      if(orderWalkPath.pets.length <= orderWalkPath.maxPets) {
        orderWalkPath.available = true;
      }

      const updatedWalkPaths = [...actualWalkPaths, orderWalkPath];

      userCopy.petCareData.walkerData.walkPaths = updatedWalkPaths;

      const patchRoute: JSONPatch = [
        {
          op: 'replace',
          path: '/petCareData',
          value: userCopy.petCareData,
        }
      ];
      // eslint-disable-next-line no-underscore-dangle
      await this.userService.patchUser(userCopy._id, patchRoute);
    }

    if (order.dayService) {
    // eslint-disable-next-line no-underscore-dangle
    this.petService.patchPet((order as any)._id, patchPet);

    this.user.petCareData.careTakerData.daysEnabled.find((element)=>{
      const elementDate = new Date (element.day);
      const aDate = new Date (order.dayService);
      console.log(element.day);
        if(new Date(aDate.setHours(0,0,0,0)).getTime() === new Date(elementDate.setHours(0,0,0,0)).getTime()){
            element.ordered = false;
        }
    });

    const patchUser: JSONPatch = [{
      op: 'replace',
      path: '/petCareData',
      value: this.user.petCareData
    }];

    // eslint-disable-next-line no-underscore-dangle
    this.userService.patchUser(((this.user as any)._id), patchUser);

    }

    // eslint-disable-next-line no-underscore-dangle
    this.selectedOrders =  (await this.ordersService.getCareTakerOrders((this.user as any)._id)).data.values;
    });
    // TO-DO notify to userId
  }


  async onStartOrderService(order) {
    const patch: JSONPatch = [
      {
        op: 'replace',
        path: '/orderStatus',
        value: OrderStatus.inProgress,
      }
    ];
    // eslint-disable-next-line no-underscore-dangle
    this.ordersService.patchOrder((order as any)._id, patch).then(async () => {
      // eslint-disable-next-line no-underscore-dangle
      this.selectedOrders =  (await this.ordersService.getCareTakerOrders((this.user as any)._id)).data.values;
    });

    this.ordersService.activateGeolocation();
    //TO-DO notify to userId of the order
  }

  async getUserOrders(userId: string) {
    return await this.ordersService.getUserOrders(userId).then((orders) => {
      this.orders = orders.data.values;
    });
  }

  async getOwnCareTakerOrders(careTakerId: string) {
    return await this.ordersService.getUserOrders(careTakerId).then((careTakerOrders) => {
      this.careTakerOrders = careTakerOrders.data;
    }) ;
  }

  async getOrder(orderId: string) {
    return await this.ordersService.getOrder(orderId).then((order) => {
      this.selectedOrder = order.data;
    });
  }

  async getUser() {
    this.user = (await this.userService.getUser(this.authService.getUser().sub)).data;
  }

}
