import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Morada } from 'src/app/models/morada.module';
import { MoradasService } from 'src/app/services/moradas.service';
import { Subscription } from 'rxjs';
import { GestaoMoradasModalComponent } from 'src/app/components/gestao-moradas-modal/gestao-moradas-modal.component';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-morada',
  templateUrl: './morada.page.html',
  styleUrls: ['./morada.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class MoradaPage implements OnDestroy{
  isLoadingMoradas: boolean;
  moradas: Morada[];
  moradasSubscription: Subscription;

  constructor(private router: Router, private moradaService: MoradasService, private modalCtrl: ModalController) {
    this.moradas = [];
    this.isLoadingMoradas = true; 
    this.moradasSubscription = this.moradaService.moradasSubject.subscribe((moradas: Morada[]) => {
      this.moradas = moradas;
      this.isLoadingMoradas = false; 
    });
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }

  async insertMorada() {
    const modal = await this.modalCtrl.create({
      component: GestaoMoradasModalComponent,
      componentProps: {
        title: 'Adicionar Morada',
        button: 'Adicionar Nova Morada',
        morada: null,
      }
    });

    await modal.present();
  }

  async editMorada(morada: Morada) {
    const modal = await this.modalCtrl.create({
      component: GestaoMoradasModalComponent,
      componentProps: {
        title: 'Editar Morada',
        button: 'Editar Morada',
        morada: morada,
      }
    });

    await modal.present();
  }

  async removeMorada(id: number) {
    const modal = await this.modalCtrl.create({
      component: ConfirmModalComponent,
      componentProps: {
        title: 'Remover Morada',
        message: 'Tem certeza que deseja remover a morada selecionada?'
      },
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.3
    });
  
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.moradaService.deleteMorada(id);
    }
  }

  ngOnDestroy() {
    this.moradasSubscription.unsubscribe();
  }
}
