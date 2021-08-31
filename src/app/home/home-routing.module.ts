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
    path: 'red-social',
    loadChildren: () => import('./screens/social-network-screen/social-network-screen.module').then( m => m.SocialNetworkScreenPageModule)
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./screens/my-profile-screen/my-profile-screen.module').then( m => m.MyProfileScreenPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
