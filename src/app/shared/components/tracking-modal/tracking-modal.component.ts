import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tracking-modal',
  templateUrl: './tracking-modal.component.html',
  styleUrls: ['./tracking-modal.component.scss'],
})
export class TrackingModalComponent implements OnInit {

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

  actualLat;
  actualLong;

  constructor(
    private modalController: ModalController,
    private geolocation: Geolocation)
    { }

  async ngOnInit() {

    this.geolocation.getCurrentPosition().then ((resp) => {

      this.actualLat = resp.coords.latitude;
      this.actualLong = resp.coords.longitude;

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
      }, 250);

    }).catch((error) => {
      console.log ('Error getting location', error);
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
