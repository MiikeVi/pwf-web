import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { CaretakersScreenPageRoutingModule } from './caretakers-screen-routing.module';

import { CaretakersScreenPage } from './caretakers-screen.page';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CaretakersScreenPageRoutingModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  declarations: [CaretakersScreenPage]
})
export class CaretakersScreenPageModule {}
