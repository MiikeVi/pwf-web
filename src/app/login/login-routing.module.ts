import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../home/home.page';
import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'buscar-cuidadores',
    loadChildren: () => import('../home/screens/caretakers-screen/caretakers-screen.module').then( m => m.CaretakersScreenPageModule)
  },
  {
    path: 'home',
    component: HomePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
