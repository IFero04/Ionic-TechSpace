import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: Product[];
  cartSubject: BehaviorSubject<Product[]>;


  constructor(private storage: Storage) { 
    this.cart = [];
    this.cartSubject = new BehaviorSubject<Product[]>(this.cart);
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    const cart = await storage.get('cart');
    if (cart) {
      this.cart = cart;
    }
    this.notifyCartChange();
  }

  async insertProduct(product: Product) {
    if (!product.id) {
      product.id = Date.now();
    }
    this.cart.push(product);
    await this.storage.set('cart', this.cart);
  }

  async updateProduct(product: Product) {
    const index = this.cart.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      this.cart[index] = product;
      await this.storage.set('cart', this.cart);
    }
  }

  async removeProduct(id: number) {
    const index = this.cart.findIndex((p) => p.id === id);
    if (index >= 0) {
      this.cart.splice(index, 1);
      await this.storage.set('cart', this.cart);
    }
  }

  getProductsFav() {
    return this.cart.filter((p) => p.fav);
  }  

  getProductsCart() {
    return this.cart.filter((p) => p.cart);
  }

  // Manage Data //

  private notifyCartChange() {
    this.cartSubject.next(this.cart);
  }
}
