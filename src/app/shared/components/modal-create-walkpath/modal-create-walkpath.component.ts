import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Days } from 'src/app/schemas/iuser';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-modal-create-walkpath',
  templateUrl: './modal-create-walkpath.component.html',
  styleUrls: ['./modal-create-walkpath.component.scss'],
})
export class ModalCreateWalkpathComponent implements OnInit {

  newWalkpath = {
    id: uuidv4(),
    location: '',
    schedule: {
      startTime: '',
      endTime: '',
      day: ''
    },
    shared: false,
    price: 0,
    sharedPrice: 0,
    maxPets: 1,
  };

  days = Object.values(Days);

  constructor(
    private modalController: ModalController)
  {}

  ngOnInit() {}

  createWalkpath() {
    this.modalController.dismiss(this.newWalkpath);
  }

  close() {
    this.modalController.dismiss();
  }

  onChangeShared(value: boolean) {
    this.newWalkpath.shared = value;
  }
}
