import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.module';
import { Subscription } from 'rxjs';
import { FinishService } from 'src/app/services/finish.service';

@Component({
  selector: 'app-passo1',
  templateUrl: './passo1.page.html',
  styleUrls: ['./passo1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Passo1Page {
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
    this.orderService.clearOrder();
    this.router.navigate(['/tabs/cart']);
  }

  cancel() {
    this.goBack();
  }

  nextPage() {
    if (this.radio == 'Casa' || this.radio == 'Loja') {
      this.orderService.addLocal(this.radio);
      this.router.navigate(['/passo2']);
    }
  }

}
