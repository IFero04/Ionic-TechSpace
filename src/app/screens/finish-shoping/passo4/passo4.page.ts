import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.module';
import { Subscription } from 'rxjs';
import { FinishService } from 'src/app/services/finish.service';


@Component({
  selector: 'app-passo4',
  templateUrl: './passo4.page.html',
  styleUrls: ['./passo4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Passo4Page {
  radio: string;
  order: Order;
  orderSubscription: Subscription;

  constructor(private router: Router, private orderService: FinishService) { 
    this.radio = '';
    this.order = {} as Order;
    this.orderSubscription = this.orderService.orderSubject.subscribe((order: Order) => {
      this.order = order;
    });
  }

  goBack() {
    this.router.navigate(['/passo3']);
  }

  cancel() {
    this.orderService.clearOrder();
    this.router.navigate(['/tabs/cart']);
  }

  nextPage() {
    if(this.radio == 'Cartão de Crédito' || this.radio == 'Referêrencia Multibanco' || this.radio == 'MB Way'){
      this.orderService.addPagamento(this.radio);
      this.router.navigate(['/passo5']);
    }
  }
}
