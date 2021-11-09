import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'mis-mascotas',
    loadChildren: () => import('./screens/my-pets-screen/my-pets-screen.module').then( m => m.MyPetsScreenPageModule)
  },
  {
    path: 'buscar-cuidadores',
    loadChildren: () => import('./screens/caretakers-screen/caretakers-screen.module').then( m => m.CaretakersScreenPageModule)
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./screens/my-profile-screen/my-profile-screen.module').then( m => m.MyProfileScreenPageModule)
  },
  {
    path: 'ordenes',
    loadChildren: () => import('./screens/my-orders-screen/my-orders-screen.module').then( m => m.MyOrdersScreenPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
