import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ExploreContainerComponent],
})
export class FavPage {

  isLoadingCart: boolean;
  cart: Product[];
  cartSubscription: Subscription;

  constructor(private cartService: CartService, private router: Router) {
    this.cart = this.cartService.getProductsCart();
    this.isLoadingCart = true;
    this.cartSubscription = this.cartService.cartSubject.subscribe((cart: Product[]) => {
      this.cart = cart;
      this.isLoadingCart = false;
    });
  }

  removeProduct(id: number) {
    this.cartService.removeFav(id);
  }

  isStringTooLong(text: string, maxLength: number): boolean {
    return text.length > maxLength;
  }

  goBack() {
    this.router.navigate(['/tabs/profile'])
  }

}
