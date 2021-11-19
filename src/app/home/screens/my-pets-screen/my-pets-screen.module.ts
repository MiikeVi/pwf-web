import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { MyPetsScreenPageRoutingModule } from './my-pets-screen-routing.module';

import { MyPetsScreenPage } from './my-pets-screen.page';
import { SharedDataService } from 'src/app/services/shared-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MyPetsScreenPageRoutingModule
  ],
  declarations: [MyPetsScreenPage],
  providers: [SharedDataService]
})
export class MyPetsScreenPageModule {}
