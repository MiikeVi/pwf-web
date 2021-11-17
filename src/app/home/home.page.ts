import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { createPatch } from 'rfc6902';
import { User } from '../schemas/iuser';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any = {} as any;
  userClone: User;

  constructor(
    private geolocation: Geolocation,
    private ordersService: OrderService,
    private userService: UserService,
    private authService: AuthService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(){
    this.getUser();
    this.userClone = JSON.parse(JSON.stringify(this.data));
    if(this.ordersService.geolocation){

    this.geolocation.getCurrentPosition().then (async (resp) => {
      setInterval(async () => {
        const position = {
          lat: resp.coords.latitude,
          lon: resp.coords.longitude
        };
        this.data.petCareData.position = position;
        const patch = createPatch(this.userClone, this.data);
        // eslint-disable-next-line no-underscore-dangle
        await this.userService.patchUser((this.data as any)._id, patch as any);
      }, 10000);
    });
    }
  }

  async getUser() {
    // eslint-disable-next-line no-underscore-dangle
    this.data = (await this.userService.getUser(this.authService.getUser().sub)).data;
  }
}
