import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaretakerInfoPageRoutingModule } from './caretaker-info-routing.module';

import { CaretakerInfoPage } from './caretaker-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaretakerInfoPageRoutingModule
  ],
  declarations: [CaretakerInfoPage]
})
export class CaretakerInfoPageModule {}
