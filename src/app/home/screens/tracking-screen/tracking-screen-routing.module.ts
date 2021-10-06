import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingScreenPage } from './tracking-screen.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingScreenPageRoutingModule {}
