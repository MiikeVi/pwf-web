import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './components/tabs/tabs.component';

const components = [
  TabsComponent
];

@NgModule({
  declarations: [... components],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [...components]
})
export class SharedModule { }
