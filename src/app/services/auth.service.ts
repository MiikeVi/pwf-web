import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import axios from 'axios';

const helper = new JwtHelperService();
const TOKEN = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private platform: Platform,
    private router: Router) {
      this.storage.create();
      this.loadStoredToken();
  }


  loadStoredToken() {
    const platformObs = from(this.platform.ready());
    this.user = platformObs.pipe(
      switchMap(() => from(this.storage.get(TOKEN))),
      map((token) => {
        if (!token) {return null;}
        const decoded = helper.decodeToken(token);
        this.userData.next(decoded);
        return true;
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return from(axios({
      method: 'post',
      url: 'https://pwf-api.herokuapp.com/api/auth/login',
      data: {
        email: credentials.email,
        password: credentials.password,
      }
    })).pipe(
      take(1),
      map((res) => {
        if (res.status !== 401) {
          const token: string = res.data.access_token;
          return token;
        }
        return res.status;

      }),
      switchMap((element) => {
        if (element !== null && element !== undefined && typeof(element) === 'string') {
          const decoded = helper.decodeToken(element);
          this.userData.next(decoded);
          const storageObs = from(this.storage.set(TOKEN, element));
          return storageObs;
        }
        return of(element);
      }),
      catchError(() => of(401))
    );
  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    return this.storage.remove(TOKEN).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }
}
