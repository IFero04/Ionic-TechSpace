import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Morada } from 'src/app/models/morada.module';
import { MoradasService } from 'src/app/services/moradas.service';
import { Subscription } from 'rxjs';
import { GestaoMoradasModalComponent } from 'src/app/components/gestao-moradas-modal/gestao-moradas-modal.component';


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

  constructor(private router: Router, private moradaService: MoradasService, private modalCtrl: ModalController,private alertCtrl: AlertController) {
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
    const alert = await this.alertCtrl.create({
      header: 'Remover Morada?',
      buttons: [
        {
          text: 'Não',
          role: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.moradaService.deleteMorada(id);
          }
        }
      ]
    });

    await alert.present();
  }

  public alertButtons = [
    {
      text: 'Não',
      role: false,
    },
    {
      text: 'Sim',
      role: true,
    },
  ];

  ngOnDestroy() {
    this.moradasSubscription.unsubscribe();
  }
}
