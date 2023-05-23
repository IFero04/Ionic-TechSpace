import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})

export class ConfirmModalComponent {
  @Input() message: string;
  @Input() title: string;

  constructor(private modalController: ModalController) {
    this.message = '';
    this.title = '';
  }

  async fecharModal(resposta: boolean) {
    await this.modalController.dismiss(resposta);
  }
}