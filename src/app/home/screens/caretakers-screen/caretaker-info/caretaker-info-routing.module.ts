import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaretakerInfoPage } from './caretaker-info.page';

const routes: Routes = [
  {
    path: '',
    component: CaretakerInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaretakerInfoPageRoutingModule {}
