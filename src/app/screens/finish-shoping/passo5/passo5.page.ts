import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.module';
import { Subscription } from 'rxjs';
import { FinishService } from 'src/app/services/finish.service';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Morada } from 'src/app/models/morada.module';
import { MoradasService } from 'src/app/services/moradas.service';

@Component({
  selector: 'app-passo5',
  templateUrl: './passo5.page.html',
  styleUrls: ['./passo5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Passo5Page {
  order: Order;
  orderSubscription: Subscription;
  isLoadingCart: boolean;
  cart: Product[];
  cartSubscription: Subscription;
  total: number;
  totalSubscription: Subscription;
  isLoadingMoradas: boolean;
  moradas: Morada[];
  moradasSubscription: Subscription;
  shiping: number;


  constructor(private router: Router, private orderService: FinishService, private cartService: CartService, private moradaService: MoradasService) { 
    this.order = {} as Order;
    this.orderSubscription = this.orderService.orderSubject.subscribe((order: Order) => {
      this.order = order;
    });
    this.cart = this.cartService.getProductsCart();
    this.total = this.cartService.total;
    this.isLoadingCart = true;
    this.cartSubscription = this.cartService.cartSubject.subscribe((cart: Product[]) => {
      this.cart = cart;
      this.isLoadingCart = false;
    });
    this.totalSubscription = this.cartService.totalSubject.subscribe((total: number) => {
      this.total = total;
    });
    this.moradas = [];
    this.isLoadingMoradas = true; 
    this.moradasSubscription = this.moradaService.moradasSubject.subscribe((moradas: Morada[]) => {
      this.moradas = moradas;
      this.isLoadingMoradas = false; 
    });
    this.shiping = 0;
    if (this.order.opEntrega == 'Standard') {
      this.shiping = 2.99;
    } else if (this.order.opEntrega == 'Premium') {
      this.shiping = 4.99;
    } else if (this.order.opEntrega == 'Express') {
      this.shiping = 9.99;
    }
  }

  goBack() {
    this.router.navigate(['/passo4']);
  }

  cancel() {
    this.orderService.clearOrder();
    this.router.navigate(['/tabs/cart']);
  }

  nextPage() {
    this.router.navigate(['/final']);
  }

  isStringTooLong(text: string, maxLength: number): boolean {
    return text.length > maxLength;
  }

}
