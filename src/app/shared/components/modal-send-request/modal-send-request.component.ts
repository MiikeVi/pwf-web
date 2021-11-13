import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { createPatch } from 'rfc6902';
import { CareTakerData, CareTakerType, HomeType, PetCareData, User } from 'src/app/schemas/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-send-request',
  templateUrl: './modal-send-request.component.html',
  styleUrls: ['./modal-send-request.component.scss'],
})
export class ModalSendRequestComponent implements OnInit {

  request = {
    bio: '',
    type: '' as any,
  };

  userClone: User;
  data: any = {} as any;
  caretakerTypes = Object.values(CareTakerType);

  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private authService: AuthService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getUser();
    this.userClone = JSON.parse(JSON.stringify(this.data));
  }

  async getUser() {
    // eslint-disable-next-line no-underscore-dangle
    this.data = (await this.userService.getUser(this.authService.getUser().sub)).data;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async createRequest() {
    //Si no es nada y quiere ser Cuidador
    if (!this.data?.petCareData?.type && this.request.type === 'Cuidador')
    {
      const careTakerData = {
        home: '',
        availability: '',
        days: [],
        dogsType: []
      };
      const petCareData = {
        bio : this.request.bio,
        type : CareTakerType.petCare,
        careTakerData,
      };

      this.data.petCareData = petCareData;
    }
    //Si no es nada y quiere ser Paseador
    else if (!this.data?.petCareData?.type && this.request.type === 'Paseador'){
      const walkerData = {
        walkPaths : [],
      };

      const petCareData = {
        walkerData,
        type: CareTakerType.petWalker
      };

      this.data.petCareData = petCareData;
    }
    //Si es Paseador y quiere ser Cuidador
    else if (this.data?.petCareData?.type === 'Paseador'){
      const careTakerData = {
        home: '',
        availability: '',
        days: [],
        dogsType: []
      };

      this.data.petCareData.bio = this.request.bio;
      this.data.petCareData.type = CareTakerType.both;
      this.data.petCareData.careTakerData = careTakerData;

    }
    //Si es Cuidador y quiere ser Paseador
    else {

      const walkerData = {
        walkPaths : [],
      };

      this.data.petCareData.bio = this.request.bio;
      this.data.petCareData.type = CareTakerType.both;
      this.data.petCareData.walkerData = walkerData;
    }

    console.log (this.data);

    const patch = createPatch(this.userClone, this.data);
    // eslint-disable-next-line no-underscore-dangle
    const patchedUser = await this.userService.patchUser((this.data as any)._id, patch as any);

    if(patchedUser) {
      this.presentAlertConfirm();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Petición enviada',
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
}
