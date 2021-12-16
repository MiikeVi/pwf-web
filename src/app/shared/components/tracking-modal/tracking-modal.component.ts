import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { OrderService } from 'src/app/services/order.service';
import { User } from 'src/app/schemas/iuser';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-tracking-modal',
  templateUrl: './tracking-modal.component.html',
  styleUrls: ['./tracking-modal.component.scss'],
})
export class TrackingModalComponent implements OnInit {

  @Input() pet: any;
  alert;
  data: any;
  user: User;
  orders;
  actualLat;
  actualLong;
  map: L.Map;
  theMarker = {};
  markerIcon = {
    icon: L.icon({
      iconSize: [45, 61],
      iconAnchor: [30, 61],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: '../../../../assets/ubicationIcon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png'
    })
  };

  constructor(
    private modalController: ModalController,
    private ordersService: OrderService,
    private userService: UserService,
    private authService: AuthService,
    private alertController: AlertController)
    { }

  async ngOnInit() {
    await this.ordersService.getUserOrders(this.authService.getUser().sub).then((orders) => {
      this.orders = orders.data.values;
    });

    // eslint-disable-next-line no-underscore-dangle
    const orderFiltred = this.orders.filter((order) => (order.pet === this.pet._id && order.orderStatus === 'en progreso'));
    // eslint-disable-next-line no-underscore-dangle
    if (orderFiltred[0]?.careTakerId)
    {
        this.getUser(orderFiltred[0].careTakerId).then((data) => {

        this.actualLat = data.petCareData.position.lat;
        this.actualLong = data.petCareData.position.lon;
        const latLng = L.latLng(this.actualLat, this.actualLong);

        this.map = L.map('map', {
          center: [latLng.lat, latLng.lng],
          zoom: 15,
          renderer: L.canvas()
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          // maxZoom: 12,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);

        this.theMarker = L.marker([latLng.lat, latLng.lng], this.markerIcon).addTo(this.map);

        setTimeout(() => {
          this.map.invalidateSize();
        }, 500);
      });
    }
    else {
      this.alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        message: 'Tracking no disponible para esta mascota',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.dismiss();
            }
          }
        ]
      });
    }
    await this.alert.present();
  }

  async getUser(id: any){
    return (await this.userService.getUser(id)).data;
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
