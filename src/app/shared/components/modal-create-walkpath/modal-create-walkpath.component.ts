import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-create-walkpath',
  templateUrl: './modal-create-walkpath.component.html',
  styleUrls: ['./modal-create-walkpath.component.scss'],
})
export class ModalCreateWalkpathComponent implements OnInit {

  newWalkpath = {
    location: '',
    schedule: {
      startTime: '',
      endTime: '',
      day: ''
    }
  }

  constructor( 
    private modalController: ModalController) 
  {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss(this.newWalkpath);
  }

}
