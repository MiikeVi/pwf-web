import { Injectable, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController, Platform } from '@ionic/angular';
import { LocalFile } from '../types/image-store.types';
import { JSONPatch } from '../types/json-patch.types';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

const IMG_DIR = 'stored-images';

@Injectable({
  providedIn: 'root'
})

export class ImageService implements OnInit {
  images: LocalFile[] = [];
  userId: string;

  constructor(
    private platform: Platform,
    private loadingController: LoadingController,
    private userService: UserService,
    private authService: AuthService) {}

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  async ngOnInit() {
    this.userId = this.authService.getUser().sub;
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    if (image) {
      const filename = await this.userService.uploadImage(image);
      const url = `https://pwf-api.herokuapp.com/${filename.data.imagePath}`;
      this.updateAvatar(url);
    } else {
      console.log('something went wrong');
    }
  }

  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    if (image) {
      const filename = await this.userService.uploadImage(image);
      const url = `https://pwf-api.herokuapp.com/${filename.data.imagePath}`;
      this.updateAvatar(url);
    } else {
      console.log('something went wrong');
    }
  }

  async updateAvatar(url: string) {
    const patchImage: JSONPatch = [{
      op: 'add',
      path: '/avatar',
      value: url,
    }];
    this.userService.patchUser(this.authService.getUser().sub, patchImage);
  }

}
