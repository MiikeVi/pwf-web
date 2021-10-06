import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingScreenPageRoutingModule } from './tracking-screen-routing.module';

import { TrackingScreenPage } from './tracking-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingScreenPageRoutingModule
  ],
  declarations: [TrackingScreenPage]
})
export class TrackingScreenPageModule {}
