import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/schemas/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { cities } from 'src/app/utils/districts';

@Component({
  selector: 'app-caretakers-screen',
  templateUrl: './caretakers-screen.page.html',
  styleUrls: ['./caretakers-screen.page.scss'],
})
export class CaretakersScreenPage implements OnInit {

  expanded = false;

  users;

  filters = [
    {
      val: 'Location',
      isChecked: false,
    },
  ];

  cities = cities;
  districts;
  cityOptions: string[];

  selectedDistrict;
  selectedCity;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.districts = cities.map((region) =>  region.name);
    return this.userService.getCaretakerUsers().then((data) => {
      this.users = data.data.values.filter((user) => {
        const activeWalkPaths = user.petCareData?.walkerData?.walkPaths?.filter((walkPath) => walkPath.available);
        const daysEnabled = user.petCareData?.careTakerData?.daysEnabled?.filter((day) => day.selected);
        // eslint-disable-next-line no-underscore-dangle
        if ((activeWalkPaths?.length || daysEnabled?.length) && ((user as any)._id !== this.authService.getUser().sub)) {
          return user;
        }
      });
    });
  }

  getUserStars(user: User) {
    return Array(user.stars);
  }

  goHome() {
    this.router.navigateByUrl('home');
  }

  goCaretakerInfo(user: any) {
    this.userService.selectCaretaker(user);
    this.router.navigateByUrl('home/buscar-cuidadores/cuidador');
  }

  expandPanel() {
    if(!this.expanded) {
      this.expanded = true;
    } else {
      this.expanded = false;
    }
  }

  applyFilters() {
    if(this.expanded) {
      this.expanded = false;
    }

    if(this.selectedCity) {
      this.userService.getCaretakerUsers(this.selectedCity).then((data) => {
        this.users = data.data.values.filter((user) => {
          const activeWalkPaths = user.petCareData?.walkerData?.walkPaths.filter((walkPath) => walkPath.available);
          const daysEnabled = user.petCareData?.careTakerData?.daysEnabled?.filter((day) => day.selected);
          // eslint-disable-next-line no-underscore-dangle
          if ((activeWalkPaths?.length || daysEnabled?.length) && ((user as any)._id !== this.authService.getUser().sub)) {
            return user;
          }
        });
      });
    } else {
      this.userService.getCaretakerUsers().then((data) => {
        this.users = data.data.values.filter((user) => {
          const activeWalkPaths = user.petCareData?.walkerData?.walkPaths.filter((walkPath) => walkPath.available);
          const daysEnabled = user.petCareData?.careTakerData?.daysEnabled?.filter((day) => day.selected);
          // eslint-disable-next-line no-underscore-dangle
          if ((activeWalkPaths?.length || daysEnabled?.length) && ((user as any)._id !== this.authService.getUser().sub)) {
            return user;
          }
        });
      });
    }
  }

  setCityValues(regionSelected) {
    this.cities.forEach((region) => {
      if (regionSelected === region.name) {
        this.cityOptions = region.communes;
      }
    });
  }

  resetFilter(isChecked) {
    if (!isChecked) {
      this.selectedCity = undefined;
      this.selectedDistrict = undefined;
    }
  }
}
