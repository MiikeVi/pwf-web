import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order, OrderStatus } from 'src/app/schemas/iorder';

@Component({
  selector: 'app-modal-view-order',
  templateUrl: 'modal-view-order.component.html',
  styleUrls: ['./modal-view-order.component.scss']
})
export class ModalViewOrderComponent {

  @Input() order: Order;

  statusAccepted = OrderStatus.accepted;
  statusPending = OrderStatus.pending;
  statusCancelled = OrderStatus.cancelled;
  statusFinished = OrderStatus.finished;

  constructor(public modalController: ModalController) {

  }

  dismiss() {
    this.modalController.dismiss();
  }

  goToUser() {
    // TO-DO navigate to user profile
  }
}
