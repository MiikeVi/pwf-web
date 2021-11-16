import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  data = {
    name: '',
    email:'',
    birthdate: Date,
    address: '',
    city: '',
    region: '',
    phoneNumber: '',
    password: '',
    isActive: true,
    // eslint-disable-next-line max-len
    avatar: 'https://media.istockphoto.com/vectors/dog-paw-icon-logo-vector-id1005374612?k=20&m=1005374612&s=170667a&w=0&h=xKzVpMC2epvlTYflUHIXdEv5FfdWJ2LihJe4hoO3Pi4=',
  };

  constructor(
    public alertController: AlertController,
    public userService: UserService,
    private router: Router) {}

  onSubmitTemplate() {
    this.userService.createUser(this.data).then(result =>{
      if (result){
        this.presentAlertConfirm();
        console.log(this.data);
      }
      else {
        this.presentAlertConfirmError();
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Su perfil ha sido creado',
    });
    await alert.present();
    setTimeout(() => {
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      });
    }, 2000);
  }

  async presentAlertConfirmError() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Su perfil no ha podido ser creado, revise que los campos esten bien rellenados.',
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
