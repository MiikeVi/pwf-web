import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { MyPetsScreenPageRoutingModule } from './my-pets-screen-routing.module';

import { MyPetsScreenPage } from './my-pets-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MyPetsScreenPageRoutingModule
  ],
  declarations: [MyPetsScreenPage]
})
export class MyPetsScreenPageModule {}
