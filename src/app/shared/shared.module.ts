import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './components/tabs/tabs.component';
import { ModalCreatePetComponent } from './components/modal-create-pet/modal-create-pet.component';
import { ModalEditPetComponent } from './components/modal-edit-pet/modal-edit-pet.component';
import { ModalCreateOrderComponent } from './components/modal-create-order/modal-create-order.component';
import { ModalSendRequestComponent } from './components/modal-send-request/modal-send-request.component';
import { ModalCreateWalkpathComponent } from './components/modal-create-walkpath/modal-create-walkpath.component'

const components = [
  TabsComponent,
  ModalCreatePetComponent,
  ModalEditPetComponent,
  ModalCreateOrderComponent,
  ModalSendRequestComponent,
  ModalCreateWalkpathComponent
];

@NgModule({
  declarations: [... components],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [...components]
})
export class SharedModule { }
