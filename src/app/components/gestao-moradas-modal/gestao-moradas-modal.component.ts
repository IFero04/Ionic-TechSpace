import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gestao-moradas-modal',
  templateUrl: './gestao-moradas-modal.component.html',
  styleUrls: ['./gestao-moradas-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})

export class GestaoMoradasModalComponent {

  constructor(private modalController: ModalController) { }
}
