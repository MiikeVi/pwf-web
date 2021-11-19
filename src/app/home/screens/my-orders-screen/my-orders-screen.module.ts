import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { IonicModule } from '@ionic/angular';
import { MatDialogModule } from '@angular/material/dialog';

import { MyOrdersScreenPageRoutingModule } from './my-orders-screen-routing.module';

import { MyOrdersScreenPage } from './my-orders-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOrdersScreenPageRoutingModule,
    MatTabsModule,
    MatDialogModule,
  ],
  declarations: [MyOrdersScreenPage]
})
export class MyOrdersScreenPageModule {}
