import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaretakersScreenPage } from './caretakers-screen.page';



const routes: Routes = [
  {
    path: '',
    component: CaretakersScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaretakersScreenPageRoutingModule {}
