import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  template: `
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button (click)="fecharModal(false)">Não</ion-button>
        <ion-button (click)="fecharModal(true)">Sim</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div class="ion-padding">{{ message }}</div>
  </ion-content>
  `,
})
export class ConfirmModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
