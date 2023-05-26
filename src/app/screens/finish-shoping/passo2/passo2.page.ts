import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.module';
import { Router } from '@angular/router';
import { FinishService } from 'src/app/services/finish.service';

@Component({
  selector: 'app-passo2',
  templateUrl: './passo2.page.html',
  styleUrls: ['./passo2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Passo2Page {
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
    this.router.navigate(['/passo1']);
  }

  cancel() {
    this.orderService.clearOrder();
    this.router.navigate(['/tabs/cart']);
  }

  nextPage() {
    if(this.order.local == 'Loja') {
      if(this.radio == 'Braga' || this.radio == 'Porto' || this.radio == 'Aveiro' || this.radio == 'Amarante' || this.radio == 'Lisboa'){
        this.orderService.addOpEntrega(this.radio);
        this.router.navigate(['/passo3']);
      } 
    } else if (this.order.local == 'Casa') {
      if(this.radio == 'Standard' || this.radio == 'Premium' || this.radio == 'Express'){
        this.orderService.addOpEntrega(this.radio);
        this.router.navigate(['/passo3']);
      }
    }
  }

}
