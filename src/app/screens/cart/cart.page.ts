import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ExploreContainerComponent],
})
export class CartPage {
  isLoadingCart: boolean;
  cart: Product[];
  cartSubscription: Subscription;
  total: number;
  totalSubscription: Subscription;


  constructor(private cartService: CartService, private router: Router) {
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
  }

  removeProduct(id: number) {
    this.cartService.removeCart(id);
  }

  isStringTooLong(text: string, maxLength: number): boolean {
    return text.length > maxLength;
  }

  finishOrder() {
    if(this.total > 0) {
      this.router.navigate(['/passo1']);
    }
  }
}
