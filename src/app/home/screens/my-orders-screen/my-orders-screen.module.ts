import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrdersScreenPageRoutingModule } from './my-orders-screen-routing.module';

import { MyOrdersScreenPage } from './my-orders-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOrdersScreenPageRoutingModule
  ],
  declarations: [MyOrdersScreenPage]
})
export class MyOrdersScreenPageModule {}
