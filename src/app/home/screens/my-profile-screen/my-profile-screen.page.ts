import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalSendRequestComponent } from 'src/app/shared/components/modal-send-request/modal-send-request.component';
import { UserService } from 'src/app/services/user.service';
import { User, WalkPaths } from 'src/app/schemas/iuser';
import { createPatch } from 'rfc6902';
import { ModalCreateWalkpathComponent } from 'src/app/shared/components/modal-create-walkpath/modal-create-walkpath.component';



@Component({
  selector: 'app-my-profile-screen',
  templateUrl: './my-profile-screen.page.html',
  styleUrls: ['./my-profile-screen.page.scss'],
})
export class MyProfileScreenPage implements OnInit {

  data: any = {} as any;
  userClone: User;
  
  rutas: WalkPaths[] = [{
    location: 'valpo',
    schedule: {
      startTime: '11',
      endTime: '12',
      day: 'Viernes'
    }
  },
  {
    location: 'viña',
    schedule: {
      startTime: '13',
      endTime: '14',
      day: 'Lunes'
    }
  },
  ]


  constructor(
    public alertController: AlertController,
    private modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit() {

    // eslint-disable-next-line no-underscore-dangle
    this.getUser();
    this.userClone = JSON.parse(JSON.stringify(this.data));
  }

  async onSubmitTemplate() {
    const patch = createPatch(this.userClone, this.data);

    // eslint-disable-next-line no-underscore-dangle
    const patchedUser = await this.userService.patchUser((this.data as any)._id, patch as any);

    if(patchedUser) {
      this.presentAlertConfirm();
    }
  }

  async getUser() {
    // eslint-disable-next-line no-underscore-dangle
    this.data = (await this.userService.getUser(this.authService.getUser().sub)).data;
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Su perfil ha sido actualizado',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
  }

  async openModalSendRequest() {
    const modal = await this.modalController.create({
      component: ModalSendRequestComponent,
      cssClass: 'my-custom-class',
      componentProps: {}
    });
    return await modal.present();
  }

  async openModalAddWalkpath() {
    const modal = await this.modalController.create({
      component: ModalCreateWalkpathComponent,
      cssClass: 'my-custom-class',
      componentProps: {}
    });

    modal.onDidDismiss().then(newWalkpath => {
      this.rutas.push(newWalkpath.data)
    })

    return await modal.present();
  }

}
