import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.module';
import { Router } from '@angular/router';
import { FinishService } from 'src/app/services/finish.service';
import { Morada } from 'src/app/models/morada.module';
import { MoradasService } from 'src/app/services/moradas.service';
import { GestaoMoradasModalComponent } from 'src/app/components/gestao-moradas-modal/gestao-moradas-modal.component';
@Component({
  selector: 'app-passo3',
  templateUrl: './passo3.page.html',
  styleUrls: ['./passo3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Passo3Page {
  radio: number;
  order: Order;
  orderSubscription: Subscription;
  isLoadingMoradas: boolean;
  moradas: Morada[];
  moradasSubscription: Subscription;

  constructor(private router: Router, private orderService: FinishService, private moradaService: MoradasService, private modalCtrl: ModalController) { 
    this.radio = 0;
    this.order = {} as Order;
    this.orderSubscription = this.orderService.orderSubject.subscribe((order: Order) => {
      this.order = order;
    });
    this.moradas = [];
    this.isLoadingMoradas = true; 
    this.moradasSubscription = this.moradaService.moradasSubject.subscribe((moradas: Morada[]) => {
      this.moradas = moradas;
      this.isLoadingMoradas = false; 
      console.log(this.moradas);
    });
  }

  goBack() {
    this.router.navigate(['/passo2']);
  }

  cancel() {
    this.orderService.clearOrder();
    this.router.navigate(['/tabs/cart']);
  }

  nextPage() {
    if (this.radio > 0) {
      this.orderService.addMorada(this.radio);
      this.router.navigate(['/passo4']);
    }
  }

  async addMorada() {
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

}
