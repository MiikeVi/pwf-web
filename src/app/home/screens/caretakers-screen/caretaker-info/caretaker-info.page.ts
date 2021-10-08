import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/schemas/iuser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-caretaker-info',
  templateUrl: './caretaker-info.page.html',
  styleUrls: ['./caretaker-info.page.scss'],
})
export class CaretakerInfoPage implements OnInit {

  caretakerSelected: User = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
      this.caretakerSelected = this.userService.caretakerSelected;
  }

  getUserStars(user: User) {
    return Array(user.stars);
  }
}
