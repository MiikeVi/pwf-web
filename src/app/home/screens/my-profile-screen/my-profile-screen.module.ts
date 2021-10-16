import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { MyProfileScreenPageRoutingModule } from './my-profile-screen-routing.module';

import { MyProfileScreenPage } from './my-profile-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MyProfileScreenPageRoutingModule
  ],
  declarations: [MyProfileScreenPage],
  providers: [],
})
export class MyProfileScreenPageModule {}
