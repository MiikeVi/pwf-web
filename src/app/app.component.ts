import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private geolocation: Geolocation) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {

    //this.geolocation.getCurrentPosition().then ((resp) => {
    //  console.log(typeof resp.coords.longitude);
    //  setInterval(() => {
    //    console.log(resp.coords.latitude, resp.coords.longitude);
    //  }, 10000);
    //});

  }

}
