import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialNetworkScreenPageRoutingModule } from './social-network-screen-routing.module';

import { SocialNetworkScreenPage } from './social-network-screen.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SocialNetworkScreenPageRoutingModule
  ],
  declarations: [SocialNetworkScreenPage]
})
export class SocialNetworkScreenPageModule {}
