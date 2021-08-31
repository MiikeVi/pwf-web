import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPetsScreenPage } from './my-pets-screen.page';

const routes: Routes = [
  {
    path: '',
    component: MyPetsScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPetsScreenPageRoutingModule {}
