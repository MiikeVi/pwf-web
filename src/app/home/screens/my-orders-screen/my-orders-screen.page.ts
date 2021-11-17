import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order, OrderStatus, OrderType } from 'src/app/schemas/iorder';
import { User } from 'src/app/schemas/iuser';
import { AuthService } from 'src/app/services/auth.service';
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
  ) {}

  async ngOnInit() {
    await this.getUser();
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
