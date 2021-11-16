import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order, OrderStatus, OrderType } from 'src/app/schemas/iorder';
import { User } from 'src/app/schemas/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ModalViewOrderComponent } from 'src/app/shared/components/modal-view-order/modal-view-order.component';
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
  selectedOrder: Order;

  selectedOrders: Order[];

  orders: Order[] = [
    {
      createdAt: new Date(),
      charge: 5650,
      startDateService: new Date(),
      endDateService: new Date(),
      userId: '1234',
      caretakerId: '12345',
      orderStatus: OrderStatus.accepted,
      pet: undefined,
      orderType: OrderType.walk,
      shared: false,
      dayService: new Date(),
    }
  ];

  caretakerOrders: Order[] = [
    {
      createdAt: new Date(),
      charge: 5650,
      startDateService: new Date(),
      endDateService: new Date(),
      userId: '12344',
      caretakerId: '123445',
      orderStatus: OrderStatus.finished,
      pet: undefined,
      orderType: OrderType.walk,
      shared: true,
      dayService: new Date(),
    }
  ];

  constructor(
    public modalController: ModalController,
    private ordersService: OrderService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.selectedOrders = this.orders;
    this.getUser();
    this.getUserOrders(this.authService.getUser().sub);

  }

  tabChanged(tab) {
    this.selectedTab = tab.detail.value;
    if (!(this.selectedTab === 'ordenes')) {
      this.selectedOrders = this.caretakerOrders;
    } else {
      this.selectedOrders = this.orders;
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

  onAcceptOrder() {
    //TO-DO patch orderStatus
    //TO-DO notify to userId of the order
  }

  onFinishOrder() {
    //TO-DO patch orderStatus
    // TO-DO notify to userId
  }

  onCancelOrder() {
    //TO-DO patch orderStatus
    // TO-DO notify to userId
  }

  onStartOrderService() {
    //TO-DO notify to userId of the order
    // QUIZAS AÑADIR STATUS IN PROGRESS
    //TO-DO start tracking service

  }

  async getUserOrders(userId: string) {
    return await this.ordersService.getUserOrders(userId).then((orders) => {
      this.orders = orders.data;
    });
  }

  async getOwnCareTakerOrders(careTakerId: string) {
    return await this.ordersService.getUserOrders(careTakerId).then((careTakerOrders) => {
      this.caretakerOrders = careTakerOrders.data;
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
