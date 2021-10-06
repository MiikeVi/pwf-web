import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/schemas/iuser';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-caretakers-screen',
  templateUrl: './caretakers-screen.page.html',
  styleUrls: ['./caretakers-screen.page.scss'],
})
export class CaretakersScreenPage implements OnInit {

  users;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    return this.userService.getCaretakerUsers().then((data) => {
      this.users = data.data.values;
    });
  }

  getUserStars(user: User) {
    return Array(user.stars);
  }

  goHome () {
    this.router.navigateByUrl('home');
  }



}
