import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOrdersScreenPage } from './my-orders-screen.page';

const routes: Routes = [
  {
    path: '',
    component: MyOrdersScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrdersScreenPageRoutingModule {}
