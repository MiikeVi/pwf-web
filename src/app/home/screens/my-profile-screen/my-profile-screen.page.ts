import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-my-profile-screen',
  templateUrl: './my-profile-screen.page.html',
  styleUrls: ['./my-profile-screen.page.scss'],
})
export class MyProfileScreenPage implements OnInit {

  data = {
    name: 'Test 9',
    address: '',
    email:'test9@pwf.com',
    address2: '',
    city: '',
    numberPhone:'',
    numberPhone2:'',
    birthday: Date,
    postalCode: '',
  };

  constructor(public alertController: AlertController, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitTemplate() {
    console.log(this.data);
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

}
