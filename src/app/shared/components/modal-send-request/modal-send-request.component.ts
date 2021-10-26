import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CareTakerType } from 'src/app/schemas/iuser';

@Component({
  selector: 'app-modal-send-request',
  templateUrl: './modal-send-request.component.html',
  styleUrls: ['./modal-send-request.component.scss'],
})
export class ModalSendRequestComponent implements OnInit {

  request = {
    description: '',
  }

  caretakerTypes = Object.values(CareTakerType)

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  createRequest() {
    console.log(this.request.description);
  }
}
