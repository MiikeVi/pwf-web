import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Order, OrderStatus } from 'src/app/schemas/iorder';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-view-order',
  templateUrl: 'modal-view-order.component.html',
  styleUrls: ['./modal-view-order.component.scss']
})
export class ModalViewOrderComponent implements OnInit {

  @Input() order: Order;

  statusAccepted = OrderStatus.accepted;
  statusPending = OrderStatus.pending;
  statusCancelled = OrderStatus.cancelled;
  statusFinished = OrderStatus.finished;
  careTakerName;
  petName;

  constructor(
    public modalController: ModalController,
    private router: Router,
    private userService: UserService,
    private petService: PetService,
  ) {}

  async ngOnInit() {
    this.careTakerName = (await this.userService.getUser(this.order.careTakerId)).data.name;
    this.petName = (await this.petService.getPetById(this.order.pet)).data.name;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async goToUser() {
    const user = await this.userService.getUser(this.order.careTakerId);
    this.userService.selectCaretaker(user.data);
    this.router.navigateByUrl('home/buscar-cuidadores/cuidador');
    this.dismiss();
  }
}
