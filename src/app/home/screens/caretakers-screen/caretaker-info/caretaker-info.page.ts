import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/schemas/iuser';
import { UserService } from 'src/app/services/user.service';
import { ModalCreateOrderComponent } from 'src/app/shared/components/modal-create-order/modal-create-order.component';

@Component({
  selector: 'app-caretaker-info',
  templateUrl: './caretaker-info.page.html',
  styleUrls: ['./caretaker-info.page.scss'],
})
export class CaretakerInfoPage implements OnInit {

  caretakerSelected: User = null;
  rutas;
  days;
  dogsTypes;

  constructor(private userService: UserService, private modalController: ModalController) { }

  ngOnInit() {
      this.caretakerSelected = this.userService.caretakerSelected;
      this.rutas = this.caretakerSelected.petCareData?.walkerData?.walkPaths;
      this.days = this.caretakerSelected.petCareData?.careTakerData?.days;
      this.dogsTypes = this.caretakerSelected.petCareData?.careTakerData?.dogsType;
      console.log(this.dogsTypes);
  }

  getUserStars(user: User) {
    return Array(user.stars);
  }

  async openModalCreateOrder(caretaker: any) {
    const modal = await this.modalController.create({
      component: ModalCreateOrderComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        caretaker
      }
    });
    return await modal.present();
  }
}
