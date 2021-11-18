import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ModalSendRequestComponent } from 'src/app/shared/components/modal-send-request/modal-send-request.component';
import { UserService } from 'src/app/services/user.service';
import { CareTakerType, Days, Day, DogsType, DogsTypes, HomeType, User, WalkPaths } from 'src/app/schemas/iuser';
import { createPatch } from 'rfc6902';
import { ModalCreateWalkpathComponent } from 'src/app/shared/components/modal-create-walkpath/modal-create-walkpath.component';
import { ImageService } from 'src/app/services/image-store.service';


@Component({
  selector: 'app-my-profile-screen',
  templateUrl: './my-profile-screen.page.html',
  styleUrls: ['./my-profile-screen.page.scss'],
})
export class MyProfileScreenPage implements OnInit {

  data: any = {} as any;
  userClone: User;
  homeTypes = Object.values(HomeType);
  caretakerTypes = Object.values(CareTakerType);
  dogsTypes: DogsType[] = Object.values(DogsTypes).map((dogsType) => ({dogsType, selected: false}));
  days: Day[] = Object.values(Days).map((day) => ({day, selected: false}));
  avatarUrl = '';
  loadingImage;
  rutas: any;

  constructor(
    public alertController: AlertController,
    private modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
    private imageStoreService:  ImageService,
    private navController: NavController,
  ) {}

  ngOnInit() {
    // eslint-disable-next-line no-underscore-dangle
    this.getUser();
    this.avatarUrl = `https://pwf-api.herokuapp.com/${this.data.avatar}`;
    this.userClone = JSON.parse(JSON.stringify(this.data));
    this.dogsTypes.forEach((element, index) => {
      if (this.data?.petCareData?.careTakerData?.dogsType.includes(element.dogsType)) {
        this.dogsTypes[index].selected = true;
      }
    });
    this.days.forEach((element, index) => {
      if (this.data?.petCareData?.careTakerData?.days.includes (element.day)) {
        this.days[index].selected = true;
      }
    });
  }

  async onSubmitTemplate() {
    const patch = createPatch(this.userClone, this.data);

    // eslint-disable-next-line no-underscore-dangle
    const patchedUser = await this.userService.patchUser((this.data as any)._id, patch as any);

    if(patchedUser) {
      this.presentAlertConfirm();
    }
  }

  async onClickImage() {
    const modal = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      buttons: [
        {
          text: 'Seleccionar foto',
          handler: () => {
            this.selectImage();
          }
        },
        {
          text:  'Abrir cámara',
          handler: () => {
            this.imageStoreService.openCamera();
          }
        }
      ]
    });

    await modal.present();
  }

  async getUser() {
    // eslint-disable-next-line no-underscore-dangle
    this.data = (await this.userService.getUser(this.authService.getUser().sub)).data;
    this.rutas = this.data?.petCareData?.walkerData?.walkPaths;
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
    this.navController.navigateRoot('/login');
    this.authService.logout();
  }

  async selectImage() {
    await this.imageStoreService.selectImage();
    this.ngOnInit();
    this.data = (await this.userService.getUser(this.authService.getUser().sub)).data;
  }

  async openModalSendRequest() {
    const modal = await this.modalController.create({
      component: ModalSendRequestComponent,
      cssClass: 'my-custom-class',
      componentProps: {}
    });
    modal.onDidDismiss().then (() => {
      this.ngOnInit();
    });
    return await modal.present();
  }

  async openModalAddWalkpath() {
    const modal = await this.modalController.create({
      component: ModalCreateWalkpathComponent,
      cssClass: 'my-custom-class',
      componentProps: {}
    });

    modal.onDidDismiss().then(async newWalkpath => {
      if(newWalkpath.data !== undefined)
      {
        const endTime = new Date(newWalkpath.data.schedule.startTime);
        const finalEndTime = this.addHoursToDate(endTime);
        newWalkpath.data.schedule.endTime = finalEndTime;
        newWalkpath.data.available = true;
        newWalkpath.data.pets = [];
        this.data?.petCareData?.walkerData?.walkPaths.push(newWalkpath.data);

        const patch = createPatch(this.userClone, this.data);
        // eslint-disable-next-line no-underscore-dangle
        const patchedUser = await this.userService.patchUser((this.data as any)._id, patch as any);

        if(patchedUser) {
          this.presentAlertConfirm();
        }
      }
    });

    return await modal.present();
  }

  addHoursToDate(objDate) {
    const numberOfMlSeconds = objDate.getTime();
    const addMlSeconds = 60 * 60000;
    const newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    return newDateObj;
}

  async deleteWalkpath(walkPath: WalkPaths) {
    const newWalkpaths = this.rutas.filter((ruta) => ruta !== walkPath);

    this.data.petCareData.walkerData.walkPaths = newWalkpaths;

    const patch = createPatch(this.userClone, this.data);
    // eslint-disable-next-line no-underscore-dangle
    const patchedUser = await this.userService.patchUser((this.data as any)._id, patch as any);

    if(patchedUser) {
      this.getUser();
    }
  }

  async patchCareTaker() {
    this.data.petCareData.careTakerData.days = this.days.map ((day) => {
      if (day.selected) {
        return day.day;
      }
    }).filter((day) => day);

    this.data.petCareData.careTakerData.dogsType = this.dogsTypes.map ((dogsType) => {
      if (dogsType.selected) {
        return dogsType.dogsType;
      }
    }).filter((dogsType) => dogsType);

    const patch = createPatch(this.userClone, this.data);
    // eslint-disable-next-line no-underscore-dangle
    const patchedUser = await this.userService.patchUser((this.data as any)._id, patch as any);

    if (patchedUser) {
      this.getUser();
      this.presentAlertConfirm();
    }
  }

}
