import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { CaretakersScreenPageRoutingModule } from './caretakers-screen-routing.module';

import { CaretakersScreenPage } from './caretakers-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CaretakersScreenPageRoutingModule,
  ],
  declarations: [CaretakersScreenPage]
})
export class CaretakersScreenPageModule {}
