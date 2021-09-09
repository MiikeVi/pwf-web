import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login({ email: '111', password: '222' }).subscribe(async res => {

      if (typeof (res) !== 'string') {
        await this.alertController.create({
          header: 'Login failed',
          message: 'Wrong Credentials.',
          buttons: ['OK'],
        }).then(alert => alert.present());
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }
}
