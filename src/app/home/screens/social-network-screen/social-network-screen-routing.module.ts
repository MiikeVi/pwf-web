import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialNetworkScreenPage } from './social-network-screen.page';

const routes: Routes = [
  {
    path: '',
    component: SocialNetworkScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialNetworkScreenPageRoutingModule {}
