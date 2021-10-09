import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared-data.service';
import { Credentials } from './types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: Credentials = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.credentials).subscribe(async res => {

      if (typeof (res) !== 'string') {
        await this.alertController.create({
          header: 'Login failed',
          message: 'Wrong Credentials.',
          buttons: ['OK'],
        }).then(alert => alert.present());
      } else {
        this.sharedDataService.setUser(this.authService.getUser());
        this.router.navigateByUrl('home/buscar-cuidadores');
      }
    });
  }
}
