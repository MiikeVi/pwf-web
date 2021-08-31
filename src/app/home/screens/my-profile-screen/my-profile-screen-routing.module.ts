import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProfileScreenPage } from './my-profile-screen.page';

const routes: Routes = [
  {
    path: '',
    component: MyProfileScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfileScreenPageRoutingModule {}
