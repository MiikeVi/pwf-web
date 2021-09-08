import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        console.log('canActivate guard: ', user);
        if (!user) {
          this.alertController.create({
            header: 'Unauthorized',
            message: 'You are not allowed to access that page.',
            buttons: ['Ok'],
          }).then(alert => alert.present());
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }
}
