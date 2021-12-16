import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ModalSendRequestComponent } from 'src/app/shared/components/modal-send-request/modal-send-request.component';
import { UserService } from 'src/app/services/user.service';
import { CareTakerType, Days, Day, DogsType, DogsTypes, HomeType, User, WalkPaths, DayEnable } from 'src/app/schemas/iuser';
import { createPatch } from 'rfc6902';
import { ModalCreateWalkpathComponent } from 'src/app/shared/components/modal-create-walkpath/modal-create-walkpath.component';
import { ImageService } from 'src/app/services/image-store.service';
import { JSONPatch } from 'src/app/types/json-patch.types';
import { cities } from 'src/app/utils/districts';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-my-profile-screen',
  templateUrl: './my-profile-screen.page.html',
  styleUrls: ['./my-profile-screen.page.scss'],
})
export class MyProfileScreenPage implements OnInit {
  cities = cities;
  districts;
  selectedDistrict;
  selectedCity;
  cityOptions: string[];

  data: any = {} as any;
  userClone: User;
  homeTypes = Object.values(HomeType);
  caretakerTypes = Object.values(CareTakerType);
  dogsTypes: DogsType[] = Object.values(DogsTypes).map((dogsType) => ({dogsType, selected: false}));
  daysEnableds = [];
  avatarUrl = '';
  loadingImage;
  rutas: any;
  daysRaw = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

  constructor(
    public alertController: AlertController,
    private modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
    private imageStoreService:  ImageService,
    private navController: NavController,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    this.districts = cities.map((region) =>  region.name);
    // eslint-disable-next-line no-underscore-dangle
    await this.getUser();
    this.avatarUrl = `https://pwf-api.herokuapp.com/${this.data.avatar}`;
    this.userClone = JSON.parse(JSON.stringify(this.data));
    this.dogsTypes.forEach((element, index) => {
      if (this.data?.petCareData?.careTakerData?.dogsType.includes(element.dogsType)) {
        this.dogsTypes[index].selected = true;
      }
    });

    this.daysEnableds = this.data.petCareData?.careTakerData?.daysEnabled || [];
    this.filterOlderDays();

    for(let i = 0; i < 10; i++){
      let date;

      if(i === 0){
          date = new Date();
      }else{
          date = new Date(Date.now() + i*24*60*60*1000);
      }
      this.checkIfExist(date);
    }

    this.daysEnableds?.sort((a,b)=>{
      const aDate = new Date(a.day);
      const bDate = new Date (b.day);
      if(new Date(aDate.setHours(0,0,0,0)).getTime() < new Date(bDate.setHours(0,0,0,0)).getTime()){
        return -1;
      }
      if(new Date(aDate.setHours(0,0,0,0)).getTime() > new Date(bDate.setHours(0,0,0,0)).getTime()){
        return 1;
      }
      return 0;
    });
  }

  checkIfExist(date){
    if(!this.daysEnableds?.find((element)=>{
      const elementDate = new Date (element.day);
        if(new Date(date.setHours(0,0,0,0)).getTime() === new Date(elementDate.setHours(0,0,0,0)).getTime()){
          return true;
        }
    })){
      this.daysEnableds?.push({day: date, selected: false, ordered: false});
    }
  }

  filterOlderDays(){
    const todayDate = new Date();
    const temporalArray = [];
    if(this.daysEnableds) {
      for(const element of this.daysEnableds){
        const elementDate = new Date (element.day);
        if(new Date(elementDate.setHours(0,0,0,0)).getTime() >= new Date(todayDate.setHours(0,0,0,0)).getTime()){
          temporalArray.push(element);
        }
      }
      this.daysEnableds = temporalArray;
    }
  }

  formatedDate(date){
    return `${this.daysRaw[new Date (date).getDay()]} ${new Date(date).toISOString().slice(0, 10).split('-').reverse().join('/')}`;
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

          }
        }
      ]
    });
    await alert.present();
  }

  logout() {
    this.navController.navigateRoot('/login');
    this.authService.logout();
    this.orderService.desactivateGeolocation();
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
      if(newWalkpath.data !== undefined){
        const endTime = new Date(newWalkpath.data.schedule.startTime);
        const finalEndTime = this.addHoursToDate(endTime);
        newWalkpath.data.schedule.endTime = finalEndTime;
        newWalkpath.data.available = true;
        newWalkpath.data.pets = [];
        this.data?.petCareData?.walkerData?.walkPaths.push(newWalkpath.data);
        const patch: JSONPatch = [
          {
            op: 'replace',
            path: '/petCareData',
            value: this.data.petCareData,
          },
        ];
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
    const patch: JSONPatch = [
      {
        op: 'replace',
        path: '/petCareData',
        value: this.data.petCareData,
      }
    ];
    // eslint-disable-next-line no-underscore-dangle
    const patchedUser = await this.userService.patchUser((this.data as any)._id, patch as any);
    if(patchedUser) {
      this.getUser();
    }
  }

  async patchCareTaker() {
    this.data.petCareData.careTakerData.dogsType = this.dogsTypes.map ((dogsType) => {
      if (dogsType.selected) {
        return dogsType.dogsType;
      }
    }).filter((dogsType) => dogsType);
    this.data.petCareData.careTakerData.daysEnabled = this.daysEnableds?.filter( day => day.selected === true);
    const patchUser: JSONPatch = [{
      op: 'replace',
      path: '/petCareData',
      value: this.data.petCareData
    }];

    // eslint-disable-next-line no-underscore-dangle
    this.userService.patchUser(this.data._id ,patchUser);
    this.getUser();
    this.presentAlertConfirm();
  }

  setCityValues(regionSelected) {
    this.cities.forEach((region) => {
      if (regionSelected === region.name) {
        this.cityOptions = region.communes;
      }
    });
    this.data.region = regionSelected;
  }

  onChangeCity(city: string) {
    this.data.city = city;
  }
}
